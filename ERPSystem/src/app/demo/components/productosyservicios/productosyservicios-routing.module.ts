import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoriasComponent } from './categorias.component';
import { PreciosComponent } from './precios.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'categorias', component: CategoriasComponent },
        { path: 'precios', component: PreciosComponent }
    ])],
    exports: [RouterModule]
})
export class ProductosYServiciosRoutingModule { }
