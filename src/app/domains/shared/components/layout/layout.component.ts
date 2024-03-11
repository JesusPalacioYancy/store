import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-layout',
    standalone: true,
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.css',
    imports: [HeaderComponent, RouterModule]
})
export class LayoutComponent {

}
