import { Component, Input, HostBinding, OnChanges, OnInit } from '@angular/core';
import { ColumnComponent } from './column/column.component';
import { ITableConfig } from '../../interfaces/tableConfig';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],

})
export class TableComponent implements OnInit, OnChanges {
	@HostBinding('class.app-table') true;
	@HostBinding('class.bordered-table') @Input() bordered: boolean;
	@HostBinding('class.striped-table') @Input() striped: boolean;
	@HostBinding('class.hovered-table') @Input() hovered: boolean;
	@HostBinding('class.borderless-table') @Input() borderLess: boolean;

	@Input() borderColor: string;
	@Input() borderStyle: string;
	@Input() contentBgColor: string;
	@Input() contentColor: string;
	@Input() headerBgColor: string;
	@Input() headerColor: string;
	@Input() headerAlign: string;
	@Input() rowAlign: string;
	@Input() search: boolean;
	@Input() config: ITableConfig;
	@Input() rows: any[];
	@Input() itemsPerPage: number;

	data: Array<any>;
	filtering: any;
	_columns: Array<any>;
	pagesCount: number;
	page: number;
	columnList: ColumnComponent[];

	constructor() {
		this.borderStyle = 'solid';
		this.headerAlign = 'left';
		this.rowAlign = 'left';
		this.headerColor = '#000';
		this.headerBgColor = 'rgba(#000,0.15)';
		this.columnList = [];
		this._columns = [];
		this.config = {
			sorting: true,
			filtering: {
				filtering: true,
				filterString: ''
			}
		};
		this.itemsPerPage = 10;
		this.page = 1;
	}

  ngOnInit() {
    this.getColumns();
    this.data = this.rows;

    if (this.data && this.data.length) {
      this.pagesCount = Math.ceil(this.rows.length / this.itemsPerPage);

      if (this.data.length > 0) {
        this.onChangeTable(this.config, null);
      }
    }
  }

  ngOnChanges() {
    this.getColumns();
    this.data = this.rows;

    if (this.pagesCount != Math.ceil(this.rows.length / this.itemsPerPage)) {
      this.pagesCount = Math.ceil(this.rows.length / this.itemsPerPage);
      this.onChangeTable(this.config, null);
    }
  }

	addColumn(column: ColumnComponent) {
		this.columnList.push(column);
	}

	getColumns() {
		this.columnList.forEach(col => {
			this._columns.push(col.config);
		});
	}

	changePage(page: number, itemsPerPage: number, data: Array<any>): Array<any> {
		let start = (page - 1) * itemsPerPage;
		let end = itemsPerPage > -1 ? (start + itemsPerPage) : data.length;
		return data.slice(start, end);
	}

	changeSort(data: any, config: any): any {
		if (!config.sorting) {
			return data;
		}

		let columns = [];
		this.columnList.forEach(col => {
			columns.push(col.config);
		});
		let columnName: string = void 0;
		let sort: string = void 0;

		for (let i = 0; i < columns.length; i++) {
			if (columns[i].sort !== '' && columns[i].sort !== false) {
				columnName = columns[i].name;
				sort = columns[i].sort;
			}
		}

		if (!columnName) {
			return data;
		}

		return data.sort((previous: any, current: any) => {
			if (previous[columnName] > current[columnName]) {
				return sort === 'desc' ? -1 : 1;
			} else if (previous[columnName] < current[columnName]) {
				return sort === 'asc' ? -1 : 1;
			}
			return 0;
		});
	}

	changeFilter(data: any, config: any): any {
	  if (data && data.length) {
      let filteredData: Array<any> = data;

      this.columnList.forEach((column: any) => {
        if (column.config.name) {
          filteredData = filteredData.filter((item: any) => {
            if (typeof item[column.config.name] === 'undefined' && item[column.config.name] !== undefined) {
              return item[column.config.name].toString().toLowerCase().match(column.config.filtering.filterString.toLowerCase());
            } else {
              return true;
            }
          });
        }
      });

      if (!config.filtering) {
        return filteredData;
      }

      let tempArray: Array<any> = [];

      filteredData.forEach((item: any) => {
        let flag = false;

        this.columnList.forEach((column: any) => {
          if (column.config.filtering && column.config.name) {
            if (typeof item[column.config.name] !== 'undefined' && item[column.config.name] !== undefined) {
              let colString = item[column.config.name] + '';

              if (colString.toLowerCase().startsWith(config.filtering.filterString.toLowerCase())) {
                flag = true;
              }
            }
          }
        });

        if (flag) {
          tempArray.push(item);
        }
      });

      filteredData = tempArray;

      return filteredData;
    }
	}

	onChangeTable(config: any, column: ColumnComponent): any {
		if (config.filtering) {
			Object.assign(this.config.filtering, config.filtering);
		}

		if (config.sorting) {
			Object.assign(this.config.sorting, config.sorting);
		}
		let filteredData;

		if (column) {
			filteredData = this.changeFilter(this.data, column.config);
		} else {
			filteredData = this.changeFilter(this.data, config);
		}
		let sortedData = this.changeSort(filteredData, this.config);
		this.rows = sortedData;
	}
}
