"use client"

export default function Boton({text, onClick}){
    return (

        <button onClick={onClick}>{text} </button>

    );

}