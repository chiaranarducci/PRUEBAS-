"use client"

export default function Turno (props){

    return (
        <> 
        <p> {props.especialidad}</p>
        <p> {props.turnoActual}</p>
        <p> {props.cantidadReservas}</p>
        <p> {props.pacienteActual}</p>
        
        </>
    )

}