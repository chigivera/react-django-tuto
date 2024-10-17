import React, { useEffect, useState } from 'react'
import api from '../api'
import Note from '../components/Note'
import "../styles/Home.css"
function Home(props) {
    const [notes, setNotes] = useState([])
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    useEffect(() => {
        getNotes()
    }, [])
    const getNotes = () => {
        api
            .get("/api/notes/")
            .then(res=>res.data)
            .then(data=>setNotes(data))
            .catch(error => alert(error))
    }

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}`)
            .then(res=>{
                if(res.status === 204) alert("Note Deleted!")
                else alert("Failed To Delete")
            getNotes()
            })
            .catch(error => alert(error))
    }

    const createNote = (e) => {
        e.preventDefault()
        api
            .post("/api/notes/",{content,title})
            .then(res=>{
                if(res.status === 201 ) 
                    alert("Note Created!")
                else
                    alert("Failed to make Note")
                getNotes()
            })
            .catch(error=>{
                alert(error)
            })
    }
    return (
        <div className="">
            <div className="">
                <h1>Notes</h1>
                {notes.map((note)=><Note note={note} onDelete={deleteNote} key={note.id}/>)}
            </div>
            <h2>Create Note</h2>
            <form onSubmit={createNote} action="">
                <label htmlFor="title">Title</label><br />
                <input type="text" name="title" id="title" required onChange={(e)=>setTitle(e.target.value)} value={title}/> <br/>
                <label htmlFor="content">Content</label><br /> <br />
                <textarea  name="content" id="content" required onChange={(e)=>setContent(e.target.value)} value={content}></textarea><br />
                <button type="submit">Submit</button>


            </form>
        </div>
    )
}

export default Home