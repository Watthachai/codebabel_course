import { getBooks } from "@/app/utils/api";

const IsrPage = async () => {
    // For ISR, use revalidate option
    const books = await getBooks({
        next: { revalidate: 10 } // Revalidate every 10 seconds
    });

    return (
        <div>
            <h1>ISR Books Page</h1>
            <ul>
                {books.map(book => <li key={book.id}>{book.title}</li>)}
            </ul>
        </div>
    );
}

export default IsrPage;