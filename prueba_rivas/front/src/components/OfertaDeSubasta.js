"use client"
import Input from "./Input"
import Button from "./Button"
export default function OfertaDeSubasta(onChangeOferta, onClickRealizarOferta){

    return(
        <>
            <h1>{props.titulo}</h1>
            <Input onChange={onChangeOferta()} ></Input>
            <Button funcionalidad={onClickRealizarOferta()} > Ofertar </Button>
        </>
    )
}