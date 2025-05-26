import React from 'react'
import { generateBooks } from '../utils/generator'

const BooksPages = () => {
    const books = generateBooks();

    return (
        <ul>
            {
                books.map(book => <li key={book.id}>{book.title}</li>)
            }
        </ul>
    )
}

export default BooksPages
