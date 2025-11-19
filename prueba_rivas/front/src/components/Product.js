"use client"

import Descripcion from "./Descripcion"
import Titulo from "./Titulo"
import Boton from "./Boton"

export default function Product({nombre, onClickVerdetales}){
    return (
        <>
        <Titulo nombre={nombre}> </Titulo>
        <Boton onClick={onClickVerdetales} > </Boton>
        <Descripcion descripcion={text}> </Descripcion>
        </>
    )
} 