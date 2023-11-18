import { UnidadMedida } from "../types/producto/UnidadMedida";

const BASE_URL = "http://localhost:8088";

const ServicioUnidadMedida = {
    getUnidadesMedida: async (): Promise<UnidadMedida[]> => {
        const response = await fetch(`${BASE_URL}/api/unidadMedidas`);
        const data = await response.json();
        return data;
    },
    getUnidadMedida: async (id: number): Promise<UnidadMedida> => {
        const response = await fetch(`${BASE_URL}/api/unidadMedidas/${id}`);
        const data = await response.json();
        return data;
    },
    createUnidadMedida: async (unidad: UnidadMedida): Promise<UnidadMedida> => {
        const response = await fetch(`${BASE_URL}/api/unidadMedidas`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(unidad)
        });
        const data = await response.json();
        return data;
    },
    updateUnidadMedida: async (id: number, unidad: UnidadMedida): Promise<UnidadMedida> => {
        const response = await fetch(`${BASE_URL}/api/unidadMedidas/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(unidad)
        });
        const data = await response.json();
        return data;
    },
    deleteUnidadMedida: async (id: number): Promise<void> => {
        await fetch(`${BASE_URL}/api/unidadMedidas/${id}`, {
            method: "DELETE"
        });
    }
}
export default ServicioUnidadMedida;