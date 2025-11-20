"use client"

import NuevaTarea from "@/components/NuevaTarea"
import Tareas from "@/components/Tarea"
import { useSocket } from "@/hooks/useSocket"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function tareas() {
    
    const searchParams = useSearchParams()
    const {socket, isConnected} = useSocket()
    const username = searchParams.get("username")
    const alumnoId = searchParams.get("alumnoId")

    const [tarea, setTarea] = useState("")
    const [prioridad, setPrioridad] = useState(0)

    const [tareaActual, setTareaActual] = useState({}) 
    const [historial, setHistorial] = useState([]) 


    useEffect(() => {
        if (!socket) {return}

        socket.on("joined_OK_tareas", (data) => {
            console.log("recibio joined")
            console.log(data)
        })

        socket.on("nueva_tarea", (data) => {
            console.log("recibio tarea")
            console.log(data)
            setTareaActual(data)
            setHistorial(prevArray => [...prevArray, { creador: data.creador, texto: data.texto, prioridad: data.prioridad}])
            console.log(historial)
        })

        socket.on("tareas_completas", (data) => {
            console.log("recibio tarea completa")
        })

    }, [socket])

    useEffect(() => {
        console.log(username, alumnoId)
    }, [alumnoId, username])

    useEffect(() => {
        console.log(historial)
    }, [historial])



    function JoinTarea() {
        socket.emit("join_tareas", { alumnoId })
    }

    function handleTarea(e) {
        setTarea(e.target.value)
        console.log(tarea)
    }
    function handlePrioridad(e) {
        setPrioridad(e.target.value)
        console.log(prioridad)
    }
    
    
    function CrearTarea() {
        if (prioridad < 6) {
            socket.emit("crear_tarea", { creador: username, texto: tarea, prioridad: prioridad })
        } else {
            alert(" no se puede ")
        }
    }

    return(
        <div>
            <button onClick={JoinTarea}>Unirse a tareas</button>

            <NuevaTarea 
                onChangeTarea={handleTarea}
                onChangePrioridad={handlePrioridad}
                onClickCrearTarea={CrearTarea}
            />

            <Tareas 
                texto={tareaActual.texto}
                prioridad={tareaActual.prioridad}
                creador={tareaActual.creador}
            />
        </div>

    )
}