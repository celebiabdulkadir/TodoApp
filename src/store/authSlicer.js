import { createSlice } from '@reduxjs/toolkit';

let userFromStorage;

try {
	userFromStorage = JSON.parse(localStorage.getItem('user'));
} catch (error) {
	userFromStorage = null;
}

const initialState = {
	user: userFromStorage || false,
};

const authSlicer = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action) => {
			const { uid, displayName, email } = action.payload;

			// Only persist serializable user data in state
			const userData = { uid, displayName, email };

			localStorage.removeItem('user');
			localStorage.setItem('user', JSON.stringify(userData));

			state.user = userData;
		},
		logout: (state, action) => {
			localStorage.removeItem('user');
			state.user = false;
		},
	},
});

export const { login, logout } = authSlicer.actions;

export default authSlicer.reducer;
