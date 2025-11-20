"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function inicio() {

    const [username, setUsername] = useState("")
    const [alumnoId, setAlumnoId] = useState(0)
    const [mostrarBoton, setMostrarBoton] = useState(false)
    const router = useRouter()



    useEffect(() => {
        if(username.length < 3) {
            setMostrarBoton(false)

        } else {
            setMostrarBoton(true)
        }
    },[username])


    function irTareas() {
        router.push(`/tareas?username=${username}&alumnoId=${alumnoId}`)
    }

    return(
        <div>
            <input placeholder="mete tu nombre" onChange={(e) => {setUsername(e.target.value)}   }/>
            <input placeholder="mete tu alumnoId" type="number" onChange={(e) => {setAlumnoId(e.target.value)}   }/>

            {mostrarBoton ? (
                <button onClick={irTareas}>Ir a tareas</button>

            ) : (
                <p>tiene que tener el username 3 caracteres minimo</p>
            ) }
        </div>
    )
}