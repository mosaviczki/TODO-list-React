import { useEffect, useState } from "react";
import styles from './form.module.css';
import AddIcon from '@mui/icons-material/Add';
import CategoryForm from '../CategoryForm';
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 20;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const getLocalStorage = () =>{
    let selectCategory = localStorage.getItem("selectCategory");
    if(selectCategory){
        return (selectCategory = JSON.parse(localStorage.getItem("selectCategory")));
    }else{
        return [];
    }
}

export default function TodoForm({addTodo}) {
    const theme = useTheme();
    const [personName, setPersonName] = useState([]);
    const [value, setValue] = useState("");
    const [category, setCategory] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [selectCategory, setSelectCategory] = useState(getLocalStorage());

    useEffect(()=>{
      localStorage.setItem("selectCategory", JSON.stringify(selectCategory))
    }, [selectCategory]);

    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setPersonName(
          typeof value === 'string' ? value.split(',') : value,
        );
      };

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
        if(!value || !personName){
            toast.error("Verifique todos os campos!");
            return;
        }
        console.log(selectCategory);
        addTodo(value, personName);
        setValue("");
        setCategory("");
    }

    return (
        <div>
            <h1 className={styles.titleTodo}>Adicionar uma tarefa</h1>
            <form className={styles.addToDo} onSubmit={handleSubmit}>
                <input value={value} className={styles.inputAdd} onChange={(e) => setValue(e.target.value)} />
                <div className={styles.ctnSelect}>
                    <FormControl sx={{ m: 1, width: 300 }} size="small">
                        <InputLabel id="demo-multiple-name-label">Categorias</InputLabel>
                        <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={personName}
                        onChange={handleChange}
                        input={<OutlinedInput label="Name" />}
                        MenuProps={MenuProps}
                        >
                        {selectCategory.map((selectCategory) => (
                            <MenuItem
                            key={selectCategory.name}
                            value={selectCategory.name}
                            style={getStyles(selectCategory.name, personName, theme)}
                            >
                            {selectCategory.name}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    <button type='button' className={styles.btnCategory} onClick={() => setOpenDialog(true)}><AddIcon /></button>
                </div>
                <button type='submit' className={styles.btnAdd}>Adicionar</button>
            </form>
            <CategoryForm openDialog={openDialog} setOpenDialog={setOpenDialog} addCategory={addCategory} />
        </div>
    )
}