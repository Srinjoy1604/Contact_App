import React from "react";
import { useLocation } from "react-router-dom";
import user from "../images/Prof1.jpg";
import { Link } from "react-router-dom";
import './ContactDetail.css';

const ContactDetail = (props) => {
    

    let { state } = useLocation();
    const {name,email}=state.contact;
    
    return (
        <div className="detmain">
            <div className="details">
                <img src={user} alt="user" className="w-50 h-50"></img>
                <div>
                    <div className="name">{name}</div>
                    <div className="email">{email}</div>
                </div>
            
            </div>
            <Link to="/"><button className="button-24" role="button">Back to List</button></Link>
        </div>
    );
};

export default ContactDetail;