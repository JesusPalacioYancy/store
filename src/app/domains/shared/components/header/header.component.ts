import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { RouterLinkWithHref, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, RouterLinkActive ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  private cartService = inject(CartService) //
  hideSideMenu = signal(true);

  cart = this.cartService.cart; //
  total = this.cartService.total; //

  showSideMenu(){
    this.hideSideMenu.update((prevState)=> !prevState);
  };

};
