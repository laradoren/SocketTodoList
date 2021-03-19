import React, {useState} from "react";
import { createStyles, makeStyles} from '@material-ui/core/styles';
import { Box, Button, TextField, Typography } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import { Draggable } from "react-beautiful-dnd";

const useStyles = makeStyles((theme) =>
    createStyles({
        todoNone: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 50px",
            backgroundColor: "#C4C4C4",
            color: "#181717",
            margin: "15px",
            textTransform: "uppercase"
        },
        todoLow: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 50px",
            backgroundColor: "#64b5f6",
            color: "#181717",
            margin: "15px",
            textTransform: "uppercase"
        },
        todoActive: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 50px",
            backgroundColor: "#81c784",
            color: "#181717",
            margin: "15px",
            textTransform: "uppercase"
        },
        todoHot: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 50px",
            backgroundColor: "#f44336",
            color: "#181717",
            margin: "15px",
            textTransform: "uppercase"
        },
        paper: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            position: 'absolute',
            top: "calc((100vh - 112px)/2)",
            left: "calc((100vw - 268px)/2)",
            width: 200,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
          }
    })
);

const Todos = ({todos, onDeleteTodo, onEditTextChange,
    onSearchTodo, onEditTodo, editText }) => {
    const [open, setModal] = useState(false);
    const [todo, setTodo] = useState({text: "", id: "", status: ""});
    const classes = useStyles();
    const openModal = (text) => {
        onSearchTodo(text);
        setModal(true);
        let todo = todos.filter(t => t.text === text);
        setTodo(todo);
    };
    const closeModal = () => {
        onEditTodo(todo[0].id, todo[0].status);
        setModal(false);
    };
    return todos.map(({ text, id, status }, index) => (
        <Draggable key={id} draggableId={id} index={index}>
            {(provided) => (
                <Box className={classes[`todo${status}`]} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <Typography>{text}</Typography>  
                    <Box>
                        <Button onClick={() => onDeleteTodo(id)}><span role="img" aria-label="done">&#10004;</span></Button> 
                        <Button onClick={() => openModal(text)}><span role="img" aria-label="edit">🖊️</span></Button>
                    </Box>
                    <Modal open={open} onClose={() => setModal(false)} aria-labelledby="modal-title" aria-describedby="modal-description">
                        <Box className={classes.paper}>
                            <TextField value={editText} onChange={onEditTextChange} /> 
                            <Box>
                                <Button onClick={closeModal}>Edit</Button>
                            </Box>
                        </Box>
                    </Modal>
                </Box>
            )}
        </Draggable>
    ))
}

export default Todos;

