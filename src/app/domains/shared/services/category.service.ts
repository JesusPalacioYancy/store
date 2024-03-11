import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '@shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private http = inject(HttpClient);

  getAll(){
    return this.http.get<Product[]>(`https://fakestoreapi.com/products/categories`);
  };

  addcategory(categorys_id?: string){
    const url = new URL(`https://fakestoreapi.com/products/category/${categorys_id}`)
    return this.http.get<Product[]>(url.toString());
  };

};
