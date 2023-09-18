import { useEffect, useState } from "react";
import Note from "./Note";
import {
    addNote,
    getAllNote,
    updateNote,
    deleteNote,
} from "../../utlis/HandleApi";
import {useNavigate} from "react-router";
import './Dashboard.css';

function Dashboard() {
    const [note, setNote] = useState([]);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [noteId, setNoteId] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getAllNote(setNote);
    }, []);

    const updateMode = (_id, title, body) => {
        setIsUpdating(true);
        setTitle(title);
        setBody(body);
        setNoteId(_id);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/")
    };

    return (
        <div className="App">
            <div className="container">
                <div className="make-note">
                    <div className="top-title">
                        <h1 className="NoteApp">Make a Note</h1>
                        <button className="btn-log-out" onClick={handleLogout}>Logout</button>
                    </div>

                    <input
                        type="text"
                        placeholder="Give title of your note..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        type="text"
                        cols="30"
                        rows="10"
                        placeholder="Write your note here..."
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                    <div
                        className="btn-add"
                        onClick={
                            isUpdating
                                ? () =>
                                      updateNote(
                                          noteId,
                                          title,
                                          body,
                                          setNote,
                                          setTitle,
                                          setBody,
                                          setIsUpdating
                                      )
                                : () =>
                                      addNote(
                                          title,
                                          body,
                                          setTitle,
                                          setBody,
                                          setNote
                                      )
                        }
                    >
                        {isUpdating ? "Update" : "Add"}
                    </div>
                </div>

                <div className="display-notes">
                    {note.map((item) => (
                        <Note
                            key={item._id}
                            title={item.title}
                            body={item.body}
                            updateMode={() =>
                                updateMode(item._id, item.title, item.body)
                            }
                            deleteNote={() => deleteNote(item._id, setNote)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
