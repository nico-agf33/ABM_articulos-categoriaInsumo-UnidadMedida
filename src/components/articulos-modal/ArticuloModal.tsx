//import React from 'react'
import { Button, Form, Modal } from "react-bootstrap";
import { ModalType } from "../../types/modal-type/ModalType";
import { toast } from 'react-toastify';
import * as Yup from "yup";
import { useFormik } from "formik";
import ServicioArticulo from "../../services/ServicioArticulo";
import React from "react";
import { Articulo } from "../../types/producto/Articulo";
import { ArticuloDTO } from "../../types/producto/ArticuloDTO";
import { CategoriaArticulo } from "../../types/producto/CategoriaArticulo";
import { UnidadMedida } from "../../types/producto/UnidadMedida";

type ArticuloModalProps = {
    show: boolean;
    onHide: () => void;
    title: string;
    modalType: ModalType;
    art: Articulo;
    categorias: CategoriaArticulo[];
    unidades: UnidadMedida[];
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

const ArticuloModal = ({ show, onHide, title, modalType, art, categorias, unidades, refreshData }: ArticuloModalProps) => {

    const handleSaveUpdate = async (a: Articulo) => {
        try {
            const isNew = a.id === 0;
            let articuloDto: ArticuloDTO = {
                categoriaArticulo: categorias.find(c => c.denominacion == a.categoriaArticulo) || obtenerCategoriaVacia(),
                unidadMedida: unidades.find(d => d.abreviatura == a.unidadMedida) || obtenerUnidadVacia(),
                id: a.id,
                denominacion: a.denominacion,
                urlImagen: a.urlImagen,
                precioCompra: a.precioCompra,
                stockActual: a.stockActual,
                stockMinimo: a.stockMinimo,
                fechaAlta: a.fechaAlta,
                fechaModificacion: a.fechaModificacion,
                fechaBaja: a.fechaBaja
            }
            if (isNew) {
                await ServicioArticulo.createArticulo(articuloDto);
            } else {
                await ServicioArticulo.updateArticulo(articuloDto.id, articuloDto);
            }
            toast.success(isNew ? "Nuevo artículo añadido" : "Artículo actualizado", { position: "top-center", });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error('Se ha producido un error');
        }
    };
    const obtenerCategoriaVacia = () => {
        let c: CategoriaArticulo = {
            denominacion: "", fechaAlta: new Date(), fechaBaja: new Date(), fechaModificacion: new Date(), id: 0
        }
        return c
    }
    const obtenerUnidadVacia = () => {
        let d: UnidadMedida = {
            denominacion: "", abreviatura: "", fechaAlta: new Date(), fechaBaja: new Date(), fechaModificacion: new Date(), id: 0
        }
        return d
    }
    const handleDelete = async () => {
        try {
            await ServicioArticulo.deleteArticulo(art.id);
            toast.success("Articulo eliminado correctamente", { position: "top-center", });
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
            denominacion: Yup.string().required('Se requiere ingresar una denominación'),
            urlImagen: Yup.string().required('Se requiere ingresar la URL de una imagen'),
            precioCompra: Yup.number().min(0).required('Se requiere ingresar un precio'),
            categoriaArticulo: Yup.string().oneOf(categorias.map(c => c.denominacion)),
            unidadMedida: Yup.string().oneOf(unidades.map(c => c.abreviatura)),
            stockActual: Yup.number().min(0).required('Se requiere ingresar el stock actual'),
            stockMinimo: Yup.number().min(0).required('Se requiere ingresar un stock mínimo'),
        });
    };
    const formik = useFormik({
        initialValues: art,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: Articulo) => handleSaveUpdate(obj),
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
                            <p>¿Está seguro que desea eliminar este artículo?<br />
                                <strong>{art.denominacion}</strong>?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="dark" onClick={onHide}>
                                Cancelar
                            </Button>
                            <Button variant="danger" onClick={handleDelete}>
                                Eliminar artículo
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
                                    <Form.Label>Denominación</Form.Label>
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
                                {/* urlImagen */}
                                <Form.Group controlId="formUrlImagen">
                                    <Form.Label>URL Imagen</Form.Label>
                                    <Form.Control
                                        name="urlImagen"
                                        type="string"
                                        value={formik.values.urlImagen || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.urlImagen && formik.touched.urlImagen)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.urlImagen}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                {/* precioCompra */}
                                <Form.Group controlId="formPrecioCompra">
                                    <Form.Label>Precio de compra</Form.Label>
                                    <Form.Control
                                        name="precioCompra"
                                        type="text"
                                        value={formik.values.precioCompra || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.precioCompra && formik.touched.precioCompra)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.precioCompra}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                {/* stockActual */}
                                <Form.Group controlId="formStockActual">
                                    <Form.Label>Stock actual</Form.Label>
                                    <Form.Control
                                        name="stockActual"
                                        type="text"
                                        value={formik.values.stockActual || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.stockActual && formik.touched.stockActual)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.stockActual}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                {/* stockMinimo */}
                                <Form.Group controlId="formStockMinimo">
                                    <Form.Label>Stock mínimo</Form.Label>
                                    <Form.Control
                                        name="stockMinimo"
                                        type="text"
                                        value={formik.values.stockMinimo || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.stockMinimo && formik.touched.stockMinimo)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.stockMinimo}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                {/* categoriaArticulo */}
                                <Form.Group controlId="formCategoriaArticulo">
                                    <Form.Label>Categoría</Form.Label>
                                    <Form.Select
                                        name="categoriaArticulo"
                                        defaultValue={formik.values.categoriaArticulo}
                                        onChange={e => {
                                            formik.values.categoriaArticulo = e.target.value;
                                        }}
                                        isInvalid={Boolean(formik.errors.categoriaArticulo && formik.touched.categoriaArticulo)}>
                                        <option key={-1}>Elija una categoria</option>
                                        {
                                            categorias?.map((value: CategoriaArticulo) =>
                                                <option key={value.id}
                                                    id={value.id.toString()}
                                                    value={value.denominacion}>
                                                    {value.denominacion}
                                                </option>
                                            )
                                        }
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.categoriaArticulo}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                {/* unidadMedida */}
                                <Form.Group controlId="formUnidadMedida">
                                    <Form.Label>Unidad de medida</Form.Label>
                                    <Form.Select
                                        name="unidadMedida"
                                        defaultValue={formik.values.unidadMedida}
                                        onChange={e => {
                                            formik.values.unidadMedida = e.target.value;
                                        }}
                                        isInvalid={Boolean(formik.errors.unidadMedida && formik.touched.unidadMedida)}>
                                        <option key={-1}>Elija una unidad de medida</option>
                                        {
                                            unidades?.map((value: UnidadMedida) =>
                                                <option key={value.id}
                                                    id={value.id.toString()}
                                                    value={value.abreviatura}>
                                                    {value.abreviatura}
                                                </option>
                                            )
                                        }
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.unidadMedida}
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
export default ArticuloModal