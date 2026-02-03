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
                label: 'Ventas',
                items: [
                    { label: 'Cotizaciones', icon: 'pi pi-file-edit', routerLink: ['/sales/quotations'] },
                    { label: 'Pedidos', icon: 'pi pi-shopping-cart', routerLink: ['/sales/orders'] },
                    { label: 'Clientes', icon: 'pi pi-users', routerLink: ['/sales/customers'] },
                    { label: 'Facturación', icon: 'pi pi-file', routerLink: ['/sales/billing'] }
                ]
            },
            {
                label: 'Compras',
                items: [
                    { label: 'Órdenes de Compra', icon: 'ppi pi-shopping-cart', routerLink: ['/compras/ordenes'] },
                    { label: 'Proveedores', icon: 'pi pi-briefcase', routerLink: ['/compras/proveedores'] },
                    { label: 'Recepciones', icon: 'pi pi-truck', routerLink: ['/compras/recepciones'] }
                ]
            },
            {
                label: 'Productos y Servicios',
                items: [
                    { label: 'Precios', icon: 'pi pi-fw pi-tag', routerLink: ['/productosyservicios/precios'] },
                    { label: 'Categorías', icon: 'pi pi-fw pi-layers', routerLink: ['/productosyservicios/categorias'] }
                ]
            },
            {
                label: 'Finanzas',
                items: [
                    { label: 'Cuentas por Cobrar', icon: 'pi pi-dollar', routerLink: ['/finanzas/cxc'] },
                    { label: 'Cuentas por Pagar', icon: 'pi pi-credit-card', routerLink: ['/finanzas/cxp'] },
                    { label: 'Movimientos Bancarios', icon: 'pi pi-wallet', routerLink: ['/finanzas/bancos'] },
                    { label: 'Reportes Financieros', icon: 'pi pi-chart-bar', routerLink: ['/finanzas/reportes'] }
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
                    { label: 'Parámetros del Sistema', icon: 'pi pi-cog', routerLink: ['/configuracion/sistema'] }
                ]
            },
            {
                label: 'UI Components',
                items: [
                    { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                    { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                    { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
                    { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
                    { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
                    { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                    { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                    { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                    { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                    { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                    { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                    { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
                    { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                    { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                    { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                    { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
                ]
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Landing',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/landing']
                    },
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud']
                    },
                    {
                        label: 'Timeline',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/pages/timeline']
                    },
                    {
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/notfound']
                    },
                    {
                        label: 'Empty',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/pages/empty']
                    },
                ]
            }
        ];
    }
}
