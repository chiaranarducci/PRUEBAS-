"use client"

export default function NuevaTarea(props) {

    

    return(
        <div>
            <h1>Crear Nueva Tarea</h1>
            <input placeholder="ingresar texto de la tarea" onChange={props.onChangeTarea} />
            <input placeholder="ingresar numero de la priorirdad" type="number" onChange={props.onChangePrioridad} />
            <button onClick={props.onClickCrearTarea}>Crear Tarea</button>
        </div>
    )
}