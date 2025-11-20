"use client"
import { useState, useEffect, use, useEffectEvent } from "react"
import Button from "../../components/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { io } from "socket.io-client" 
import Turno from "../../components/Turno";
import AgendarNuevoTurno from "../../components/AgendarNuevoTurno";


export default function Turnos (){
    const searchParams = useSearchParams();
    const [username, setUsername] = useState("")
    const [alumnoId, setAlumnoId] = useState("")
    const [turno, setTurno] = useState("")
    const [turnoRealizado, setTurnoRealizado] = useState(false)
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const username = searchParams.get("username")
        const id = searchParams.get("alumnoId")
        if (username) setUsuario(username)
        if (id) setAlumnoId(id)
    }, [searchParams])


    useEffect (() =>{
        const newSocket = io("http://10.1.5.137:4000");
        setSocket(newSocket);

        newSocket.on('connect', () => {
            setIsConnected(true);
            console.log('Socket conectado');
        });

        newSocket.on('disconnect', () => {
            setIsConnected(false);
            console.log('Socket desconectado');
        });

        newSocket.on("joined_OK_turnos", (data) => {
            console.log(data);
            setTurno(data)
            setTurnoRealizado(false)
        });
        newSocket.on("nueva_reserva", (data) => {
            console.log(data);   
            setTurno(data)
            setTurnoRealizado(true)
        });
        if (turnoRealizado > 5){

            newSocket.on("turnos_completos", (data) => {
                console.log(data);
                setTurno(data);
                setTurnoRealizado(true) 
                
            });

        }
        return () => {
            newSocket.disconnect()
        }
    }, [])

    function unirseATurnos() {
        if (socket && isConnected) {
            socket.emit("join_turnos", {id: alumnoId})

        };
    }

    return (
        <>
        
        
        <Button funcionalidad={unirseATurnos} ></Button>
        <Turno 
        especialidad={especialidad.data}
        turno={especialidad.data}
        ></Turno>
        
        
        
        </>




    )
}