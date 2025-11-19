"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Input from "../../components/Input"
import Button from "../../components/Button"

export default function Registro() {
    const [username, setUsername] = useState("")
    const [alumnoId, setAlumnoId] = useState("")
    const router = useRouter();



    return (
        <>
            <Input
                type="text"
                value={nombre}
                onChange={(event) => setUsername(event.target.value)}>
                Ingresa tu nombre</Input>

            {nombre.length > 0 && nombre.length < 3 && (
                <p>Tiene que tener mas de 3 letras</p>

            )}

            <Input
                type="number"
                value={alumnoId}
                onChange={(event) => setAlumnoId(event.target.value)}>
                Ingresa tu id</Input>

            <Button
                texto="ir a subastas"
                funcionalidad={() => router.push(`/subastas?nombre=${username}&&id=${alumnoId}  `)}>

            </Button>


        </>
    );

}