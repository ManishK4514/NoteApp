import axios from 'axios';

const baseUrl = "https://notesapp-backend-3r3l.onrender.com";

const getAllNote = (setNote) => {
    const token = localStorage.getItem("token");
    axios
     .get(`${baseUrl}/note`, {
        headers: { Authorization: token },
     })
     .then((res) => { 
        setNote(res.data); 
     })
     .catch((err) => console.log(err));
}

const addNote = (title, body, setTitle, setBody, setNote) => {
    const token = localStorage.getItem("token");
    
    axios({
        method: "POST",
        url: `${baseUrl}/note/save`,
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        data: {
            title: title,
            body: body
        }
    }).then((data) => { 
        console.log("New Note Added...");
        setTitle("");
        setBody("");
        getAllNote(setNote);
    })
    .catch((err) => console.log(err));
}

const updateNote = (noteId, title, body, setNote, setTitle, setBody, setIsUpdating) => {
    const token = localStorage.getItem("token");
    
    axios({
        method: "PATCH",
        url: `${baseUrl}/note/update`,
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
            id: noteId
        },
        data: {
            _id: noteId,
            title: title,
            body: body
        }
    }).then((data) => {
        setTitle("");
        setBody("");
        setIsUpdating(false);
        getAllNote(setNote);
    })
    .catch((err) => console.log(err));
}

const deleteNote = (_id, setNote) => {
    const token = localStorage.getItem("token");
    
    axios({
        method: "DELETE",
        url: `${baseUrl}/note/delete`,
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
            id: _id
        },
        data: {
            _id: _id,
        }
    }).then((data) => { 
        getAllNote(setNote);
    })
    .catch((err) => console.log(err));
}

export { getAllNote, addNote, updateNote, deleteNote };
