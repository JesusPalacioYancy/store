import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '@shared/services/product.service';
import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';

@Component({
  selector: 'app-product-datail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-datail.component.html',
  styleUrl: './product-datail.component.css'
})
export default class ProductDatailComponent {

  @Input() id? : number;
  product = signal<Product | null>(null); 
  private productServis = inject(ProductService); 
  private cartServis = inject(CartService); 


  ngOnInit(){
    if (this.id){
      this.productServis.getOne(this.id)
      .subscribe({
        next: (product) => {
          this.product.set(product);
        }
      });
    };
  };

  addToCart(){
    const product = this.product();
    if (product){
      this.cartServis.addToCart(product)
    };
  };

};