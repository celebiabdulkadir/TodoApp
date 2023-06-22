import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from 'firebase/auth';
import {
	addDoc,
	collection,
	doc,
	deleteDoc,
	getFirestore,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const firebaseConfig = {
	apiKey: 'AIzaSyCOt6cJsqnzmDGxzlaEJZ-MTMs_m5qw5Hs',
	authDomain: 'todoapp-1ff75.firebaseapp.com',
	projectId: 'todoapp-1ff75',
	storageBucket: 'todoapp-1ff75.appspot.com',
	messagingSenderId: '701589511881',
	appId: '1:701589511881:web:3b925cf4e7cebd62087718',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const addTodo = async (data) => {
	try {
		const result = await addDoc(collection(db, 'Todos'), data);
		return result;
	} catch (e) {
		toast(e.message, {
			position: 'top-right',
			autoClose: 3000,
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
export const deleteTodo = async (id) => {
	try {
		await deleteDoc(doc(db, 'Todos', id));
	} catch (e) {
		toast(e.message, {
			position: 'top-right',
			autoClose: 3000,
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

const auth = getAuth();

export const register = async (email, password, userName) => {
	try {
		await createUserWithEmailAndPassword(auth, email, password).then(
			async (res) => {
				await updateProfile(auth.currentUser, {
					displayName: userName,
				});
			}
		);
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
export const login = async (email, password) => {
	try {
		const { user } = await signInWithEmailAndPassword(auth, email, password);

		toast('Logged in successfully!', {
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
		return user;
	} catch (e) {
		toast(e.message, {
			position: 'top-right',
			autoClose: 3000,
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
export const logOut = async () => {
	try {
		await signOut(auth);
	} catch (e) {
		toast(e.message, {
			position: 'top-right',
			autoClose: 3000,
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
export default app;
