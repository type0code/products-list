import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from './components/button';
import { CheckboxComponent } from './components/checkbox';
import { InputComponent } from './components/input';
import { TableComponent } from './components/table';
import { ColumnComponent } from './components/table/column/column.component';
import { ModalWindowComponent } from './components/modal-window';
import { FilterTableDirective } from './directives/filter-table/filter-table.directive';
import { SortTableDirective } from './directives/sort-table/sort-table.directive';
import { FormGroupComponent } from './components/form-group';
import { SelectComponent } from './components/select';
import { ListComponent } from './components/list';

@NgModule({
  imports: [
    CommonModule,
		FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ButtonComponent,
    CheckboxComponent,
    InputComponent,
    TableComponent,
    ColumnComponent,
    FilterTableDirective,
    SortTableDirective,
    ModalWindowComponent,
    FormGroupComponent,
    SelectComponent,
    ListComponent
  ],
  exports: [
    ButtonComponent,
    CheckboxComponent,
    InputComponent,
    TableComponent,
    ColumnComponent,
    ModalWindowComponent,
    FormGroupComponent,
    SelectComponent,
    ListComponent
  ]
})
export class UIModule { }
