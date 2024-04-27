import { TotsColumn,TotsColumnOrder } from "tots_table/table/src/public-api";
import { DateColumnComponent } from "../columns/date-column/date-column.component";

export class TotsDateColumn extends TotsColumn {
    // format_in y format_out opcionales porque deberían setearse por providers
	constructor(id:string, fieldKey:string|string[], title?:string, inputFormat?:string, outputFormat?:string, hasOrder?:boolean, order?:TotsColumnOrder) {
        super(id, DateColumnComponent, fieldKey, title, hasOrder, order);
        this.extra = {
            format_in: inputFormat,
            format_out: outputFormat
        }
    }
}