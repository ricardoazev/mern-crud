import React from 'react'
import "../App.css"
import { IoClose } from 'react-icons/io5';


const Formtable = ({handleSubmit, handleOnChange, handleclose, rest}) => {
    return (
        <div className="addContainer">
            <form onSubmit={handleSubmit}>
                <div className="close-btn" onClick={handleclose}><IoClose/></div>

                <label htmlFor="name">Name :</label>
                <input type="text" id="name" name="name" onChange={handleOnChange} value={rest.name}/>

                <label htmlFor="email">Email :</label>
                <input type="email" id="email" name="email" onChange={handleOnChange} value={rest.email}/>

                <label htmlFor="telefone">Telefone :</label>
                <input type="number" id="telefone" name="telefone" onChange={handleOnChange} value={rest.telefone}/>

                <button className="btn" >Enviar</button>
            </form>
        </div>


    )
}

export default Formtable
