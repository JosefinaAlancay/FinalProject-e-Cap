import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Shop } from './pages/shop/shop';
import { Cart } from './pages/cart/cart'
import { Checkout } from './pages/checkout/checkout';
import { CourseDetail } from './components/course-detail/course-detail';
import { NotFound } from './pages/not-found/not-found';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'shop', component: Shop },
    { path: 'shop/:id', component: CourseDetail },
    { path: 'cart', component: Cart },
    { path: 'checkout', component: Checkout },
    { path: '**', component: NotFound }
];

@NgModule( {
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}