"use client"
import { useState, useEffect } from "react"
import Button from "../../components/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { io } from "socket.io-client" 
import Subasta from "../../components/Subasta";
import OfertaDeSubasta from "../../components/OfertaDeSubasta";

export default function Subastas() {
    const router = useRouter();
    const [usuario, setUsuario] = useState("")
    const [alumnoId, setAlumnoId] = useState("")
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [subasta, setSubasta] = useState(null)
    const [monto, setMonto] = useState(0)
    const [historial, setHistorial] = useState([])
    const [subastaFinalizada, setSubastaFinalizada] = useState(false)
    const searchParams = useSearchParams();//para parametros de url
    useEffect(() => {
        const username = searchParams.get("username")
        const id = searchParams.get("alumnoId")
        if (username) setUsuario(username)
        if (id) setAlumnoId(id)
    }, [searchParams])

    useEffect (() => {

        if (subasta && subasta.mejorPostor && subasta.precioActual){
            const nuevaOferta = {
                postor: subasta.mejorPostor,
                monto: subasta.precioActual,
                timestamp: subasta.timestamp || new Date().toLocaleString()
            }
            setHistorial(prev => [nuevaOferta, ...prev]. slice(0, 5))
        }

    }, [subasta])


    useEffect(() => {

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

        newSocket.on("joined_OK_subasta", (data) => {
            console.log(data);
            setSubasta(data)
            setSubastaFinalizada(false)
        });
        newSocket.on("nueva_oferta", (data) => {
            console.log(data);   
            setSubasta(data)
        });
        newSocket.on("subasta_finalizada", (data) => {
            console.log(data);
            setSubasta(data);
            setSubastaFinalizada(true) 
            setMonto(0) 
        });
        return () => {
            newSocket.disconnect()
        }



    });



    function unirseASalaDeSubastas() {
        if (socket && alumnoId) {
            socket.emit("join_subasta", { alumnoId: alumnoId })
            console.log("Emitiendo join_subasta con alumnoId:", alumnoId)
        }
    }


    function realizarOferta() {
        if (!subasta || monto <= subasta.precioActual) {
            alert("El monto debe ser mayor al precio actual")
            return
        }

        if (socket && usuario && monto) {
            socket.emit("realizar_oferta", { usuario: usuario, monto: monto })
            console.log("Oferta realizada - Usuario:", usuario, "Monto:", monto)
        }
    }


    return (
        <>
        {isConnected && alumnoId && (
            <p>Número de sala: {alumnoId}</p>
        )}

        <Button funcionalidad={unirseASalaDeSubastas()} >Unirse a la sala de subastas</Button>


        {subasta && (
            <Subasta 
                producto={subasta.producto}
                precioActual={subasta.precioActual}
                mejorPostor={subasta.mejorPostor}
            />
        )}

        {subastaFinalizada && (
            <p>Finalizo la subasta!!!!!!!</p>
        )}
        <OfertaDeSubasta
            onChangeOferta={(event) => setMonto(Number(event.target.value))}
            onClickRealizarOferta={realizarOferta}
        
        >
        {!subasta && (
                <p>
                    No hay subasta activa. Unite a la sala primero.
                </p>
            )}

        </OfertaDeSubasta>
            <h2>Historial de Ofertas</h2>
                {historial.length === 0 ? (
                    <p>No hay ofertas.</p>
                ) : (
                    <ul>
                        {historial.map((oferta, index) => (
                            <li key={index}>
                                <strong>Postor:</strong> {oferta.postor}  
                                <strong> Monto:</strong> ${oferta.monto} 
                                <strong> Hora:</strong> {oferta.timestamp}
                            </li>
                        ))}
                    </ul>
                )}



        </>
    )
}