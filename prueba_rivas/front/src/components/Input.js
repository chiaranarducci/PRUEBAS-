"use client"

export default function Input (props){
    return (
        <>
        
        <input value={props.value} type={props.type} onChange={props.onChange}></input>
        
        </>
    )
}