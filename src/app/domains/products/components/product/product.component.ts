import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { productos } from '../../../../models/interfaz.productos';

@Component({
  selector: 'app-product', // 
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  // Inputs
  @Input({required: true}) img: string = '';
  @Input({required: true}) price: string = '';
  @Input({required: true}) title: string = '';
  @Input() index: number;

  // Outputs
  @Output() addToCart = new EventEmitter<string>();
  @Output() postIndex = new EventEmitter<number>();
  @Output() postProduct = new EventEmitter<productos>();



  // Funcion que emite los valores de la funcion 'actualizarReguistro'
  editedData(){
    this.postProduct.emit({
      title: this.title,
      price: parseInt(this.price),
      img: this.img,
      id: this.index,
    });
  };

  // Funcion que emite el index para la funcion 'borrarProducto'
  postIndexProduct(){
   this.postIndex.emit(this.index)
  };

  addToCartHandler(){
    this.addToCart.emit(`hola desde el hijo para padre, evento generado por el ${this.title}`);
  };
  
};