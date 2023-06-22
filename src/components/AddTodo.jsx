import React, { useState } from 'react';

import { addTodo } from '../firebase/firebase';
import { getAuth } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Spinner from './Spinner';

function AddTodo() {
	const [loading, setLoading] = useState(false);
	const schema = yup.object().shape({
		todo: yup
			.string()
			.trim('No leading/trailing whitepaces allowed')
			.min(3, 'Todo must be at least 3 characters')
			.required('Todo is required'),
	});
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		reset,
	} = useForm({ resolver: yupResolver(schema) });

	const auth = getAuth();
	const user = auth.currentUser;

	const onSubmit = async (data) => {
		setLoading(true);
		try {
			await addTodo({
				userMail: user?.email,
				userId: user?.uid,
				content: data?.todo,
				date: Date.now(),
			});
			toast('Added', {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
				type: 'success',
			});
		} catch (e) {
			toast(e.message, {
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
		} finally {
			setLoading(false);
			reset();
		}
	};

	return (
		<>
			{loading && <Spinner />}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex w-[80%] mobile:w-full  max-w-[600px] flex-row'
			>
				<ToastContainer limit={3} />
				<input
					{...register('todo')}
					className=' w-full  max-w-[600px] placeholder:italic placeholder:text-slate-400 block bg-white  border border-slate-300 rounded-md p-1 m-1  pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
				/>

				<button
					type='submit'
					className='bg-[#D8605B]  font-medium rounded-lg text-sm p-2 my-1 text-white hover:bg-[#ac4b48] hover:rounded hover:shadow-xl hover:scale-110'
				>
					ADD
				</button>
			</form>

			<p
				className={`text-red-700 w-full  max-w-[600px] px-3 text-left ${
					errors.todo ? '' : 'invisible'
				}`}
			>
				{errors.todo?.message || 'Placeholder'}
			</p>
		</>
	);
}
export default AddTodo;
