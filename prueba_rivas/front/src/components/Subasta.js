"use client"

export default function Subasta (props){

    return (
        <>
        
        <p>{props.producto}</p>
        <p>{props.precioActual}</p>
        <p>{props.mejorPostor} </p>
        
        {props.mejorPostor ? (
            <p>Mejor postor:{props.mejorPostor} </p>
        ) : (
            <p>No existe mejor postor </p>
        )}
        
        </>
    )


}
