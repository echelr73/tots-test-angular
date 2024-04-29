import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { TotsTableFullGroupComponent } from '../../../../tots_table/editable-columns/src/public-api';
import { MoreMenuColumnComponent, StringColumnComponent, TotsActionTable, TotsTableConfig } from '../../../../tots_table/table/src/public-api';
import { delay, of, tap } from 'rxjs';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/entities/client';
import { TotsListResponse } from '@tots/core';
import { StringFieldComponent, SubmitAndCancelButtonsFieldComponent, TotsFormModalService, TotsModalConfig } from 'tots_form/form/src/public-api';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @ViewChild('tableCompGroup') tableCompGroup!: TotsTableFullGroupComponent;

  config = new TotsTableConfig();

  clients: Client[] = [];

  constructor(
    public clientService: ClientService,
    protected dialog: TotsFormModalService,
  ) { }

  ngOnInit(): void {
    this.tableConfig();
    this.fetchClientList();
  }

  fetchClientList(): void {
    this.clientService.getClientList().subscribe({
      next: (clients: Client[]) => {
        this.handleClientList(clients);
      },
      error: (error) => {
        console.error('Error fetching client list:', error);
      }
    });
  }

  private handleClientList(clients: Client[]): void {
    this.clients = clients;
    const data = this.buildTableData();
    this.updateTableData(data);
  }

  private buildTableData(): TotsListResponse<Client> {
    const data = new TotsListResponse<Client>();
    data.data = this.clients;
    data.total = this.clients.length / 50;
    return data;
  }

  private updateTableData(data: TotsListResponse<Client>): void {
    this.config.obs = of(data);
    this.tableCompGroup?.loadItems();
  }

  onTableAction(action: TotsActionTable) {
    if (action.key == "remove") {
      this.removeItem(action.item);
    } else if (action.key == "edit") {
      this.addAndEditItem(action.item);
    }
  }

  tableConfig() {
    this.config.id = 'table-clients';
    this.config.columns = [
      { key: 'firstname', component: StringColumnComponent, title: 'Nombre', field_key: 'firstname', hasOrder: false, extra: { cutSeparator: ',' } },
      { key: 'lastname', component: StringColumnComponent, title: 'Apellido', field_key: 'lastname', hasOrder: false, extra: { field_subtitle_key: 'subtitle' } },
      { key: 'email', component: StringColumnComponent, title: 'Email', field_key: 'email', hasOrder: false },
      {
        key: 'more', component: MoreMenuColumnComponent, title: '', extra: {
          stickyEnd: true, width: '60px', class: 'mat-menu-item', actions: [
            { icon: 'edit', title: 'Editar', key: 'edit' },
            { icon: 'delete', title: 'Eliminar', key: 'remove' },
          ]
        }
      },
    ];
  }

  addAndEditItem(client?: Client) {
    let config = new TotsModalConfig();
    if (client) {
      config.title = 'Editar cliente';
      config.item = client;
      config.fields = [
        { key: 'firstname', component: StringFieldComponent, label: 'Nombre', validators: [Validators.required] },
        { key: 'lastname', component: StringFieldComponent, label: 'Apellido', validators: [Validators.required] },
        { key: 'email', component: StringFieldComponent, label: 'Email', validators: [Validators.required] },
        { key: 'submit', component: SubmitAndCancelButtonsFieldComponent, label: 'Editar' }
      ];
    } else {
      config.title = 'Crear cliente';
      config.item = {};
      config.fields = [
        { key: 'firstname', component: StringFieldComponent, label: 'Nombre', validators: [Validators.required] },
        { key: 'lastname', component: StringFieldComponent, label: 'Apellido', validators: [Validators.required] },
        { key: 'email', component: StringFieldComponent, label: 'Email', validators: [Validators.required] },
        { key: 'submit', component: SubmitAndCancelButtonsFieldComponent, label: 'Crear' }
      ];
    }

    const dialogRef = this.dialog.open(config)
      .pipe(tap(action => {
        if (action.key == 'submit') {
          action.modal?.componentInstance.showLoading();
        } else if (action.key == 'cancel') {
          action.modal?.close();
        }
      }))
      .pipe(delay(2000))
      .pipe(tap(action => action.modal?.componentInstance.hideLoading()))
      .subscribe(action => {
        if (action.key == 'submit') {
          let client = new Client();
          client.id = action?.item?.id;
          client.firstname = action?.item?.firstname;
          client.lastname = action?.item?.lastname;
          client.email = action?.item?.email;

          this.clientService.createClient(client).subscribe({
            next: () => {
              console.log('Cliente creado correctamente');
              action.modal?.close();
              this.fetchClientList();
            },
            error: (error) => {
              console.error('Error al crear cliente:', error);
              action.modal?.close();
            }
          });
          console.log(action)
        }
      });
  }

  removeItem(item: any) {
    let config = new TotsModalConfig();
    config.title = 'Esta seguro que desea eliminar el cliente?';
    config.item = item;
    config.fields = [
      { key: 'delete', component: SubmitAndCancelButtonsFieldComponent, label: 'Eliminar' }
    ];

    const dialogRef = this.dialog.open(config)
      .pipe(tap(action => {
        if (action.key == 'delete') {
          action.modal?.componentInstance.showLoading();
        } else if (action.key == 'cancel') {
          action.modal?.close();
        }
      }))
      .pipe(delay(2000))
      .pipe(tap(action => action.modal?.componentInstance.hideLoading()))
      .subscribe(action => {
        if (action.key == 'delete') {
          this.clientService.removeClient(action.item.id).subscribe({
            next: () => {
              console.log('Cliente eliminado correctamente');
              action.modal?.close();
              this.fetchClientList();
            },
            error: (error) => {
              console.error('Error al eliminar cliente:', error);
              action.modal?.close();
            }
          });
        }
      });
  }
}
