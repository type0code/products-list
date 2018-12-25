import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})
export class FormGroupComponent implements OnInit {
  @HostBinding('class.app-form-group') true;

  constructor() { }

  ngOnInit() { }
}
