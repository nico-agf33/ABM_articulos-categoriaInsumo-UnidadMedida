import { CategoriaArticulo } from "../types/producto/CategoriaArticulo";

const BASE_URL = "http://localhost:8088";

const ServicioCategoria = {
    getCategoriasInsumo: async (): Promise<CategoriaArticulo[]> => {
        const response = await fetch(`${BASE_URL}/api/categorias`);
        const data = await response.json();
        return data;
    },
    getCategoriaInsumo: async (id: number): Promise<CategoriaArticulo> => {
        const response = await fetch(`${BASE_URL}/api/categorias/${id}`);
        const data = await response.json();
        return data;
    },
    createCategoriaInsumo: async (categoria: CategoriaArticulo): Promise<CategoriaArticulo> => {
        const response = await fetch(`${BASE_URL}/api/categorias`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(categoria)
        });
        const data = await response.json();
        return data;
    },
    updateCategoriaInsumo: async (id: number, categoria: CategoriaArticulo): Promise<CategoriaArticulo> => {
        const response = await fetch(`${BASE_URL}/api/categorias/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(categoria)
        });
        const data = await response.json();
        return data;
    },
    deleteCategoriaInsumo: async (id: number): Promise<void> => {
        await fetch(`${BASE_URL}/api/categorias/${id}`, {
            method: "DELETE"
        });
    }
}
export default ServicioCategoria;