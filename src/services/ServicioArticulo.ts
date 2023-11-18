
import { ArticuloDTO } from "../types/producto/ArticuloDTO";


const BASE_URL = "http://localhost:8088";

const ServicioArticulo = {
    getArticulos: async (): Promise<ArticuloDTO[]> => {
        const response = await fetch(`${BASE_URL}/api/articulos`);
        const data = await response.json();
        return data;
    },
    getArticulo: async (id: number): Promise<ArticuloDTO> => {
        const response = await fetch(`${BASE_URL}/api/articulos/${id}`);
        const data = await response.json();
        return data;
    },
    createArticulo: async (articulo: ArticuloDTO): Promise<ArticuloDTO> => {
        const response = await fetch(`${BASE_URL}/api/articulos`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(articulo)
        });
        const data = await response.json();
        return data;
    },
    updateArticulo: async (id: number, articulo: ArticuloDTO): Promise<ArticuloDTO> => {
        const response = await fetch(`${BASE_URL}/api/articulos/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(articulo)
        });
        const data = await response.json();
        return data;
    },
    deleteArticulo: async (id: number): Promise<void> => {
        await fetch(`${BASE_URL}/api/articulos/${id}`, {
            method: "DELETE"
        });
    }
}
export default ServicioArticulo;