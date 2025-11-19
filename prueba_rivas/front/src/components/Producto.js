"use client"
import Title from "./Title"
import Button from "./Button"
import Description from "./Description"
export default function Producto({nombre, descripcion, onClickVerDetalles}){
    return (
        <>
        <Title texto={nombre}></Title>
        <Button texto="Ver detalles" funcionalidad={onClickVerDetalles} />
        <Description text={descripcion}></Description>
    </>
    )
}