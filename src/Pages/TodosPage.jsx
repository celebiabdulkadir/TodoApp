import React from 'react';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TodosPage() {
	return (
		<div className=' flex flex-col px-4  justify-center align-middle   '>
			<div className=' flex justify-center flex-col items-center align-middle'>
				<div className='flex my-4'>
					<img src='./screen.svg' alt='profile'></img>
				</div>
				<div className='flex text-3xl font-bold my-2'>
					<h1> Task List</h1>
				</div>
			</div>
			<div className='flex justify-center items-center flex-col'>
				<AddTodo />
			</div>

			<div className='justify-center flex'>
				<TodoList />
			</div>
		</div>
	);
}
