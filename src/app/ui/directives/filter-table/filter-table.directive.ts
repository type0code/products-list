import {Directive, EventEmitter, ElementRef, Renderer, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[filterTable]'
})
export class FilterTableDirective {
  element: ElementRef;
  renderer: Renderer;

	@Input() filterTable: any = {};

  @Output() tableChanged: EventEmitter<any> = new EventEmitter();

  @Input() get config(): any {
    return this.filterTable;
	}
	
	constructor(element: ElementRef, renderer: Renderer) {
		this.element = element;
		this.renderer = renderer;
	}

  set config(value: any) {
    this.filterTable = value;
  }

  @HostListener('input', ['$event.target.value'])
  onChangeFilter(event: any): void {
		this.filterTable.filterString = event;
    this.tableChanged.emit({ filtering: this.filterTable });
	}
}
