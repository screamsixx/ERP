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

    constructor(
        private preciosService: PreciosService,
        private messageService: MessageService,
        private categoriasService: CategoriasService
    ) { }

    ngOnInit() {
        this.loadPrecios();
        this.categoriasService.getCategorias().subscribe(data => this.categorias = data);

        this.cols = [
            { field: 'nombre', header: 'Nombre' },
            { field: 'precio_sin_iva', header: 'Precio sin IVA' },
            { field: 'precio_con_iva', header: 'Precio con IVA' }
        ];
    }

    loadPrecios() {
        this.preciosService.getPrecios().subscribe(data => this.precios = data);
    }

    // --- LÓGICA DE IVA AUTOMÁTICO ---
    onPrecioSinIvaChange(valor: number) {
        if (valor !== null && valor !== undefined) {
            alert("Actualiza IVA automático");
            // Cálculo asumiendo IVA del 16% (1.16)
            this.precio.precio_con_iva = Number((valor * 1.16).toFixed(2));
        }
    }

    openNew() {
        this.precio = {};
        this.submitted = false;
        this.precioDialog = true;
    }

    editPrecio(precio: any) {
        this.precio = { ...precio };
        this.precioDialog = true;
    }

    savePrecio() {
        this.submitted = true;

        if (this.precio.nombre?.trim() && this.precio.categoria_id) {
            if (this.precio.id) {
                // LLAMADA AL SERVICIO: UPDATE
                this.preciosService.updatePrecio(this.precio.id, this.precio).subscribe({
                    next: (data) => {
                        this.precios[this.findIndexById(this.precio.id)] = data;
                        this.precios = [...this.precios];
                        this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Precio Actualizado', life: 3000 });
                        this.precioDialog = false;
                        this.precio = {};
                    },
                    error: () => this.messageError('actualizar')
                });
            } else {
                // LLAMADA AL SERVICIO: CREATE
                this.preciosService.createPrecio(this.precio).subscribe({
                    next: (newPrecio) => {
                        this.precios.push(newPrecio);
                        this.precios = [...this.precios];
                        this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Precio Creado', life: 3000 });
                        this.precioDialog = false;
                        this.precio = {};
                    },
                    error: () => this.messageError('crear')
                });
            }
        }
    }

    deletePrecio(precio: any) {
        this.precio = { ...precio };
        this.deletePrecioDialog = true;
    }

    confirmDelete() {
        this.preciosService.deletePrecio(this.precio.id).subscribe({
            next: () => {
                this.precios = this.precios.filter(val => val.id !== this.precio.id);
                this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Precio Eliminado', life: 3000 });
                this.deletePrecioDialog = false;
                this.precio = {};
            },
            error: () => this.messageError('eliminar')
        });
    }

    deleteSelectedPrecios() {
        this.deletePreciosDialog = true;
    }

    confirmDeleteSelected() {
        this.deletePreciosDialog = false;
        const idsToDelete = this.selectedPrecios.map(p => p.id);

        // Borrado múltiple secuencial
        idsToDelete.forEach(id => {
            this.preciosService.deletePrecio(id).subscribe({
                next: () => {
                    this.precios = this.precios.filter(val => val.id !== id);
                }
            });
        });

        this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Precios Eliminados', life: 3000 });
        this.selectedPrecios = [];
    }

    // --- MÉTODOS DE APOYO ---
    hideDialog() {
        this.precioDialog = false;
        this.submitted = false;
    }

    findIndexById(id: any): number {
        return this.precios.findIndex(p => p.id === id);
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    private messageError(accion: string) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `No se pudo ${accion} el precio`, life: 3000 });
    }
}
