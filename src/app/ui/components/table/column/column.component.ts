import { Component, OnInit, Input, ContentChild, TemplateRef } from '@angular/core';
import { TableComponent } from '..'

@Component({
  selector: 'table-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
	@ContentChild('tableBodyTemplate') bodyTemplate: TemplateRef<any>;
	@ContentChild('headerBodyTemplate') headerTemplate: TemplateRef<any>;

	@Input() columnTitle: string;
	@Input() columnName: string;
	@Input() enableFiltering: boolean;
	@Input() enableSorting: boolean;

	config: any;
		
  constructor(private table: TableComponent) {
		this.enableFiltering = false;
		this.enableSorting = false;
		this.columnName = '';
		this.columnTitle = '';

		this.config = {
			title: '',
			name: '',
			sort: '',
			enableSorting: this.enableSorting,
			filter: this.enableFiltering,
			filtering: {
				filterString: '',
				columnName: name
			}
		};
	}

	public setConfig() {
		this.config.name = this.columnName;
		this.config.title = this.columnTitle;
		this.config.filtering.columnName = this.columnName;
		this.config.enableSorting = this.enableSorting;
		if (this.columnName === '') {
			this.config.filtering = false;
		}
	}

  ngOnInit() {
		this.setConfig();
		this.table.addColumn(this);
  }
}
