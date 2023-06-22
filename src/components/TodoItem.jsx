import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { TiEdit, TiTrash } from 'react-icons/ti';
import { FaCheckCircle } from 'react-icons/fa';
import { openModal } from '../store/modalSlicer';
import { setTodoId } from '../store/todoSlicer';
import Spinner from './Spinner';

function TodoItem({ todo, handleEdit, toggleComplete }) {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const schema = yup.object().shape({
		newTitle: yup
			.string()
			.trim('No leading/trailing whitepaces allowed')
			.min(3, 'Todo must be at least 3 characters')
			.required('Todo is required'),
		isChecked: yup.bool(),
	});

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		setFocus,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: { newTitle: todo.content, isChecked: todo.completed },
	});

	const newTitle = watch('newTitle');
	const isChecked = watch('isChecked');

	useEffect(() => {
		setValue('newTitle', todo.content);
		setValue('isChecked', todo.completed);
	}, [todo.content, todo.completed, setValue]);

	const handleUpdate = (data) => {
		if (data.newTitle !== todo.content) {
			setLoading(true);
			handleEdit(todo, data.newTitle);

			setTimeout(() => {
				setLoading(false);
			}, 1000);
		}
	};

	useEffect(() => {
		if (isChecked !== todo.completed) {
			toggleComplete(todo);
		}
	}, [isChecked, todo, toggleComplete]);

	const openRemoveModal = () => {
		dispatch(openModal());
		dispatch(setTodoId(todo));
	};

	const onSubmit = handleSubmit(handleUpdate);

	const handleEditClick = () => {
		setFocus('newTitle');
	};

	return (
		<>
			{loading && <Spinner />}
			<form
				onSubmit={onSubmit}
				className='desktop:hover:scale-105 flex flex-col wrap w-full py-1 px-1 mb-4 justify-between space-x-2 rounded drop-shadow-xl '
			>
				<div className='flex flex-row wrap w-full mobile:w-full py-1 px-1 justify-between space-x-2 bg-white rounded'>
					<div className='flex flex-row justify-between'>
						<div className='flex w-full py-1 px-1 justify-between'>
							<input
								type='checkbox'
								{...register('isChecked')}
								className='flex justify-center align-center bg-white'
							/>
						</div>
						<div className='flex flex-start p-1 '>
							<input
								// Set the ref for the input element
								{...register('newTitle')}
								style={{ textDecoration: isChecked && 'line-through' }}
								className='list desktop:w-96'
							></input>
						</div>
					</div>
					<div className='flex flex-row space-x-4 mobile:space-x-2 pr-1'>
						<div className='flex flex-end '>
							<button
								type='button'
								className='rounded justify-center flex align-center p-1 hover:bg-slate-400 hover:rounded'
								onClick={openRemoveModal}
							>
								<TiTrash size={22} style={{ color: 'red' }} />
							</button>
						</div>
						<div>
							<button
								type='button'
								className='rounded justify-center flex align-center p-1 hover:bg-slate-400 hover:rounded'
								onClick={handleEditClick}
							>
								<TiEdit size={22} style={{ color: 'blue' }} />
							</button>
						</div>
						<div>
							<button
								type='submit'
								className='hover:bg-slate-400 hover:rounded flex align-center p-1'
							>
								<FaCheckCircle size={22} style={{ color: 'green' }} />
							</button>
						</div>
					</div>
				</div>
				<p
					className={`text-red-700 w-full  max-w-[600px] px-3 text-left ${
						errors?.newTitle ? '' : 'invisible'
					}`}
				>
					{errors?.newTitle?.message || 'Placeholder'}
				</p>
			</form>
		</>
	);
}

export default TodoItem;
