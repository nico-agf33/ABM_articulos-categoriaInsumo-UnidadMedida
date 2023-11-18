import { toast } from "react-toastify";
import ServicioUnidadMedida from "../../services/ServicioUnidadMedida";
import { UnidadMedida } from "../../types/producto/UnidadMedida";
import { ModalType } from "../../types/modal-type/ModalType";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Form, Modal } from "react-bootstrap";

type ProductModalProps = {
    show: boolean;
    onHide: () => void;
    title: string;
    modalType: ModalType;
    uni: UnidadMedida;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

const UnidadMedidaModal = ({ show, onHide, title, modalType, uni, refreshData }: ProductModalProps) => {
    const handleSaveUpdate = async (un: UnidadMedida) => {
        try {
            const isNew = un.id === 0;
            if (isNew) {
                await ServicioUnidadMedida.createUnidadMedida(un);
            } else {
                await ServicioUnidadMedida.updateUnidadMedida(un.id, un);
            }
            toast.success(isNew ? "Nueva categoria añadida" : "Categoria actualizada", { position: "top-center", });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error('Se ha producido un error');
        }
    };
    const handleDelete = async () => {
        try {
            await ServicioUnidadMedida.deleteUnidadMedida(uni.id);
            toast.success("Unidad de medida eliminda correctamente", { position: "top-center", });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error('Se ha producido un error');
        }
    };
    const validationSchema = () => {
        return Yup.object().shape({
            id: Yup.number().integer().min(0),
            denominacion: Yup.string().required('Se requiere ingresar una denominacion'),
            abreviatura: Yup.string().required('Se requiere ingresar una abreviatura'),
        });
    };
    const formik = useFormik({
        initialValues: uni,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: UnidadMedida) => handleSaveUpdate(obj),
    });
    return (
        <>
            {modalType === ModalType.DELETE ? (
                <>
                    <Modal show={show} onHide={onHide} centered backdrop="static">
                        <Modal.Header closeButton>
                            <Modal.Title>{title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>¿Está seguro que desea eliminar esta unidad de medida?<br />
                                <strong>{uni.abreviatura}</strong>?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" onClick={onHide}>
                                Cancelar
                            </Button>
                            <Button variant="danger" onClick={handleDelete}>
                                Eliminar unidad de medida
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            ) : (
                <>
                    <Modal show={show} onHide={onHide} centered backdrop="static" className="modal-xl">
                        <Modal.Header closeButton>
                            <Modal.Title>{title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={formik.handleSubmit}>
                                {/* Denominacion */}
                                <Form.Group controlId="formDenominacion">
                                    <Form.Label>Denominacion</Form.Label>
                                    <Form.Control
                                        name="denominacion"
                                        type="text"
                                        value={formik.values.denominacion || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.denominacion && formik.touched.denominacion)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.denominacion}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* Abreviatura */}
                                <Form.Group controlId="formAbreviatura">
                                    <Form.Label>Abreviatura</Form.Label>
                                    <Form.Control
                                        name="abreviatura"
                                        type="text"
                                        value={formik.values.abreviatura || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.abreviatura && formik.touched.abreviatura)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.abreviatura}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Modal.Footer className="mt-4">
                                    <Button variant="dark" onClick={onHide}>
                                        Cancelar
                                    </Button>
                                    <Button variant="warning" type="submit" disabled={!formik.isValid}>
                                        Guardar
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </>
            )}
        </>
    )
}
export default UnidadMedidaModal