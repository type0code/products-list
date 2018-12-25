import {Directive, EventEmitter, Input, Output, HostListener} from '@angular/core';

@Directive({
  selector: '[tableSort]'
})
export class SortTableDirective {
  @Input() public tableSort: any;
  @Input() public column: any;
  @Output() public sortChanged: EventEmitter<any> = new EventEmitter();

  @Input() get config(): any {
    return this.tableSort;
  }

  set config(value: any) {
    this.tableSort = value;
  }

  @HostListener('click', ['$event', '$target'])
  onToggleSort(event: any): void {
    if (event) {
      event.preventDefault();
    }
    if (this.column.enableSorting) {
      switch (this.column.sort) {
        case 'asc':
          this.column.sort = 'desc';
          break;
        case 'desc':
          this.column.sort = '';
          break;
        default:
          this.column.sort = 'asc';
          break;
      }

      this.sortChanged.emit(this.column);
    }
  }
}
