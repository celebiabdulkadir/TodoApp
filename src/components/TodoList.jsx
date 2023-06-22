import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import EmptyState from './EmptyState';
import { db } from '../firebase/firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import Spinner from './Spinner';

import {
	onSnapshot,
	collection,
	updateDoc,
	deleteDoc,
	doc,
	query,
	where,
} from 'firebase/firestore';

function TodoList() {
	const [todoList, setTodoList] = useState([]);
	const [loading, setLoading] = useState(true);

	const { user } = useSelector((state) => {
		return state.auth;
	});

	useEffect(() => {
		// Check if user exists before making a query
		if (user && user !== false) {
			const q = query(
				collection(db, 'Todos'),
				where('userId', '==', user?.uid)
			);

			const unsub = onSnapshot(q, (querySnapshot) => {
				const rawData = [];

				querySnapshot.forEach((doc) => {
					const cardData = { ...doc.data(), id: doc.id };
					rawData.push(cardData);
				});

				setTodoList(
					rawData.sort(function (a, b) {
						return new Date(b.date) - new Date(a.date);
					})
				);
			});
			setLoading(false);

			// clean up function to unsubscribe the snapshot
			return () => unsub();
		}
	}, [user]); // Add user to the dependency array

	const toggleComplete = async (todo) => {
		try {
			await updateDoc(doc(db, 'Todos', todo.id), {
				completed: !todo.completed,
			});
		} catch (e) {
			toast(e.message, {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
				type: 'error',
			});
		}
	};

	const handleEdit = async (todo, content) => {
		try {
			await updateDoc(doc(db, 'Todos', todo.id), { content: content });
			toast('Updated', {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
				type: 'info',
			});
		} catch (e) {
			toast(e.message, {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
				type: 'error',
			});
		}
	};
	const handleDelete = async (id) => {
		try {
			await deleteDoc(doc(db, 'Todos', id));
			toast('Deleted', {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
				type: 'error',
			});
		} catch (e) {
			toast(e.message, {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
				type: 'error',
			});
		}
	};

	return (
		<>
			{loading && <Spinner />}
			{todoList.length > 0 ? (
				<ul className=' flex-col  py-4 flex w-[80%]  max-w-[600px] mobile:w-full  '>
					{todoList?.map((todo) => {
						return (
							<TodoItem
								key={todo.id}
								id={todo.id}
								content={todo.content}
								completed={todo.completed}
								todo={todo}
								handleEdit={handleEdit}
								handleDelete={handleDelete}
								toggleComplete={toggleComplete}
							/>
						);
					})}
				</ul>
			) : (
				<EmptyState />
			)}
		</>
	);
}
export default TodoList;
