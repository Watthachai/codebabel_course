'use client';

import { memo, useCallback, useMemo, useState } from 'react';

interface Todo {
  id: number;
  text: string;
}

interface TodoListProps {
  todos: Todo[];
  prefix: string;
}

interface TodoItemProps {
  todo: Todo;
  prefix: string;
}

interface TodoFormProps {
  onSubmit: (text: string) => void;
}

const TodoList = ({ todos, prefix }: TodoListProps) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} prefix={prefix} todo={todo}></TodoItem>
      ))}
    </ul>
  );
};

const TodoItem = memo(({ prefix, todo }: TodoItemProps) => {
  return (
    <li>
      {prefix}: {todo.text} ({todo.id})
    </li>
  );
});

TodoItem.displayName = 'TodoItem';

const TodoForm = memo(({ onSubmit }: TodoFormProps) => {
  const [text, setText] = useState('');
  const handleSubmit = () => {
    onSubmit(text);
    setText('');
  };

  return (
    <>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border"
      />
      <button onClick={handleSubmit}>Add</button>
    </>
  );
});
TodoForm.displayName = 'TodoForm';

const TodoListApp = () => {
  const [prefix, setPrefix] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const addTodo = useCallback(
    (text: string) => {
      setTodos([...todos, { id: +new Date(), text }]);
    },
    [todos],
  );
  const totalLength = useMemo(() => {
    let sum = 0;

    for (const todo of todos) {
      sum += todo.text.length;
    }

    return sum;
  }, [todos]);

  return (
    <>
      <p>{totalLength}</p>
      <input
        type="text"
        value={prefix}
        onChange={(e) => setPrefix(e.target.value)}
        className="border"
      />
      <TodoForm onSubmit={addTodo}></TodoForm>
      <TodoList prefix={prefix} todos={todos}></TodoList>
    </>
  );
};

export default TodoListApp;
