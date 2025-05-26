"use client";

import { getBooks } from "@/app/utils/api";
import { useEffect, useState } from "react";
import { Book } from "@/app/utils/types";

const CsrPage = () => {
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState<Book[]>([])

    const loadBooks = async () => {
        const books = await getBooks()

        setLoading(false)
        setBooks(books)
    }

    useEffect( () => {
        loadBooks();
    }, [])

    if(loading) return <div>Loading...</div>
    if(books.length === 0) return <div>No books found.</div>

    return(
        <ul>
            {
                books.map(book => <li key={book.id}>{book.title}</li>)
            }
        </ul>
)}



export default CsrPage;