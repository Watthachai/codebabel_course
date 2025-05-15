//? 8. Parent-Child Communication
import axios from 'axios';
import React, { useState } from 'react'

export default function NoteForm({ notes, setNotes }) {
    const [note, setNote] = useState('');
  
    const changeNote = (event) => setNote(event.target.value);

    const createNote = async () => {
    
        const { data } = await axios.post('/notes', { body: note })

        setNotes([...notes, data])
        setNote('')
    
  }

  return (
    <div>
        <input 
            type="text"
            onChange={changeNote}
            value={note}
        />
        
        <button onClick={createNote}> add note </button>
    </div>
  )
}
