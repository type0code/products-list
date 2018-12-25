import {
  Component,
  OnInit,
  HostBinding,
  Input,
  EventEmitter,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef;

  @HostBinding('class.tc-modal') true;
  @HostBinding('class.opened') @Input() opened: boolean;
  @HostBinding('class.horizontal-left') get getHorizontalLeft() { return this.horizontalPosition === 'left'; }
  @HostBinding('class.horizontal-right') get getHorizontalRight() { return this.horizontalPosition === 'right'; }
  @HostBinding('class.horizontal-center') get getHorizontalCenter() { return this.horizontalPosition === 'center'; }
  @HostBinding('class.vertical-top') get getVerticalTop() { return this.verticalPosition === 'top'; }
  @HostBinding('class.vertical-center') get getVerticalCenter() { return this.verticalPosition === 'center'; }
  @HostBinding('class.vertical-bottom') get getVerticalBottom() { return this.verticalPosition === 'bottom'; }
  @HostBinding('class.fadeInUp-animation') get fadeInUp() {
    return this.animation === 'fadeInUp';
  }
  @HostBinding('class.fadeInDown-animation') get fadeInDown() {
    return this.animation === 'fadeInDown';
  }
  @HostBinding('class.fadeInLeft-animation') get fadeInLeft() {
    return this.animation === 'fadeInLeft';
  }
  @HostBinding('class.fadeInRight-animation') get fadeInRight() {
    return this.animation === 'fadeInRight';
  }
  @HostBinding('class.zoom-animation') get zoom() {
    return this.animation === 'zoom';
  }

  @Input() height: number | string;
  @Input() width: number | string;
  @Input() closeButton: boolean;
  @Input() horizontalPosition: string;
  @Input() verticalPosition: string;
  @Input() animation: string;
  @Input() overlay: boolean;
  @Input() overlayClose: boolean;
  @Input() title: string;
  @Input() modalOpened: EventEmitter<boolean>;

  constructor(private renderer: Renderer2) {
    this.opened = false;
    this.closeButton = false;
    this.horizontalPosition = 'center';
    this.verticalPosition = 'center';
    this.overlay = true;
    this.overlayClose = true;

    this.width = 600;

    this.modalOpened = new EventEmitter();
  }

  ngOnInit() {
    if (typeof this.height === 'number') {
      this.height = this.height + 'px';
    }

    if (typeof this.width === 'number') {
      this.width = this.width + 'px';
    }

    this.renderer.setStyle(this.modal.nativeElement, 'height', this.height);
    this.renderer.setStyle(this.modal.nativeElement, 'width', this.width);
  }

  show() {
    this.opened = true;
  }

  hide() {
    this.opened = false;
  }

  overlayClick() {
    if (this.overlayClose) {
      this.hide();
    }
  }
}
