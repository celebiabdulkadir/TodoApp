import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TodosPage from '../Pages/TodosPage';

export default function PrivateRoute() {
	const { user } = useSelector((state) => {
		return state.auth;
	});

	// If authorized, return an outlet that will render child elements
	// If not, return element that will navigate to login page
	return user ? <TodosPage /> : <Navigate to='/login' />;
}
