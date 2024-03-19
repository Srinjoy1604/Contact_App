import React ,{useRef} from "react";
import ContactCard from "./ContactCard";
import { Link } from 'react-router-dom';
import './ContactList.css'
import { FaSearch } from "react-icons/fa";
const ContactList = (props) => {
    console.log(props)
    const InputT=useRef("");
    const deleteContactHandler = (id) => {
        props.getContactId(id);
    };

    const renderList = props.contact.map((contact) => {
        return (
            <ContactCard key="{contact.id}" cont={contact} clickHandler={() => deleteContactHandler(contact.id)} />
        );


    });

    const getSearchTerm=()=>
    {
        props.searchKeyword(InputT.current.value);
        // console.log(InputT.current.value);
    }
    return (
        <div>
            <div className="m-5 text-4xl font-bold head">
                Contact List
                <Link to="./add"><button className="button-5">Add Contacts</button></Link>
                <div className="searchdiv">
                    <input ref={InputT} type="text"  autoFocus="autoFocus" placeholder="Search contacts" className="searchinp" value={props.term} onChange={getSearchTerm}></input>
                    <FaSearch className="faSearch"/>
                </div>

            </div>
            <div>{renderList.length>0 ?renderList:<h1 className="notf">No Contacts Found</h1>}</div>
        </div>
    );
}
export default ContactList;