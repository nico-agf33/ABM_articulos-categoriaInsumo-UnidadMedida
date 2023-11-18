import { toast } from "react-toastify";
import ServicioCategoria from "../../services/ServicioCategoria";
import { CategoriaArticulo } from "../../types/producto/CategoriaArticulo";
import { ModalType } from "../../types/modal-type/ModalType";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Form, Modal } from "react-bootstrap";

type ProductModalProps = {
    show: boolean;
    onHide: () => void;
    title: string;
    modalType: ModalType;
    catArt: CategoriaArticulo;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

const CategoriasInsumoModal = ({ show, onHide, title, modalType, catArt, refreshData }: ProductModalProps) => {
    const handleSaveUpdate = async (cat: CategoriaArticulo) => {
        try {
            const isNew = cat.id === 0;
            if (isNew) {
                await ServicioCategoria.createCategoriaInsumo(cat);
            } else {
                await ServicioCategoria.updateCategoriaInsumo(cat.id, cat);
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
            await ServicioCategoria.deleteCategoriaInsumo(catArt.id);
            toast.success("Categoria eliminda correctamente", { position: "top-center", });
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
        });
    };
    const formik = useFormik({
        initialValues: catArt,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: CategoriaArticulo) => handleSaveUpdate(obj),
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
                            <p>¿Está seguro que desea eliminar esta categoría?<br />
                                <strong>{catArt.denominacion}</strong>?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" onClick={onHide}>
                                Cancelar
                            </Button>
                            <Button variant="danger" onClick={handleDelete}>
                                Eliminar categoria
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
export default CategoriasInsumoModal