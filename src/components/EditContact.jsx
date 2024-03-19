import React, { useState } from "react";
import './AddContact.css';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const EditContact = ({ UpdateContactHandler}) => {

    let { state } = useLocation();
    
    const navigate = useNavigate();
    const { id } = state.contact; 
    const [name, setName] = useState(state.contact.name);
    const [email, setEmail] = useState(state.contact.email);
    

    const update = (e) => {
        
        e.preventDefault();
        if (name === "" || email === "") {
            alert("All fields are mandatory!!");
            return;
        }
        // console.log(name);
        const updatedContact = { id, name, email };
        console.log(updatedContact);
        UpdateContactHandler(updatedContact);
        setName("");
        setEmail("");
        navigate('/');
        
        
    };

    return (
        <div className="flex-col text-4xl m-10">
            <h2 className="m-5">Edit Contact</h2>
            <form onSubmit={update}>
                <div className="my-10 border-2 border-gray-300 bg-gray-200">
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
                <div className="my-10 border-2 border-gray-300 bg-gray-200">
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
                <button className="bg-blue-500 px-8 py-2 rounded-lg shadow-md text-white text-md font-semibold hover:bg-blue-300 hover:text-black hover:scale-110 font-mono">Update</button>
            </form>
        </div>
    );
}

export default EditContact;