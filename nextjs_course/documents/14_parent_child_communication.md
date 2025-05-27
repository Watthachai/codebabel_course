# 14. Parent-Child Communication in React

## 🎯 Overview
การสื่อสารระหว่าง Component แม่และลูกใน React เป็นแนวคิดสำคัญที่จะช่วยให้เราแยกโค้ดออกเป็นส่วนๆ ได้อย่างมีประสิทธิภาพ

## 📋 สิ่งที่เราได้เรียนรู้ก่อนหน้า

### Client Component vs Server Component
```tsx
'use client' // จำเป็นต้องใส่เมื่อใช้ useState
import { useState } from 'react'

function TodoApp() {
    const [todos, setTodos] = useState([])
    const [input, setInput] = useState('')
    // ...
}
```

### State Management พื้นฐาน
- `todos` - เก็บรายการ todo ทั้งหมด
- `input` - เก็บค่าในช่อง input
- `addTodo` - ฟังก์ชันสำหรับเพิ่ม todo ใหม่

## 🔧 ปัญหาของโค้ดแบบเดิม

```tsx
// ❌ โค้ดทั้งหมดอยู่ใน component เดียว - ยาก maintain
function TodoApp() {
    const [todos, setTodos] = useState([])
    const [input, setInput] = useState('')

    const addTodo = () => {
        // logic การเพิ่ม todo
    }

    return (
        <>
            {/* Form section */}
            <input value={input} onChange={...} />
            <button onClick={addTodo}>Add</button>
            
            {/* Todo list section */}
            <ul>
                {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
            </ul>
        </>
    )
}
```

## 🎨 การแบ่งแยก Components

### 📊 Visualization ของ Component Structure

```
┌───────────────────────────────────┐
│             TodoApp               │
│             (Parent)              │
│  ┌─────────────┐ ┌─────────────┐  │
│  │  TodoForm   │ │  TodoList   │  │
│  │  (Child)    │ │  (Child)    │  │
│  └─────────────┘ └─────────────┘  │
└───────────────────────────────────┘
```

### 1. สร้าง TodoForm Component

```tsx
// ✅ แยก Form เป็น component ต่างหาก
interface TodoFormProps {
    onSubmit: (input: string) => void
}

function TodoForm({ onSubmit }: TodoFormProps) {
    const [input, setInput] = useState('')

    const handleSubmit = () => {
        onSubmit(input)      // ส่งข้อมูลไปยัง parent
        setInput('')         // clear form
    }

    return (
        <>
            <input 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
            />
            <button onClick={handleSubmit}>Add</button>
        </>
    )
}
```

### 2. สร้าง TodoList Component

```tsx
// ✅ แยก List เป็น component ต่างหาก
interface Todo {
    id: string
    text: string
}

interface TodoListProps {
    todos: Todo[]
}

function TodoList({ todos }: TodoListProps) {
    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>{todo.text}</li>
            ))}
        </ul>
    )
}
```

## 🔄 Parent-Child Communication Patterns

### 📤 Pattern 1: Parent → Child (Props)

```tsx
// Parent ส่งข้อมูลไปยัง Child ผ่าน props
function TodoApp() {
    const [todos, setTodos] = useState([])

    return (
        <div>
            <TodoList todos={todos} /> {/* ส่ง todos ไปยัง child */}
        </div>
    )
}
```

### 📤 Pattern 2: Child → Parent (Callback Functions)

```tsx
// Parent ส่งฟังก์ชันไปยัง Child เพื่อรับข้อมูลกลับ
function TodoApp() {
    const [todos, setTodos] = useState([])

    const addTodo = (input: string) => {
        const newTodo = {
            id: crypto.randomUUID(),
            text: input
        }
        setTodos([newTodo, ...todos])
    }

    return (
        <div>
            <TodoForm onSubmit={addTodo} /> {/* ส่งฟังก์ชันไปยัง child */}
            <TodoList todos={todos} />
        </div>
    )
}
```

## 🎯 ตัวอย่างการใช้งานจริง

### 💡 State ควรอยู่ที่ไหน?

```
❓ ควร state อยู่ที่ component ไหน?

TodoApp (Parent)
├── todos ✅ (ทั้ง TodoForm และ TodoList ต้องใช้)
├── TodoForm (Child)
│   └── input ✅ (มีแค่ TodoForm ใช้)
└── TodoList (Child)
        └── ไม่มี state ✅ (แค่แสดงผล)
```

### 🔗 Communication Flow

```
┌─────────────────────────────────────────────────────┐
│                  TodoApp                            │
│  State: todos = []                                  │
│                                                     │
│  ┌─────────────────┐         ┌─────────────────┐    │
│  │   TodoForm      │         │   TodoList      │    │
│  │                 │         │                 │    │
│  │ 1. User types   │         │ 3. Shows todos  │    │
│  │ 2. Clicks Add   │ ──────► │                 │    │
│  │ 3. Calls        │         │                 │    │
│  │    onSubmit()   │         │                 │    │
│  └─────────────────┘         └─────────────────┘    │
│           │                           ▲             │
│           │                           │             │
│           ▼                           │             │
│  addTodo() updates todos state ───────┘             │
└─────────────────────────────────────────────────────┘
```

## 🚀 Advanced: Component Composition

### การแยก TodoItem Component

```tsx
interface TodoItemProps {
    id: string
    text: string
}

function TodoItem({ id, text }: TodoItemProps) {
    return <li>{text}</li>
}

function TodoList({ todos }: TodoListProps) {
    return (
        <ul>
            {todos.map(todo => (
                <TodoItem key={todo.id} id={todo.id} text={todo.text} />
            ))}
        </ul>
    )
}
```

### 🎯 Spread Operator สำหรับ Props

```tsx
// แทนที่การส่ง props แยกๆ
<TodoItem key={todo.id} id={todo.id} text={todo.text} />

// ใช้ spread operator
<TodoItem key={todo.id} {...todo} />
```

## 📝 วิธีการส่ง Props แบบต่างๆ

### 1. Named Props
```tsx
<TodoForm onSubmit={addTodo} />
<TodoList todos={todos} />
```

### 2. Children Props
```tsx
<Card>
    <h1>Title</h1>
    <p>Content</p>
</Card>
```

### 3. Spread Props
```tsx
<TodoItem {...todo} />
```

## ✅ Best Practices

### 1. การตั้งชื่อ Props
```tsx
// ✅ ดี - ชื่อชัดเจน
onSubmit, onClick, onAdd

// ❌ ไม่ดี - ชื่อคลุมเครือ
handler, func, callback
```

### 2. Type Safety
```tsx
// ✅ ใช้ TypeScript Interface
interface TodoFormProps {
    onSubmit: (input: string) => void
}

// ❌ ไม่ระบุ type
function TodoForm(props) { ... }
```

### 3. Single Responsibility
```tsx
// ✅ แต่ละ component ทำหน้าที่เดียว
- TodoForm: จัดการ form input
- TodoList: แสดง list
- TodoItem: แสดง item เดียว

// ❌ component ทำหลายหน้าที่
- TodoApp ทำทุกอย่าง
```

## 🎉 สรุป

การสื่อสารระหว่าง Parent-Child ใน React มี 2 แนวทางหลัก:

1. **Parent → Child**: ส่งข้อมูลผ่าน props
2. **Child → Parent**: ส่งฟังก์ชัน callback ให้ child เรียกใช้

การแยก component ช่วยให้:
- โค้ดง่ายต่อการ maintain
- Reusable components
- ชัดเจนในการจัดการ state
- ง่ายต่อการ debug

### 💡 จำได้ง่ายๆ
> "State ควรอยู่ที่ component ที่สูงที่สุดที่ต้องใช้ข้อมูลนั้น"
