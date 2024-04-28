import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TotsActionForm, TotsFormComponent } from '@tots/form';
import { TotsActionSidebarForm } from '../../entities/tots-action-sidebar-form';
import { TotsFormSidebarItem, TotsFormSidebarPageConfig } from '../../entities/tots-form-sidebar-page-config';

@Component({
  selector: 'tots-form-sidebar-page',
  templateUrl: './form-sidebar-page.component.html',
  styleUrls: ['./form-sidebar-page.component.scss']
})
export class TotsFormSidebarPageComponent implements OnInit {

  @ViewChild('form') form!: TotsFormComponent;

  @Input() config!: TotsFormSidebarPageConfig;

  @Output() onAction = new EventEmitter<TotsActionSidebarForm>();

  selectedItem?: TotsFormSidebarItem;

  constructor(
    protected changeDetector: ChangeDetectorRef,
  ) {

  }

  ngOnInit(): void {
    this.selectedItem = this.config.items[0];
    this.selectedItem.isSelected = true;
    // Emit Action
    this.onAction.emit({ key: 'load-item', item: this.selectedItem, sidebarItem: this.selectedItem });
  }

  onClickItem(item: TotsFormSidebarItem) {
    // Reset all items
    this.config.items.forEach(i => i.isSelected = false);
    // Active item
    item.isSelected = true;
    // Reset form
    this.selectedItem = undefined;
    this.changeDetector.detectChanges();
    // Load Forms
    this.selectedItem = item;
    this.changeDetector.detectChanges();
    // Emit Action
    this.onAction.emit({ key: 'load-item', item: item });
  }

  onActionForm(action: TotsActionForm) {
    let newAction = new TotsActionSidebarForm();
    newAction.key = action.key;
    newAction.item = action.item;
    newAction.sidebarItem = this.selectedItem;
    this.onAction.emit(newAction);
  }
}
