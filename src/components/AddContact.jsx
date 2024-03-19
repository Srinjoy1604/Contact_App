import React, { useState } from "react";
import './AddContact.css';
import { useNavigate } from "react-router-dom";

const AddContact = ({ addContactHandler,props }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const add = (e) => {
        
        e.preventDefault();
        if (name === "" || email === "") {
            alert("All fields are mandatory!!");
            return;
        }
        
        addContactHandler({name, email });
        setName("");
        setEmail("");
        
        navigate('/');
        
        
    };

    return (
        <div className="flex-col text-4xl m-10">
            <h2 className="m-5">Add Contact</h2>
            <form onSubmit={add}>
                <div className="my-10 border-2 border-gray-300 bg-gray-200 inpdiv">
                    <label className="mx-10">Name</label>
                    <input 
                        type="text" 
                        placeholder="Name" 
                        name="name"  
                        className="border-2 border-black"  
                        onChange={(e) => setName(e.target.value)} 
                        value={name}
                    />
                </div>
                <div className="my-10 border-2 border-gray-300 bg-gray-200 inpdiv">
                    <label className="mx-12">Email</label>
                    <input 
                        type="text" 
                        placeholder="Email" 
                        name="email" 
                        className="border-2 border-black"  
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email}
                    />
                </div>
                <button className="bg-blue-500 px-8 py-2 rounded-lg shadow-md text-white text-md font-semibold hover:bg-blue-300 hover:text-black hover:scale-110 font-mono">Add</button>
            </form>
        </div>
    );
}

export default AddContact;
