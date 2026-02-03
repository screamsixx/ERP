export interface Precio {
    id: number;
    categoria_id: number;
    nombre: string;
    precio_sin_iva: number | null;
    precio_con_iva: number | null;
}
