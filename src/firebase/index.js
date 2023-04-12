// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCCPW8oZ50S5PPQhAc6zy3MrFVjUQFpJKo",
	authDomain: "list-todo-f5993.firebaseapp.com",
	projectId: "list-todo-f5993",
	storageBucket: "list-todo-f5993.appspot.com",
	messagingSenderId: "433926303437",
	appId: "1:433926303437:web:4a6c382fc4d1e06cb74384"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{
	db
}
