import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Content from "./components/Content/Content";
import Header from "./components/Header/Header";

function App() {
	const [ todos, setTodos ] = useState([]);
	const [ newText, setNewText ] = useState("");
	const [ editText, setEditText ] = useState("");
	const [currency, setCurrency] = useState('None');
	const socketRef = useRef();

	useEffect(
		() => {
			socketRef.current = io.connect("http://localhost:4000")
			socketRef.current.on("create", ({ text, id, status }) => {
				setTodos([ ...todos, { text, id, status } ]);
			});
			socketRef.current.on("delete", ({ id }) => {
				let newTodos = todos.filter( t => t.id !== id);
				setTodos([ ...newTodos]);
			});
			socketRef.current.on("edit", ({ text, id, status }) => {
				let newTodos = todos.map( t => (t.id === id) ? {text: text, id: id, status: status} : t);
				setTodos([ ...newTodos]);
			});
			return () => socketRef.current.disconnect();
		},
		[ todos ]
	);

	const onCreateTodo = (e) => {
		e.preventDefault();
		let idTodo = Date.now().toString();
		socketRef.current.emit("create", { text: newText, id: idTodo, status: currency });
        setNewText("");
	};

	const onDeleteTodo = (id) => {
		socketRef.current.emit("delete", { id: id});
	};

	const onTextChange = (e) => {
		setNewText(e.target.value);
	};

	const onEditTextChange = (e) => {
		setEditText(e.target.value);
	};

	const onSearchTodo = (text) => {
		setEditText(text);
	};

	const onEditTodo = (id, status) => {
		socketRef.current.emit("edit", {text: editText, id: id, status: status});
        setEditText("");
	};

	const handleChange = (event) => {
		setCurrency(event.target.value);
	};

	return (
		<>
		<Header />
		<Content todos={todos} onCreateTodo = {onCreateTodo} onTextChange={onTextChange} newText = {newText} 
				 onDeleteTodo={onDeleteTodo} editText={editText} onEditTextChange={onEditTextChange}
				 onSearchTodo={onSearchTodo} onEditTodo={onEditTodo} currency={currency} handleChange={handleChange} />
		</>
	)
}

export default App;

