import { useEffect, useState } from "react";
import { CategoriaArticulo } from "../../types/producto/CategoriaArticulo";
import ServicioCategoria from "../../services/ServicioCategoria";
import { ModalType } from "../../types/modal-type/ModalType";
import Loader from "../loader/Loader";
import EditButton from "../edit-button/EditButton";
import DeleteButton from "../delete-button/DeleteButton";
import { Button, Table } from "react-bootstrap";
import CategoriasInsumoModal from "../categorias-insumo-modal/CategoriasInsumoModal";

const CategoriasInsumoTabla = () => {
    const [categorias, setCategorias] = useState<CategoriaArticulo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(false);
    useEffect(() => {
        const fetchCategorias = async () => {
            const categorias = await ServicioCategoria.getCategoriasInsumo();
            setCategorias(categorias);
            setIsLoading(false);
        };
        fetchCategorias();
    }, [refreshData]);
    console.log(JSON.stringify(categorias, null, 2));
    const initializeNewCategoria = (): CategoriaArticulo => {
        return {
            id: 0,
            denominacion: "",
            fechaAlta: new Date(),
            fechaModificacion: new Date(),
            fechaBaja: new Date(),
        };
    };
    const [categoria, setCategoria] = useState<CategoriaArticulo>(initializeNewCategoria);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [title, setTitle] = useState("");
    const handleClick = (newTitle: string, catArt: CategoriaArticulo, modal: ModalType) => {
        setTitle(newTitle);
        setModalType(modal)
        setCategoria(catArt);
        setShowModal(true);
    };
    return (
        <>
            <Button variant="dark" style={{ float: 'right', margin: "1rem" }} onClick={() => handleClick("Nueva categoria", initializeNewCategoria(), ModalType.CREATE)}>
                Añadir categoría
            </Button>
            {isLoading ? <Loader /> : (
                <Table hover>
                    <thead>
                        <tr>
                            <th>Denominación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map(categoria => (
                            <tr key={categoria.id}>
                                <td>{categoria.denominacion}</td>
                                <td><EditButton onClick={() => handleClick("Editar categoria", categoria, ModalType.UPDATE)} /></td>
                                <td><DeleteButton onClick={() => handleClick("Eliminar categoria", categoria, ModalType.DELETE)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            {showModal && (
                <CategoriasInsumoModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    title={title}
                    modalType={modalType}
                    catArt={categoria}
                    refreshData={setRefreshData}
                />
            )}
        </>
    )
}
export default CategoriasInsumoTabla