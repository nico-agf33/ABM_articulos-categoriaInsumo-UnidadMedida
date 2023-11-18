
export interface Articulo {
    id: number;
    denominacion: string;
    urlImagen: string;
    precioCompra: number;
    stockActual: number;
    stockMinimo: number;
    unidadMedida: string;
    categoriaArticulo: string;
    fechaAlta: Date;
    fechaModificacion: Date;
    fechaBaja: Date;
};