import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-description-modal',
  templateUrl: './product-description-modal.component.html',
  styleUrls: ['./product-description-modal.component.scss']
})
export class ProductDescriptionModalComponent {

  @Input() productConfig:any;
  @Output() emitToParent:any = new EventEmitter();

  constructor(){}

  closeModal(){
    this.emitToParent.emit({action:'closeModal'})
  }

}
