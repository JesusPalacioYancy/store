import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './../../components/product/product.component' //
import { FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { productos } from '../../../../models/interfaz.productos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, ReactiveFormsModule], //
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent  {

  // S.R.P
  idItemEdition: Number = null;

  // Estado global del edit 
  edit:boolean = false

  // Array de prodductos;
  arrayProduct  = signal<productos[]>([
    {
      'id' : Date.now(),
      'title' : 'Producto 1',
      'price': 500,
      'img': 'https://picsum.photos/640/640?r='+ Math.random(),
    },
    {
      'id' : Date.now(),
      'title' : 'Producto 2',
      'price': 600,
      'img': 'https://picsum.photos/640/640?r='+ Math.random(),
    },
    {
      'id' : Date.now(),
      'title' : 'Producto 3',
      'price': 700,
      'img': 'https://picsum.photos/640/640?r='+ Math.random(),
    },
    {
      'id' : Date.now(),
      'title' : 'Producto 5',
      'price': 800,
      'img': 'https://picsum.photos/640/640?r=' + Math.random(),
    },
  ]);

  // Controlador de formulario 'titulo'
  newProductCtrl1 = new FormControl<string>(null,{
    nonNullable : true,
    validators: [
      Validators.required
    ] 
  });

    // Controlador de formulario 'price'
  newProductCtrl2 = new FormControl<number>(null,{
    nonNullable : true,
    validators: [
      Validators.required
    ]
  });

  // 
  fromChild(event: string){
    console.log(event)
  };

  // Borrar objeto del array con la aletra 
  deleteProduct(index: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.arrayProduct.update((arrayProduct) =>
          arrayProduct.filter((_, posicion) => posicion !== index)
        );
        Swal.fire('¡Eliminado!', 'Tu producto ha sido eliminado.', 'success');
      }
    });
  }


// Verificasion para pasar agregar un producto o editarlo
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
          this.addProduct(title, price);
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
  }
}


// Funcion que agrega obejtos al array
addProduct(title: string, price: number){
  const newProduct = {
    id: Date.now(),
    title,
    price,
    img : 'https://picsum.photos/640/640?r=' + Math.random(),
    
  };
  this.arrayProduct.update((arrayProduct)=>[...arrayProduct, newProduct])
};


// Funcion que inserta valores del obejto a los inputs del html
updateRegister(product: productos){
  this.edit = true;
  this.idItemEdition = product.id;
  this.newProductCtrl1.setValue(product.title);
  this.newProductCtrl2.setValue(product.price);
};



// Funcion que edita obejtos al array
editProduct(title: string, price : number){
  this.arrayProduct.update((arrayProductos)=>{
    return arrayProductos.map((product, posicion)=>{
      if(posicion === this.idItemEdition){
          product.title =  title,
          product.price =  price,
          this.edit = false
      }
      return product
    });
  });
};

// condicional que por el estado cambiara el icono 
get iconEdit(){
  return this.edit ? 'fa-solid fa-pen' : 'fa-thin fa-plus'
};

};

