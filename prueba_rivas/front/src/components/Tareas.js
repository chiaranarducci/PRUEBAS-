"use client"

export default function Tareas(props) {
    return(
        <div>
            <p>{props.texto}</p>
            <p>{props.prioridad > 3 ? "Prioridad Alta" : "Prioridad Menor" }</p>
            <p>{props.creador}</p>
        </div>
    )
}