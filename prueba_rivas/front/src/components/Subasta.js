"use client"

export default function Subasta (props){

    return (
        <>
        
        <p>producto={props.producto}</p>
        <p>precio actual={props.precioActual}</p>
        <p>mejor postor={props.mejorPostor} </p>
        
        {props.mejorPostor ? (
            <p>Mejor postor:{props.mejorPostor} </p>
        ) : (
            <p>No existe mejor postor </p>
        )}
        
        </>
    )


}
