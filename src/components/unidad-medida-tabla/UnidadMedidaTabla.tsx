import { useEffect, useState } from "react";
import { UnidadMedida } from "../../types/producto/UnidadMedida";
import ServicioUnidadMedida from "../../services/ServicioUnidadMedida";
import { ModalType } from "../../types/modal-type/ModalType";
import { Button, Table } from "react-bootstrap";
import EditButton from "../edit-button/EditButton";
import DeleteButton from "../delete-button/DeleteButton";
import UnidadMedidaModal from "../unidad-medida-modal/UnidadMedidaModal";
import Loader from "../loader/Loader";

const UnidadMedidaTabla = () => {
    const [unidades, setUnidades] = useState<UnidadMedida[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(false);
    useEffect(() => {
        const fetchUnidades = async () => {
            const unidades = await ServicioUnidadMedida.getUnidadesMedida();
            setUnidades(unidades);
            setIsLoading(false);
        };
        fetchUnidades();
    }, [refreshData]);
    console.log(JSON.stringify(unidades, null, 2));
    const initializeNewUnidad = (): UnidadMedida => {
        return {
            id: 0,
            denominacion: "",
            abreviatura: "",
            fechaAlta: new Date(),
            fechaModificacion: new Date(),
            fechaBaja: new Date(),
        };
    };
    const [unidad, setUnidad] = useState<UnidadMedida>(initializeNewUnidad);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [title, setTitle] = useState("");
    const handleClick = (newTitle: string, uni: UnidadMedida, modal: ModalType) => {
        setTitle(newTitle);
        setModalType(modal)
        setUnidad(uni);
        setShowModal(true);
    };
    return (
        <>
            <Button variant="dark" style={{ float: 'right', margin: "1rem" }} onClick={() => handleClick("Nueva unidad de medida", initializeNewUnidad(), ModalType.CREATE)}>
                Añadir unidad de medida
            </Button>
            {isLoading ? <Loader /> : (
                <Table hover>
                    <thead>
                        <tr>
                            <th>Denominación</th>
                            <th>Abreviatura</th>
                        </tr>
                    </thead>
                    <tbody>
                        {unidades.map(unidad => (
                            <tr key={unidad.id}>
                                <td>{unidad.denominacion}</td>
                                <td>{unidad.abreviatura}</td>
                                <td><EditButton onClick={() => handleClick("Editar unidad de medida", unidad, ModalType.UPDATE)} /></td>
                                <td><DeleteButton onClick={() => handleClick("Eliminar unidad de medida", unidad, ModalType.DELETE)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            {showModal && (
                <UnidadMedidaModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    title={title}
                    modalType={modalType}
                    uni={unidad}
                    refreshData={setRefreshData}
                />
            )}
        </>
    )
}
export default UnidadMedidaTabla