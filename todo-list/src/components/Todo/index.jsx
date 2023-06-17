import { useEffect, useState } from "react";
import styles from "./todo.module.css";
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import TodoForm from "../TodoForm";

const getLocalStorage = () =>{
    let todo = localStorage.getItem("todo");
    if(todo){
        return (todo = JSON.parse(localStorage.getItem("todo")));
    }else{
        return [];
    }
}

export default function Todo(){
    const [search, setSearch] = useState("");
    const [todo, setTodo] = useState(getLocalStorage());

    useEffect(()=>{
        localStorage.setItem("todo", JSON.stringify(todo))
    }, [todo]);
    
    const addTodo = (text, category) =>{
        const newTodo = [
            ...todo,
            {
                id: Math.floor(Math.random()*10000),
                text,
                category,
                isCompleted: false
            }
        ];

        setTodo(newTodo);
    }

    const removeTodo = (id) =>{
        const newTodo = [...todo];
        const filteredTodo = newTodo.filter(todo => todo.id !== id ? todo : null);
        setTodo(filteredTodo);
    }

    const completedTodo = (id) =>{
        const newTodo = [...todo];
        newTodo.map((todo) => (todo.id === id ? todo.isCompleted = !todo.isCompleted : todo));
        setTodo(newTodo);
    }

    return(
        <>
            <TodoForm addTodo={addTodo} />
            <hr className={styles.line}/>
            <input className={styles.inputSearch} value={search} onChange={(e) => setSearch(e.target.value)} tipe='text' placeholder="Pesquisar"/>
            {todo.filter((todo) => todo.text.toLowerCase().includes(search.toLowerCase())).map((todo)=>(
                <div className={styles.ctnTodo} key={todo.id}>
                    <div className={styles.todoSelect}>
                        <Checkbox onClick={() => completedTodo(todo.id)}/>
                    </div>
                    <div className={styles.todoInformation} style={{textDecoration: todo.isCompleted ? "line-through" : ""}}>
                        <p>{todo.text}</p>
                        <div className={styles.categories}>
                            {todo.category.map((category) =>(
                                <p className={styles.category}>{category}</p>
                            ))}
                        </div>
                        
                    </div>
                    <div className={styles.todoAction}>
                        <button className={styles.btnAction} onClick={() => removeTodo(todo.id)}><DeleteIcon/></button>
                    </div>
                </div>
            ))}
        </>
    )
}