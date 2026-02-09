import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Modulo Principal',
                items: [
                    { label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                    { label: 'Resumen Ejecutivo', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
                ]
            },
            {
                label: 'Productos y Servicios',
                items: [
                    { label: 'Precios', icon: 'pi pi-fw pi-dollar', routerLink: ['/productosyservicios/precios'] },
                    { label: 'Categorías', icon: 'pi pi-fw pi-tags', routerLink: ['/productosyservicios/categorias'] }
                ]
            },
            {
                label: 'Recursos Humanos',
                items: [
                    { label: 'Empleados', icon: 'pi pi-id-card', routerLink: ['/rh/empleados'] },
                    { label: 'Nómina', icon: 'pi pi-money-bill', routerLink: ['/rh/nomina'] },
                    { label: 'Asistencias', icon: 'pi pi-calendar', routerLink: ['/rh/asistencias'] }
                ]
            },
            {
                label: 'Configuración',
                items: [
                    { label: 'Usuarios', icon: 'pi pi-user-edit', routerLink: ['/configuracion/usuarios'] },
                    { label: 'Roles y Permisos', icon: 'pi pi-shield', routerLink: ['/configuracion/roles'] },
                ]
            }
        ];
    }
}
