import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOt6cJsqnzmDGxzlaEJZ-MTMs_m5qw5Hs",
  authDomain: "todoapp-1ff75.firebaseapp.com",
  projectId: "todoapp-1ff75",
  storageBucket: "todoapp-1ff75.appspot.com",
  messagingSenderId: "701589511881",
  appId: "1:701589511881:web:3b925cf4e7cebd62087718",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const addTodo = async (data) => {
  const result = await addDoc(collection(db, "Todos"), data);
  console.log(result);
  //   return result;
};
export const deleteTodo = async (id) => {
  await deleteDoc(doc(db, "Todos", id));
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
    alert("Registered Successfully");
  } catch (e) {
    alert(e.message);
  }
};
export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (e) {
    alert(e.message);
  }
};
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (e) {
    alert(e.message);
  }
};
export default app;
