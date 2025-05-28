"use client";

import { useState } from "react";

interface Todo {
    id: number;
    text: string;
}

interface TodoList {
    todos: Todo[];
}

interface TodoFormProps {
    onSubmit: (input: string) => void;
}
const TodoForm = ({ onSubmit }: TodoFormProps) => {
    const [input, setInput] = useState("");

    const handdleSubmit = () => {
        onSubmit(input);
        setInput("");
    };

    return (
        <>
            <input
                type="text"
                onChange={(e) => setInput(e.target.value)}
                value={input}
            />
            <button type="button" onClick={handdleSubmit}>
                Add
            </button>
        </>
    );
};

const TodoList = ({ todos }: TodoList) => {
    return (
        <ul>
            {todos.map((todo) => (
                <TodoItem key={todo.id} {...todo}></TodoItem>
            ))}
        </ul>
    );
};

const TodoItem = ({ text }: Todo) => {
    return <li>{text}</li>;
};

export default function TodoApp() {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodo = (input: string) => {
        setTodos([{ id: +new Date(), text: input }, ...todos]);
    };
    return (
        <>
            <TodoForm onSubmit={addTodo}></TodoForm>
            <TodoList todos={todos}></TodoList>
        </>
    );
}
