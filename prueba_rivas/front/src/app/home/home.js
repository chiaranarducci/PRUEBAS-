"use client"

import { useState, useEffect } from "react";
import Producto from "../../components/Producto";

export default function Home() {
    const [productos, setProductos] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [nombreNuevo, setNombreNuevo] = useState("");
    const [descripcionNueva, setDescripcionNueva] = useState("");

    useEffect(() => {
        async function cargarProductos() {
            const response = await fetch("http://localhost:4000/productos");
            const result = await response.json();
            console.log(result);
            setProductos(result.productos); // o result.data, depende del back
        }

        cargarProductos();
    }, []);

    function cambioCheck(event) {
        setMostrarFormulario(event.target.checked);
    }

    async function agregarProducto() {
        const response = await fetch("http://localhost:4000/crearProducto", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombre: nombreNuevo,
                descripcion: descripcionNueva
            })
        });

        const result = await response.json();
        console.log(result);
        const responseProductos = await fetch("http://localhost:4000/productos");
        const resultProductos = await responseProductos.json();
        setProductos(resultProductos.productos);

        setNombreNuevo("");
        setDescripcionNueva("");
    }

    return (
        <>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={mostrarFormulario}
                        onChange={cambioCheck}
                    />
                    Agregar nuevo producto
                </label>
            </div>

            {/* Si el checkbox NO está marcado, mostrar productos */}
            {!mostrarFormulario && (
                <div>
                    {productos.map((producto, index) => (
                        <Producto
                            key={index}
                            nombre={producto.nombre}
                            descripcion={producto.descripcion}
                        />
                    ))}
                </div>
            )}

            {/* Si el checkbox SÍ está marcado, mostrar formulario */}
            {mostrarFormulario && (
                <div>
                    <input
                        type="text"
                        placeholder="Nombre del producto"
                        value={nombreNuevo}
                        onChange={(e) => setNombreNuevo(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Descripción"
                        value={descripcionNueva}
                        onChange={(e) => setDescripcionNueva(e.target.value)}
                    />
                    <button onClick={agregarProducto}>
                        Agregar Producto
                    </button>
                </div>
            )}

            {/*
===============================================================================
📌 RESUMEN COMPLETO DE CONCEPTOS DE REACT + JAVASCRIPT (Bien Explicado + Ejemplos)
===============================================================================

1) COMPONENTES
---------------
Un componente es una función que devuelve JSX (HTML dentro de JavaScript).
Sirve para crear partes reutilizables de la interfaz.

Ejemplo:
function Saludo() {
  return <h1>Hola!</h1>;
}

Se usa así:
<Saludo />


2) COMPONENTES COMPUESTOS
--------------------------
Son componentes que se combinan entre sí para formar interfaces más complejas.
Un componente “padre” contiene a otros componentes “hijos”.

Ejemplo:
function Card({ children }) {
  return <div className="card">{children}</div>;
}

function Perfil() {
  return (
    <Card>
      <h2>Chiara</h2>
      <p>Bioingeniería</p>
    </Card>
  );
}

→ "Card" envuelve todo → lo hace un componente compuesto.


3) PROPS
---------
Las props son datos que se pasan de un componente padre a un componente hijo.
Son como parámetros de una función.

Ejemplo:
function Boton({ texto }) {
  return <button>{texto}</button>;
}

Se usa así:
<Boton texto="Hacer click" />

→ El botón mostrará “Hacer click”.


4) MAP
-------
Método para renderizar listas dinámicamente.
Itera un array y devuelve un elemento JSX por item.

Ejemplo:
const frutas = ["Manzana", "Pera", "Banana"];

{frutas.map((fruta, i) => (
  <p key={i}>{fruta}</p>
))}

→ Renderiza 3 <p> con cada fruta.


5) STYLES
----------
Hay varias formas de estilizar componentes en React:

a) Inline:
<div style={{ color: "red", fontSize: 20 }}>Hola</div>

b) CSS Modules:
import styles from "./home.module.css";
<div className={styles.titulo}>Hola</div>

c) Tailwind:
<div className="text-red-500 text-xl">Hola</div>


6) FETCH
---------
Sirve para hacer peticiones a un servidor (API).

Ejemplo:
async function cargarUsuarios() {
  const res = await fetch("/api/users");
  const data = await res.json();
  console.log(data);
}

useEffect(() => {
  cargarUsuarios();
}, []);

→ Se llama al backend cuando el componente se monta.


7) SOCKETS (WebSockets)
------------------------
Permiten comunicación en tiempo real (chat, juegos, notificaciones).

Ejemplo:
import { io } from "socket.io-client";
const socket = io("http://localhost:3001");

useEffect(() => {
  socket.on("mensaje", (data) => {
    console.log("Llegó un mensaje:", data);
  });
}, []);

→ El cliente recibe mensajes en vivo del servidor.


8) USESTATE
------------
Hook que permite manejar estados dentro de un componente.
Cuando cambia, React vuelve a renderizar.

Ejemplo:
const [contador, setContador] = useState(0);

<button onClick={() => setContador(contador + 1)}>
  Sumar
</button>

→ Cada click aumenta el contador y se actualiza la UI.


9) USEEFFECT
-------------
Sirve para ejecutar código cuando:
- el componente se monta
- se actualiza una variable
- o se desmonta

Ejemplo: correr algo al montar
useEffect(() => {
  console.log("El componente se montó");
}, []);

Ejemplo: correr cuando cambia "id"
useEffect(() => {
  cargarDatos(id);
}, [id]);


10) SEARCHPARAMS (Next.js)
---------------------------
Sirve para leer los parámetros de la URL.

Ejemplo URL:
  /perfil?id=55&nombre=chiara

En el componente:
const searchParams = useSearchParams();
const id = searchParams.get("id");
const nombre = searchParams.get("nombre");

→ id = "55"
→ nombre = "chiara"


11) ROUTER.PUSH
----------------
Se usa para navegar a otra ruta desde el código.

Ejemplo:
const router = useRouter();

function irAlHome() {
  router.push("/home");
}

<button onClick={irAlHome}>Ir al Home</button>


12) CONDITIONAL RENDERING
--------------------------
Renderizar UI dependiendo de una condición.

Formas:

a) Ternario:
{cargando ? <p>Cargando...</p> : <p>Listo!</p>}

b) AND lógico:
{user && <p>Hola {user.nombre}</p>}

c) Return temprano:
if (!data) return <p>No hay datos</p>;

return <p>Datos cargados</p>;

===============================================================================
*/
            }
        </>
    )
}