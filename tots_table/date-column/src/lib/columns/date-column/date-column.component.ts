import { Component } from '@angular/core';
import * as moment from 'moment';
import { TotsTableHelper, TotsBaseColumnComponent } from 'tots_table/table/src/public-api';

@Component({
  selector: 'tots-date-column',
  templateUrl: './date-column.component.html',
  styleUrls: ['./date-column.component.css']
})
export class DateColumnComponent extends TotsBaseColumnComponent {

  override getItemValue(): any {
    let value = TotsTableHelper.getItemValueByKey(this.item, this.column.field_key);

    if(value == undefined || value == null || value == ''){
      return '';
    }

    let date;
    if(this.column.extra.format_in != undefined){
      date = moment(value, this.column.extra.format_in);
    } else {
      date = moment(value);
    }

    if(this.column.extra.format_out != undefined){
      return date.format(this.column.extra.format_out);
    }

    return date.format('MM/DD/YYYY');
  }

}
