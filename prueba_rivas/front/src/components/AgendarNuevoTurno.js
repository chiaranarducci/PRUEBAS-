"use client"

export default function AgendarNuevoTurno( props ) {

    return (
        <>
            <h1>Agendar nuevo turno</h1>
            <input placeholder="ingresar numero del nuevo turno" type="number" onChange={props.onChangeNumeroTurno} ></input>
            <button funcionalidad={props.onClickRealizarReservaDeTurno} > Reservar turno </button>

        </>
    );
}