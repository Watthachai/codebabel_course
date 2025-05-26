import { getBooks } from "@/app/utils/api";

const SsrPage = async () => {
    // For ISR, use revalidate option
    const books = await getBooks({
        cache: 'no-store'
    });

    return (
        <div>
            <h1>SSR Books Page</h1>
            <ul>
                {books.map(book => <li key={book.id}>{book.title}</li>)}
            </ul>
        </div>
    );
}

export default SsrPage;