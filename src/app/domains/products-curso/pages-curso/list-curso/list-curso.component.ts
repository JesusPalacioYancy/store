import { Component, Input, SimpleChange, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { ProductCursoComponent } from '@product-curso/components-curso/product-curso/product-curso.component'
import { Product } from '@shared/models/product.model';
import { HeaderComponent } from '@shared/components/header/header.component';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { map } from 'rxjs';
import Swal from 'sweetalert2';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '@shared/services/category.service';

@Component({
    selector: 'app-list-curso',
    standalone: true,
    templateUrl: './list-curso.component.html',
    styleUrl: './list-curso.component.css',
    imports: [CommonModule, ProductCursoComponent,  HeaderComponent,
       ReactiveFormsModule, RouterLinkWithHref ]
})
export default class ListCursoComponent {

  products = signal<Product[]>([])
  categorys = signal<Product[]>([])

  private cartService = inject(CartService)
  private productService = inject(ProductService)
  private categorySevice = inject(CategoryService)
  @Input() categorys_id?: string;


  
  newProductCtrl1 = new FormControl<string>(null,{
    nonNullable : true,
    validators: [
      Validators.required
    ] 
  });

  newProductCtrl2 = new FormControl<number>(null,{
    nonNullable : true,
    validators: [
      Validators.required
    ]
  });


  idItemEdition: Number = null
  edit: boolean = false;

  ngOnChanges(){
    this.getProducts()
  };


  ngOnInit(){
    this.getCategory()
  };

  private getProducts() {
    if (this.categorys_id) {
      this.categorySevice.addcategory(this.categorys_id)
      .pipe(map(products => products.map((productTime: Product) => ({...productTime, creationAT: new Date("2024-01-03T15:58:58.000Z").toISOString()}))))
        .subscribe({
          next: (products) => {
            this.products.set(products);
          },
          error: () => {
            console.log('error');
          }
        });
    } else {
      this.productService.getProducts()
        .pipe(map(products => products.map((productTime: Product) => ({...productTime, creationAT: new Date("2024-01-03T15:58:58.000Z").toISOString()}))))
        .subscribe({
          next: (products) => {
            this.products.set(products);
          },
          error: () => {
            console.log('error');
          }
        });
    };
  };


  private getCategory(){
    this.categorySevice.getAll()
    .subscribe({
      next: (products) => {
        this.categorys.set(products)
        
      },
      error: () => {
        console.log('error')
      }
    });
  };



  deleteProduct(productId: number, index: number){
    this.productService.deleteProducts(productId)
    .subscribe({
      next: (products) =>{
        Swal.fire({
          title: '¿Estás seguro?',
          text: '¡No podrás revertir esto!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, bórralo',
          cancelButtonText: 'Cancelar'
        }).then((result)=>{
          if (result.isConfirmed) {
            console.log(products)
            console.log(`Se borro el producto ${productId}`)
            this.products.update((products) =>
              products.filter((_, posicion) => posicion !== index) 
            );
            Swal.fire('¡Eliminado!', 'Tu producto ha sido eliminado.', 'success');
          }
        })
      },
      error: (error) => {
        console.error('Error al eliminar el producto:', error);
      }
    });
  };

  addProduct(){
  const title = this.newProductCtrl1.value;
  const price = this.newProductCtrl2.value;
  const  newProduct = {
    id: 23,
    title,
    price,
    image : 'https://picsum.photos/640/640?r=' + Math.random(),
    
    
  };
    console.log(newProduct)
    this.productService.addNewProduct(newProduct)
    .subscribe({
      next: (newProduct) => this.products.update((products) => [...products, newProduct])
    });
  };


  editProduct(title: string, price: number) {
    this.products.update((products) => {
      return products.map((product, _) => {
        if (product.id === this.idItemEdition) {
          product.title = title;
          product.price = price;
          this.edit = false;
          this.productService.updatePrduct(product.id, product)
            .subscribe({
              next: () => {
                console.log(`Se actualizo el producto ${product.id}`)
                console.log('Producto actualizado con éxito en el servidor.');
              },
              error: (error) => {
                console.error('Error al actualizar el producto en el servidor:', error);
              }
            });
        };
        return product;
      });
    });
  }

  chengeProduct() {
    const title = this.newProductCtrl1.value;
    const price = this.newProductCtrl2.value;
  
    if (title && price && this.newProductCtrl1.valid && this.newProductCtrl2.valid) {
      let confirmationMessage = ''; 
      let successMessage = ''; 
      
      if (!this.edit) {
        confirmationMessage = '¿Estás seguro de agregar este nuevo producto?';
        successMessage = '¡Nuevo producto agregado!';
      } else {
        confirmationMessage = '¿Estás seguro de guardar los cambios en este producto?';
        successMessage = '¡Cambios guardados correctamente!';
      }
  
      Swal.fire({
        title: confirmationMessage,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          if (!this.edit) {
            this.addProduct();
          } else {
            this.editProduct(title, price);
          }
        
          this.edit = false;
          this.idItemEdition = null;
          this.newProductCtrl1.setValue(null);
          this.newProductCtrl2.setValue(null);
  
          Swal.fire('¡Éxito!', successMessage, 'success');
        };
      });
    } else {
      Swal.fire('Error', 'Por favor completa todos los campos correctamente', 'error');
    };
  };


  updateRegister(product: Product){
    this.edit = true;
    this.idItemEdition = product.id;
    this.newProductCtrl1.setValue(product.title);
    this.newProductCtrl2.setValue(product.price);
  };

  addToCart(product: Product){
    this.cartService.addToCart(product)
};

};