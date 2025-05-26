import { Book } from "./types";

export const getBooks = async (options?: Parameters<typeof fetch>[1]) => {
    const res = await fetch("http://localhost:3000/api/books", options);

    return res.json() as Promise<Book[]>;
};