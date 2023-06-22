import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';

import Register from './Pages/Register';
import Login from './Pages/Login';
import PrivateRoute from './utils/privateRoute';
import Modal from './components/Modal';
import TodosPage from './Pages/TodosPage';

import { useDispatch, useSelector } from 'react-redux';
import { logOut } from './firebase/firebase';
import { logout as logOutAuth } from './store/authSlicer';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaClipboardList } from 'react-icons/fa';
import ResetPassword from './Pages/ResetPassword';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
	const [popOver, setPopOver] = useState(false);
	const ref = useRef(null);
	let location = useLocation();
	const { user } = useSelector((state) => {
		return state.auth;
	});
	const { modalOpen } = useSelector((state) => {
		return state.modal;
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const setPopOverMenu = () => {
		setPopOver(!popOver);
	};

	const handleClickOutside = (event) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setPopOver(false);
		}
	};
	useEffect(() => {
		if (user === undefined) {
			return localStorage.removeItem('user');
		}
		if (user) {
			navigate('/todo', { replace: true });
		}
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, [user]); // <- added "user" to dependencies
	const logoutHandler = async () => {
		await logOut();
		dispatch(logOutAuth());
		navigate('/login', { replace: true });
		setPopOver(false);
	};

	return (
		<>
			<ToastContainer limit={3} />
			{modalOpen && <Modal />}
			<div className='flex-flex-col  '>
				{user && location.pathname === '/todo' && (
					<nav className='flex flex-end justify-between mobile:justify-end   py-4 mobile:py-2 px-12 mobile:px-4'>
						<>
							<div className='flex mobile:hidden cursor-pointer flex-row justify-center align-middle items-center space-x-4 text-xl'>
								<NavLink
									className='flex flex-row items-center space-x-3'
									to='/todo'
								>
									{' '}
									<FaClipboardList size={40} />
									<span>Todo App</span>
								</NavLink>
							</div>
						</>

						{
							<div>
								<button
									onClick={setPopOverMenu}
									className='text-white bg-[#D8605B] mobile:hidden  hover:bg-[#ac4b48]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 mr-10 py-2.5 text-center '
								>
									Profile
								</button>
								<GiHamburgerMenu
									style={{ color: '#D8605B' }}
									size={20}
									className='desktop:hidden'
									onClick={setPopOverMenu}
								/>

								{popOver && (
									<div
										ref={ref}
										className='absolute z-10 right-0 top-16   mobile:right-0 mobile:top-0 mobile:left-0 inline-block w-56  mobile:w-full   text-sm font-light items-center align-middle text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm mr-4  '
									>
										<div className='p-3 flex flex-col break-all text-center justify-center items-center align-middle'>
											<div className='flex items-center justify-between mb-2'>
												<a href='#'>
													<img
														className='w-10 h-10 rounded-full'
														src='https://picsum.photos/200/300'
														alt='Jese Leos'
													/>
												</a>
											</div>
											<p
												className='text-base text-center font-semibold 
                   text-gray-900 '
											>
												{user.displayName}
											</p>

											<p className='text-base font-semibold  text-gray-900 mb-2'>
												{user.email}
											</p>
											<div>
												<button
													onClick={logoutHandler}
													className='text-white bg-[#D8605B] hover:bg-[#b44541] focus:ring-4 focus:bg-[#b44541] font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-[#D8605B] '
												>
													Logout
												</button>
											</div>
										</div>
									</div>
								)}
							</div>
						}
					</nav>
				)}
				<hr></hr>
				<Routes className='flex flex-row justify-center'>
					<Route path='/' element={<Login />} />
					<Route path='/register' element={<Register />} />

					<Route path='/todo' element={<TodosPage />} />
					<Route path='/login' element={<Login />} />
					<Route exact path='/todo' element={<PrivateRoute />}></Route>
					<Route path='/resetPassword' element={<ResetPassword />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
