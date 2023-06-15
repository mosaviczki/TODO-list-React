import { useEffect, useState } from "react";
import styles from './form.module.css';
import AddIcon from '@mui/icons-material/Add';
import CategoryForm from '../CategoryForm';
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getLocalStorage = () =>{
    let selectCategory = localStorage.getItem("selectCategory");
    if(selectCategory){
        return (selectCategory = JSON.parse(localStorage.getItem("selectCategory")));
    }else{
        return [];
    }
}

export default function TodoForm({addTodo}) {
    const [value, setValue] = useState("");
    const [category, setCategory] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [selectCategory, setSelectCategory] = useState([]);

    const addCategory = (name) =>{
        const newCategory = [
            ...selectCategory,
            {
                name
            }
        ];
        setSelectCategory(newCategory);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!value || !category){
            toast.error("Verifique todos os campos!");
            return;
        }
        addTodo(value, category);
        setValue("");
        setCategory("");
    }

    return (
        <div>
            <h1 className={styles.titleTodo}>Adicionar uma tarefa</h1>
            <form className={styles.addToDo} onSubmit={handleSubmit}>
                <input value={value} className={styles.inputAdd} onChange={(e) => setValue(e.target.value)} />
                <div className={styles.ctnSelect}>
                    <select value={category} className={styles.select} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Categorias" >Categorias</option>
                        {selectCategory.map((selectCategory) => (
                            <option value={selectCategory.name} key={selectCategory.name}>{selectCategory.name}</option>
                        ))}
                    </select>
                    <button type='button' className={styles.btnCategory} onClick={() => setOpenDialog(true)}><AddIcon /></button>
                </div>
                <button type='submit' className={styles.btnAdd}>Adicionar</button>
            </form>
            <CategoryForm openDialog={openDialog} setOpenDialog={setOpenDialog} addCategory={addCategory} />
        </div>
    )
}