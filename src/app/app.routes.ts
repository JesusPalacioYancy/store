import { Routes } from '@angular/router';

// import { ListComponent} from './domains/products/pages/list/list.component';
// import { ProductDatailComponent } from '@product-curso/pages-curso/product-datail/product-datail.component';
// import { AboutComponent } from './domains/info/pages/about/about.component';
// import { ListCursoComponent } from './domains/products-curso/pages-curso/list-curso/list-curso.component'
// import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component'
import { LayoutComponent } from '@shared/components/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: "",
                loadComponent: () => import('./domains/products-curso/pages-curso/list-curso/list-curso.component')
            },
            {
                path: "about",
                loadComponent: () => import('./domains/info/pages/about/about.component')
            },

            {
                path: "product/:id",
                loadComponent: () => import('@product-curso/pages-curso/product-datail/product-datail.component')
            }
        ]
    },
    {
        path: "list",
        loadComponent: () => import('./domains/products/pages/list/list.component')
    }, 
    {
        path: "**",
        loadComponent: () => import('./domains/info/pages/not-found/not-found.component')
    },


];
