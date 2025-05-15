//? 8. Parent-Child Communication

import React, { useState } from 'react';

import NoteList from './NoteList';
import NoteForm from './NoteForm';
import styles from './NoteApp.module.css'

export default function NoteApp() {
  const [notes, setNotes] = useState([])

  return (
    <div className={styles.wrapper}>
      
      <NoteForm notes={notes} setNotes={setNotes}></NoteForm>
      <NoteList notes={notes} setNotes={setNotes}></NoteList>
        
    </div>
  )
}
