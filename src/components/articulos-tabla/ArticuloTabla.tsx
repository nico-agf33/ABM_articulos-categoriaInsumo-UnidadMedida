//import React from 'react'
import { useEffect, useState } from "react";
import { ModalType } from "../../types/modal-type/ModalType";
import { Button, Table } from "react-bootstrap";
import ServicioArticulo from "../../services/ServicioArticulo";
import DeleteButton from "../delete-button/DeleteButton";
import EditButton from "../edit-button/EditButton";
import Loader from "../loader/Loader";
import ArticuloModal from "../articulos-modal/ArticuloModal";
import { CategoriaArticulo } from "../../types/producto/CategoriaArticulo";
import { UnidadMedida } from "../../types/producto/UnidadMedida";
import ServicioCategoria from "../../services/ServicioCategoria";
import ServicioUnidadMedida from "../../services/ServicioUnidadMedida";
import { Articulo } from "../../types/producto/Articulo";
import { ArticuloDTO } from "../../types/producto/ArticuloDTO";

const ArticuloTable = () => {
    const [articulos, setArticulos] = useState<Articulo[]>([]);
    const [categorias, setCategorias] = useState<CategoriaArticulo[]>([]);
    const [unidades, setUnidades] = useState<UnidadMedida[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(false);
    const [articulosResponse, setArticulosResponse] = useState<ArticuloDTO[]>([])
    const fetchArticulos = async () => {
        await ServicioCategoria.getCategoriasInsumo().then(value => setCategorias(value))
            .then(_ => ServicioUnidadMedida.getUnidadesMedida().then(value => setUnidades(value)))
            .then(_ => ServicioArticulo.getArticulos()
                .then(value => {
                    updateArticulos(value)
                    setArticulosResponse(value)
                }))
            .then(_ => setIsLoading(false));
    };
    useEffect(() => {
        fetchArticulos()
    }, [refreshData]);

    useEffect(() => {
        if (categorias.length && articulos.length && unidades.length)
            updateArticulos(articulosResponse)
    }, [articulosResponse]);

    const updateArticulos = (articulos: ArticuloDTO[]) => {
        setArticulos(articulos.flatMap(a => {
            let articulo: Articulo = {
                categoriaArticulo: categorias.find(c => c.id == a.categoriaArticulo.id)?.denominacion || "",
                unidadMedida: unidades.find(d => d.id == a.unidadMedida.id)?.abreviatura || "",
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

            console.log(articulo)
            return articulo
        }))
        console.log(articulos)
    }
    const initializeNewProduct = (): Articulo => {
        return {
            id: 0,
            denominacion: "",
            urlImagen: "",
            precioCompra: 0.0,
            stockActual: 0.0,
            stockMinimo: 0.0,
            categoriaArticulo: "",
            unidadMedida: "",
            fechaAlta: new Date(),
            fechaModificacion: new Date(),
            fechaBaja: new Date(),
        };
    };
    const [articulo, setArticulo] = useState<Articulo>(initializeNewProduct);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [title, setTitle] = useState("");
    const handleClick = (newTitle: string, art: Articulo, modal: ModalType) => {
        setTitle(newTitle);
        setModalType(modal)
        setArticulo(art);
        setShowModal(true);
    };

    return (
        <>
            <Button variant="dark" style={{ float: 'right', margin: "1rem" }}
                onClick={() => handleClick("Nuevo artículo", initializeNewProduct(), ModalType.CREATE)}>
                Añadir artículo
            </Button>
            {isLoading ? <Loader /> : articulos.length && (
                <Table hover>
                    <thead>
                        <tr>
                            <th>Denominación</th>
                            <th>Imagen</th>
                            <th>Precio de compra</th>
                            <th>Stock actual</th>
                            <th>Stock mínimo</th>
                            <th>Categoría</th>
                            <th>Unidad de medida</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articulos.map(articulo => (
                            <tr key={articulo.id}>
                                <td>{articulo.denominacion}</td>
                                <td><img src={articulo.urlImagen} alt={articulo.denominacion} style={{ width: '50px' }} /></td>
                                <td>$ {articulo.precioCompra}</td>
                                <td>{articulo.stockActual}</td>
                                <td>{articulo.stockMinimo}</td>
                                <td>{articulo.categoriaArticulo}</td>
                                <td>{articulo.unidadMedida}</td>
                                <td><EditButton onClick={() => handleClick("Editar artículo", articulo, ModalType.UPDATE)} />
                                </td>
                                <td><DeleteButton
                                    onClick={() => handleClick("Eliminar artículo", articulo, ModalType.DELETE)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            {showModal && (
                <ArticuloModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    title={title}
                    modalType={modalType}
                    art={articulo}
                    categorias={categorias}
                    unidades={unidades}
                    refreshData={setRefreshData}
                />
            )}
        </>
    )
}
export default ArticuloTable