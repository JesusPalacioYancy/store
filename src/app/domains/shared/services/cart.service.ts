import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  cart = signal<Product[]>([])
  
  addToCart(product: Product){
    this.cart.update((prevState)=>[...prevState, product])
  };
  

  total = computed(()=>{
    const cart = this.cart();
    return cart.reduce((total, product)=> total + product.price, 0);
  });

};
