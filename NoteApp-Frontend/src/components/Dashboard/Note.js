import React from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import './Dashboard.css'

const Note = ({ title, body, updateMode, deleteNote }) => {
    return (
        <div className="note">
            <div className="note-head">
                <div className="note-title">
                    <h2>{title}</h2>
                </div>
                <div className="note-icons">
                    <BiEdit className="icon" onClick={updateMode}></BiEdit>
                    <AiFillDelete
                        className="icon"
                        onClick={deleteNote}
                    ></AiFillDelete>
                </div>
            </div>
            <hr />
            <p className="note-body">{body}</p>
        </div>
    );
};

export default Note;
