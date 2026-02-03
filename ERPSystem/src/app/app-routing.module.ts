import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './guard/AuthGuard';


@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,    canActivate: [AuthGuard], // <--- Así se aplica
                children: [
                    { path: '', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) }, //Inicio de usuarios autenticados
                    { path: 'dashboard', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) }, //Solo usuarios autenticados
                    { path: 'productosyservicios', loadChildren: () => import('./demo/components/productosyservicios/productosyservicios.module').then(m => m.ProductosYServiciosModule) }, //Solo usuarios autenticados
                    //Modulo ventas
                    { path: 'sales', loadChildren: () => import('./demo/components/sales/sales.module').then(m => m.SalesModule) }, //Solo usuarios autenticados

                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) } //Solo usuarios autenticados
                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
