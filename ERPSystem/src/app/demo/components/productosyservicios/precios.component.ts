import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { PreciosService } from 'src/app/services/precios.service';
import { CategoriasService } from '../../../services/categorias.service';

@Component({
    templateUrl: './precios.component.html',
    providers: [MessageService]
})
export class PreciosComponent implements OnInit {

    precioDialog: boolean = false;

    deletePrecioDialog: boolean = false;

    deletePreciosDialog: boolean = false;

    precios: any[] = [];
    categorias: any[] = [];

    precio: any = {};

    selectedPrecios: any[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private preciosService: PreciosService, private messageService: MessageService,
        private categoriasService: CategoriasService
    ) { }

    ngOnInit() {
        this.preciosService.getPrecios().subscribe(data => this.precios = data);
        this.categoriasService.getCategorias().subscribe(data=>this.categorias=data);

        this.cols = [
            { field: 'nombre', header: 'Nombre' },
            { field: 'precio_sin_iva', header: 'Precio sin IVA' },
            { field: 'precio_con_iva', header: 'Precio con IVA' },
            // { field: 'categoria_id', header: 'Categoría' }
        ];
    }

    openNew() {
        this.precio = {};
        this.submitted = false;
        this.precioDialog = true;
    }

    deleteSelectedPrecios() {
        this.deletePreciosDialog = true;
    }

    editPrecio(precio: any) {
        this.precio = { ...precio };
        this.precioDialog = true;
    }

    deletePrecio(precio: any) {
        this.deletePrecioDialog = true;
        this.precio = { ...precio };
    }

    confirmDeleteSelected() {
        this.deletePreciosDialog = false;
        this.precios = this.precios.filter(val => !this.selectedPrecios.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Precios Eliminados', life: 3000 });
        this.selectedPrecios = [];
    }

    confirmDelete() {
        this.deletePrecioDialog = false;
        this.precios = this.precios.filter(val => val.id !== this.precio.id);
        this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Precio Eliminado', life: 3000 });
        this.precio = {};
    }

    hideDialog() {
        this.precioDialog = false;
        this.submitted = false;
    }

    savePrecio() {
        this.submitted = true;

        if (this.precio.nombre?.trim() && this.precio.categoria_id) {
            if (this.precio.id) {
                this.precios[this.findIndexById(this.precio.id)] = this.precio;
                this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Precio Actualizado', life: 3000 });
            } else {
                this.precio.id = this.createId();
                this.precios.push(this.precio);
                this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Precio Creado', life: 3000 });
            }

            this.precios = [...this.precios];
            this.precioDialog = false;
            this.precio = {};
        }
    }

    findIndexById(id: any): number {
        let index = -1;
        for (let i = 0; i < this.precios.length; i++) {
            if (this.precios[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
