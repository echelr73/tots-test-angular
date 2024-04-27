import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { TotsDateColumn } from '../../../../tots_table/date-column/src/lib/column-factories/tots-date-column';
import { DateColumnComponent } from '../../../../tots_table/date-column/src/public-api';
import { TotsInputColumn } from '../../../../tots_table/editable-columns/src/lib/column-factories/tots-input-column';
import { TotsValidator } from '../../../../tots_table/editable-columns/src/lib/entities/tots-validator';
import { InputColumnComponent, TotsTableFullGroupComponent } from '../../../../tots_table/editable-columns/src/public-api';
import { TotsBalanceColumn } from '../../../../tots_table/table/src/lib/column-factories/tots-balance-column';
import { TotsBooleanColumn } from '../../../../tots_table/table/src/lib/column-factories/tots-boolean-column';
import { TotsCheckboxColumn } from '../../../../tots_table/table/src/lib/column-factories/tots-checkbox-column';
import { TotsIconButtonColumn } from '../../../../tots_table/table/src/lib/column-factories/tots-icon-button-column';
import { TotsMoreMenuColumn } from '../../../../tots_table/table/src/lib/column-factories/tots-more-menu-column';
import { TotsOptionColumn } from '../../../../tots_table/table/src/lib/column-factories/tots-option-column';
import { TotsStatusIconColumn } from '../../../../tots_table/table/src/lib/column-factories/tots-status-icon-column';
import { TotsStringColumn } from '../../../../tots_table/table/src/lib/column-factories/tots-string-column';
import { TotsTwoStringColumn } from '../../../../tots_table/table/src/lib/column-factories/tots-two-string-column';
import { TotsColumnOption } from '../../../../tots_table/table/src/lib/entities/tots-column-option';
import { TotsMoreMenuItem } from '../../../../tots_table/table/src/lib/entities/tots-more-menu-item';
import { TotsStatusIconColumnOption } from '../../../../tots_table/table/src/lib/entities/tots-status-icon-column-option';
import { BalanceCurrencyColumnComponent, BooleanColumnComponent, CheckboxColumnComponent, IconButtonColumnComponent, MoreMenuColumnComponent, OptionColumnComponent, StatusColumnComponent, StringColumnComponent, TotsActionTable, TotsColumn, TotsTableComponent, TotsTableConfig, TwoStringColumnComponent } from '../../../../tots_table/table/src/public-api';
import { delay, of } from 'rxjs';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/entities/client';
import { TotsListResponse } from '@tots/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @ViewChild('tableComp') tableComp!: TotsTableComponent;
  @ViewChild('tableCompGroup') tableCompGroup!: TotsTableFullGroupComponent;

  config = new TotsTableConfig();

  private id = 0;
  clients: Client[] = [];
   items = [
    { id: this.id++, title: 'Item 1, pedro', active: 1, subtitle: 'AB232', date: '2021-01-01', debit: 1000, credit: 500 },
    { id: this.id++, title: 'Item 2', active: 1, subtitle: 'AB232', date: '2021-01-01', debit: 500, credit: 1000, edit_field: 'Pedro' },
    { id: this.id++, title: 'Item 3', active: 0, subtitle: 'AB232', date: '2021-01-01' },
    { id: this.id++, title: 'Item 4', active: 0, subtitle: 'AB232', date: '2021-01-01', classCustom: 'tots-cell-item-green', edit_field: "dsdada" },
    { id: this.id++, title: 'Item 5', active: 1, subtitle: 'AB232', date: '2021-01-01' },
  ];
 /* itemsClient: Client[] = [
    {
      "id": 1538,
      "firstname": "test",
      "lastname": "close",
      "email": "anjuna@gmail.com",
      "address": "walala 123",
      "photo": "",
      "caption": "",
      "created_at": "2024-04-25T23:09:38.000000Z",
      "updated_at": "2024-04-25T23:09:38.000000Z",
      "deleted": 0
    },
    {
      "id": 1537,
      "firstname": "te",
      "lastname": "st",
      "email": "asd",
      "address": "",
      "photo": "",
      "caption": "",
      "created_at": "2024-04-25T23:08:27.000000Z",
      "updated_at": "2024-04-25T23:08:27.000000Z",
      "deleted": 0
    },
    {
      "id": 1536,
      "firstname": "close",
      "lastname": "test",
      "email": "s",
      "address": "",
      "photo": "",
      "caption": "",
      "created_at": "2024-04-25T23:07:35.000000Z",
      "updated_at": "2024-04-25T23:07:35.000000Z",
      "deleted": 0
    },
    {
      "id": 1535,
      "firstname": "testmodal",
      "lastname": "modaltest",
      "email": "jk@gmail.com",
      "address": "",
      "photo": "",
      "caption": "",
      "created_at": "2024-04-25T23:00:35.000000Z",
      "updated_at": "2024-04-25T23:00:35.000000Z",
      "deleted": 0
    },
    {
      "id": 1534,
      "firstname": "george6",
      "lastname": "test",
      "email": "testerino@outlook.com",
      "address": "Walala 123",
      "photo": "",
      "caption": "",
      "created_at": "2024-04-25T22:59:17.000000Z",
      "updated_at": "2024-04-25T22:59:17.000000Z",
      "deleted": 0
    },
  ]; */

  formGroup = new FormGroup({});

  constructor(
    //public modalEditar: MatDialog,
    //public modalConfirmacion: MatDialog,
    public clientService: ClientService
  ) {

  }
  ngOnInit(): void {
    this.legacyConfig();
    this.fetchClientList();
    //this.configThroughFactories();
    
    //this.miniConfig();
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
    data.total = this.clients.length;
    return data;
  }

  private updateTableData(data: TotsListResponse<Client>): void {
    this.config.obs = of(data);
    this.tableComp?.loadItems();
  }

  miniConfig() {
    this.config.id = 'table-clientes';

    this.config.columns = [
      new TotsStringColumn("firstname", "firstname", "Nombre"),
      new TotsStringColumn("lastname", "lastname", "Appelido"),
      new TotsStringColumn("email", "email", "Email"),
    ];

/*          let data = new TotsListResponse();
        data.data = [...this.itemsClient];
        data.total = 50;
    
        this.config.obs = of(data).pipe(delay(1000)); */
    // Suscripción para obtener la lista de clientes
    this.clientService.getClientList().subscribe({
      next: (clients: Client[]) => {
        let data = new TotsListResponse();
        //this.clients = clients;
        data.data = [...clients];  // Utiliza los datos de los clientes obtenidos
        data.total = clients.length;  // Establece el total de registros

        // Asigna los datos a la propiedad obs del config
        this.config.obs = of(data).pipe(delay(2000));
      },
      error: (error) => {
        console.error('Error fetching client list:', error);
      }
    });
  }

  onOrder(column: TotsColumn) {
    let response = new TotsListResponse();

    if (column.order == 'asc') {
      response.data = this.items.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
    } else {
      response.data = this.items.sort((a, b) => (a.title < b.title) ? 1 : ((b.title < a.title) ? -1 : 0))
    }

    this.config.obs = of(response);
    this.tableComp.loadItems();
  }

  onTableAction(action: TotsActionTable) {
    if (action.key == 'click-order') {
      this.onOrder(action.item);
    } else if (action.key == 'select-item') {
      action.item.isSelected = true;
    } else if (action.key == 'unselect-item') {
      action.item.isSelected = false;
    } else if (action.key == "form-change") {
      console.log(action.item.valid);
      console.log(action.item.values);
    } else if (action.key == "remove") {
      this.removeItem(action.item);
    } else if (action.key == "page-change") {
      this.changePage(action.item);
    }
  }

  legacyConfig() {
    this.config.id = 'table-example';
    this.config.columns = [
      { key: 'firstname', component: StringColumnComponent, title: 'Nombre', field_key: 'firstname', hasOrder: false, extra: { cutSeparator: ',' } },
      { key: 'lastname', component: StringColumnComponent, title: 'Apellido', field_key: 'lastname', hasOrder: false, extra: { field_subtitle_key: 'subtitle' } },
      { key: 'email', component: StringColumnComponent, title: 'Email', field_key: 'email', hasOrder: false },
      {
        key: 'more', component: MoreMenuColumnComponent, title: '', extra: {
          stickyEnd: true, width: '60px', actions: [
            { icon: 'add', title: 'Editar', key: 'edit' },
            { icon: 'add', title: 'Eliminar', key: 'remove' },
          ]
        }
      },
    ];
  }
  configThroughFactories() {
    this.config.id = 'table-example';

    this.config.columns = [
      new TotsCheckboxColumn("check"),
      new TotsStringColumn("title", "title", "Título", true),
      new TotsTwoStringColumn("subtitle", "title", "subtitle", "Título / Subtítulo"),
      new TotsBooleanColumn("include", "active", "Activo"),
      new TotsIconButtonColumn("home", "home", "click-home", "primary"),
      new TotsBalanceColumn("balance", "credit", "debit", "Balance"),
      new TotsOptionColumn("active", "active", [
        new TotsColumnOption(1, "Activo"),
        new TotsColumnOption(0, "Inactivo")
      ], "Activo"),
      new TotsStatusIconColumn("active2", "active", [
        new TotsStatusIconColumnOption(1, "person", "green"),
        new TotsStatusIconColumnOption(0, "clear", "red"),
      ], "Activo2"),
      new TotsDateColumn("date", "date", "Fecha", "YYYY-MM-DD", 'MM/DD/YYYY'),
      new TotsInputColumn("title", "title", [
        new TotsValidator(Validators.required, "required", "Requerido"),
      ], "Title input", undefined, "Ingrese un título"),
      new TotsInputColumn("edit_field", "edit_field", [
        new TotsValidator(Validators.required, "required", "Requerido"),
        new TotsValidator(Validators.min(0.0000001), "min", "Debe ser positivo"),
        new TotsValidator(Validators.pattern("^[0-9]*$"), "pattern", "Inválido")
      ], "Input", undefined, "Ingrese un número"),
      new TotsIconButtonColumn("delete", "delete", "delete", "warn"),
      new TotsMoreMenuColumn("more", [
        new TotsMoreMenuItem("edit", "Editar", "edit", "a_css_class"),
        new TotsMoreMenuItem("delete", "Eliminar", "delete"),
      ])
    ];

    let data = new TotsListResponse();
    data.data = [...this.items];

    this.config.obs = of(data);
  }

  addItem() {
    this.items = [
      ...this.items,
      { id: this.id++, title: 'Item 5', active: 1, subtitle: 'AB232', date: '2021-01-01', edit_field: "pushed item" } as any
    ];

    let data = new TotsListResponse();
    data.data = this.items;

    this.config.obs = of(data);
    this.tableCompGroup?.loadItems();
  }

  deleteClient(id: number): void {
    
  }
  removeItem(item: any) {
    this.clientService.removeClient(item.id).subscribe({
      next: () => {
        console.log('Cliente eliminado correctamente');
        this.fetchClientList();
      },
      error: (error) => {
        console.error('Error al eliminar cliente:', error);
      }
    });
  }

  private changePage(pageEvent: PageEvent) {
    let data = new TotsListResponse();
    data.data = [...this.items];
    data.total = 50;

    this.config.obs = of(data).pipe(delay(2000));
    this.tableComp.loadItems();
  }
}
