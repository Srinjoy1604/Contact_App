import React from "react";
import { FaTrash } from "react-icons/fa";
import user from "../images/user.png"
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const ContactCard = (props) => {
    const { id, name, email } = props.cont;

    return (
        <div className="grid content border-b-2 border-black bg-slate-200 grid-rows-1 grid-col-2 grid-flow-col place-items-center  mx-2 p-5 ">
            <img src={user} alt="user" className="w-20 h-20"></img>
            <div>

                <Link to={`/contact/${id}`} state={{ contact: props.cont }}>
                    <div className="text-4xl font-mono">{name}</div>
                    <div className="text-xl font-sans">{email}</div>
                </Link>
            </div>
            <div className="grid place-items-center text-2xl" style={{ color: "red", marginTop: "0.75rem" }}><FaTrash onClick={() => props.clickHandler(props.cont.id)} /></div>
            <Link to="/edit" state={{ contact: props.cont }}>
                <div className="grid place-items-center text-2xl" style={{ color: "blue", marginTop: "0.75rem" }}><FaEdit /></div>
            </Link>
        </div>
    );
};

export default ContactCard;