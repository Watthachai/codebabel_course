import { getBooks } from '@/app/utils/api';

const SsgPage = async () => {
    // Force caching for SSG สำหรับ NextJS 15+ ในการทำ SSG
    const books = await getBooks({ 
        cache: 'force-cache' 
    });

    return (
        <div>
            <h1>SSG Books Page</h1>
            <ul>
                {books.map(book => <li key={book.id}>{book.title}</li>)}
            </ul>
        </div>
    );
}

export default SsgPage;