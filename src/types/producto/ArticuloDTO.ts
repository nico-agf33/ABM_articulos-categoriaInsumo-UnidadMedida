import { CategoriaArticulo } from "./CategoriaArticulo";
import { UnidadMedida } from "./UnidadMedida";


export interface ArticuloDTO {
    id: number;
    denominacion: string;
    urlImagen: string;
    precioCompra: number;
    stockActual: number;
    stockMinimo: number;
    unidadMedida: UnidadMedida;
    categoriaArticulo: CategoriaArticulo;
    fechaAlta: Date;
    fechaModificacion: Date;
    fechaBaja: Date;
};