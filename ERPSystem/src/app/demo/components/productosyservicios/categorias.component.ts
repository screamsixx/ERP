import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Categoria } from '../../models/categoria';

@Component({
    templateUrl: './categorias.component.html',
    providers: [MessageService]
})
export class CategoriasComponent implements OnInit {

    categorias: Categoria[] = [];
    categoria: any = {};
    selectedCategorias: Categoria[] = [];

    categoriaDialog: boolean = false;
    deleteCategoriaDialog: boolean = false;
    submitted: boolean = false;

    constructor(
        private categoriasService: CategoriasService,
        private messageService: MessageService
    ) { }

    ngOnInit() {
        this.listAll(); // Método GET
    }

    // GET: Listar todo
    listAll() {
        this.categoriasService.getCategorias().subscribe({
            next: (data) => this.categorias = data,
            error: (e) => console.error(e)
        });
    }

    // ABRIR FORMULARIO NUEVO
    openNew() {
        this.categoria = {};
        this.submitted = false;
        this.categoriaDialog = true;
    }

    // ABRIR FORMULARIO EDICIÓN
    editCategoria(categoria: Categoria) {
        this.categoria = { ...categoria };
        this.categoriaDialog = true;
    }

    // POST / PUT: Guardar o Actualizar
    saveCategoria() {
        this.submitted = true;

        if (this.categoria.nombre?.trim()) {
            if (this.categoria.id) {
                // UPDATE (PUT)
                this.categoriasService.updateCategoria(this.categoria.id, this.categoria).subscribe(() => {
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Categoría actualizada' });
                    this.listAll();
                    this.categoriaDialog = false;
                    this.categoria = {};
                });
            } else {
                // CREATE (POST)
                this.categoriasService.createCategoria(this.categoria).subscribe(() => {
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Categoría creada' });
                    this.listAll();
                    this.categoriaDialog = false;
                    this.categoria = {};
                });
            }
        }
    }

    // DELETE: Abrir confirmación
    deleteCategoria(categoria: Categoria) {
        this.categoria = { ...categoria };
        this.deleteCategoriaDialog = true;
    }

    // DELETE: Confirmar borrado (DELETE)
    confirmDelete() {
        this.categoriasService.deleteCategoria(this.categoria.id).subscribe(() => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Categoría eliminada' });
            this.listAll();
            this.deleteCategoriaDialog = false;
            this.categoria = {};
        });
    }

    hideDialog() {
        this.categoriaDialog = false;
        this.submitted = false;
    }

    onGlobalFilter(table: any, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
