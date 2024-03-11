import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { CommonModule } from '@angular/common';
import { RevercePipe } from "../../../shared/pipes/reverce.pipe";
import { TimeAgoPipe } from "../../../shared/pipes/time-ago.pipe";
import { RouterLinkWithHref} from '@angular/router';

@Component({
    selector: 'app-product-curso',
    standalone: true,
    templateUrl: './product-curso.component.html',
    styleUrl: './product-curso.component.css',
    imports: [CommonModule, RevercePipe, TimeAgoPipe, RouterLinkWithHref]
})
export class ProductCursoComponent {
  

  @Input({required: true}) product: Product;
  @Input() index : number;
  
  @Output() postIndex = new EventEmitter<number>();
  @Output() addToCart = new EventEmitter();
  @Output() postProduct = new EventEmitter<Product>();



  editedData(){
    this.postProduct.emit({
      title: this.product.title,
      price: this.product.price,
      image: this.product.image,
      id: this.product.id,
    });
  };


  addToCartHandler(){
    this.addToCart.emit(this.product);
  };

  postIndexProduct(){
    this.postIndex.emit(this.index)
   };

  
};