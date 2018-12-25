import { Component, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IIncludeProduct, IProduct } from '../../../interfaces/product';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @HostBinding('class.app-list') true;

  @Input() list: IProduct[];
  @Input() includes: IIncludeProduct[];
  @Input() type: string;

  @Output() getSelected: EventEmitter<{list: IProduct[], includes: IIncludeProduct[], type: string}>;

  filterForm: FormGroup;
  selectedFilterForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.getSelected = new EventEmitter<{list: IProduct[], includes: IIncludeProduct[], type: string}>();
    this.list = [];
    this.includes = [];
    this.type = 'INCLUDE';
  }

  ngOnInit() {
    if (this.includes && this.includes.length) {
      this.list = this.list.filter(item => {
        return this.includes.findIndex( el => el.connectedProduct.id !== item.id) > -1;
      });
    }

    this.initFilter();
  }

  initFilter() {
    this.filterForm = this.formBuilder.group({
      val: ['']
    });
    this.selectedFilterForm = this.formBuilder.group({
      val: ['']
    });

    this.detectFiltering(this.list, 'list', 'filterForm');
    this.detectFiltering(this.includes, 'includes', 'selectedFilterForm', true);
  }

  detectFiltering(data: any, dataName: string, formName: string, includes: boolean = false) {
    this[formName].valueChanges.subscribe(changedData => {
      this[dataName] = data.filter(item => {
        return ((includes ? item.connectedProduct.name : item.name).toLowerCase().indexOf(changedData.val.toLowerCase()) > -1)
          || ((includes ? item.connectedProduct.sku : item.sku).toLowerCase().indexOf(changedData.val.toLowerCase()) > -1);
      });
    });
  }

  toggleSelected(event: Event, item: IProduct, selected: boolean) {
    event.preventDefault();

    if (!selected) {
      this.includes.push({
        type: this.type,
        connectedProduct: item
      });

      this.list = this.list.filter(prod => prod.id !== item.id);
    } else {
      this.includes = this.includes.filter(pr => pr.connectedProduct.id !== item.id);

      this.list.push(item);
      this.list.sort((a, b) => a.id - b.id);
    }

    this.getSelected.emit({ list: this.list, includes: this.includes, type: this.type });
  }
}
