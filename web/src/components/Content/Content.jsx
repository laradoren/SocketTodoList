import React, {useState, useEffect} from "react";
import { createStyles, makeStyles} from '@material-ui/core/styles';
import { Box, Button, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField"
import Todos from "../Todos/Todos";
import MenuItem from '@material-ui/core/MenuItem';
import {DragDropContext, Droppable} from "react-beautiful-dnd";

const currencies = [
    {
      value: 'Hot',
      label: '1',
    },
    {
      value: 'Active',
      label: '2',
    },
    {
      value: 'Low',
      label: '3',
    },
    {
      value: 'None',
      label: '4',
    },
  ];

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: "60%",
            margin: "20px auto"
        },
        form: {
            width: "100%",
            fontSize: "25px"
        },
        input: {
            width: "calc(100% - 70px - 150px)"
        },
        text: {
            fontSize: "25px"
        },
        select: {
            margin: "0px 10px"
        }

    })
);

const Content = ({todos, onCreateTodo, onTextChange, newText, 
                  onDeleteTodo, editText, onEditTextChange,
                  onSearchTodo, onEditTodo, currency, handleChange }) => {
    const classes = useStyles();
    const [updateTodos, setUpdatedTodos] = useState(todos);
    useEffect(
		() => {
			setUpdatedTodos(todos);
		},
		[ todos ]
	);
    const handleOnDragEnd = (result) => {
        const items = Array.from(updateTodos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setUpdatedTodos(items);
    };

	return (
        <Box className={classes.root}>
			<form onSubmit={onCreateTodo} className={classes.form}>
				<Typography className={classes.text}>Create new task</Typography>
				<TextField className={classes.input} name="name" onChange={onTextChange} value={newText} label="Text" />
                <TextField
                    id="standard-select-currency"
                    select label="Select"
                    value={currency}
                    onChange={handleChange}
                    helperText="Please select priority"
                    className={classes.select}
                    >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
				<Button type="submit">Create</Button>
			</form>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="todos">
                    {
                        (provided) => (
                            <Box {...provided.droppableProps} ref={provided.innerRef} >
                                <Todos todos={updateTodos} onDeleteTodo={onDeleteTodo}  editText={editText}
                                onEditTextChange={onEditTextChange}
                                onSearchTodo={onSearchTodo}
                                onEditTodo={onEditTodo} />
                                {provided.placeholder}
                            </Box>
                        )
                    }
                </Droppable>
            </DragDropContext>
        </Box>
	)
}

export default Content;

