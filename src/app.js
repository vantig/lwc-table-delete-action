import { LightningElement } from 'lwc';
import fetchDataHelper from './fetchDataHelper';
const actions = [
    {label: 'Delete', name: 'delete'},
];
const columns = [
    { label: 'Label', fieldName: 'name' },
    { label: 'Website', fieldName: 'website', type: 'url' },
    { label: 'Phone', fieldName: 'phone', type: 'phone' },
    { label: 'Balance', fieldName: 'amount', type: 'currency' },
    { label: 'CloseAt', fieldName: 'closeAt', type: 'date' },
    {
        type: 'action',
        typeAttributes: {rowActions: actions},
    }
];

export default class ResourceTable extends LightningElement {
    data = [];
    columns = columns;

    // eslint-disable-next-line @lwc/lwc/no-async-await
    async connectedCallback() {
        this.data = await fetchDataHelper({ amountOfRecords: 10 });
         console.log(this.data)
    }
    handleSave(event) {
        this.saveDraftValues = event.detail.draftValues;
        console.log('draft' + JSON.stringify(this.saveDraftValues));
        console.log('data' + JSON.stringify(this.data));
    }
     handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'delete':
                this.deleteRow(row);
                break;
            default:
        }
    }
     deleteRow(row) {
        const {id} = row;
        const index = this.findRowIndexById(id);
        if (index !== -1) {
            this.data = this.data
                .slice(0, index)
                .concat(this.data.slice(index + 1));
        }
    }
      findRowIndexById(id) {
        let ret = -1;
        this.data.some((row, index) => {
            if (row.id === id) {
                ret = index;
                return true;
            }
            return false;
        });
        return ret;
    }
}