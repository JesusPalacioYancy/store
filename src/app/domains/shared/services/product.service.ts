import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

private http = inject(HttpClient);




getProducts(){
  const url = new URL(`https://fakestoreapi.com/products`)
  return this.http.get<Product[]>(url.toString());
};

getOne(id: number){
  return this.http.get<Product>(`https://fakestoreapi.com/products/${id}`);
};

// Borrado simulado
deleteProducts(productId: number){
  return this.http.delete<Product[]>(`https://fakestoreapi.com/products/${productId}`);
};

// Agredado Simulado
addNewProduct(product: Product): Observable<Product> {
  return this.http.post<Product>(`https://fakestoreapi.com/products`, product);
};

// Editado simulado
updatePrduct(productId: number, product: Product){
  return this.http.put<Product>(`https://fakestoreapi.com/products/${productId}`, product );
};


} 




