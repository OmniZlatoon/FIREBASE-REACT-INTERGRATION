
//import './App.css'
import { useState } from 'react';
import { auth, database } from './../src/fireBaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	getAuth, GoogleAuthProvider, signInWithPopup
} from 'firebase/auth';

export default function App() {
	const [data, setData] = useState({
		email: '',
		password: '',
		name: '',
		age: '',
		phone: ''
	});
	//const auth = getAuth();

	const handleInput = (event: any) => {
		const inputs = { [event.target.name]: event.target.value };
		setData({ ...data, ...inputs });
	};

	// [================== SIGN UP AND SIGN IN FUNCTIONALITY ( AUTH + FIRESTORE) ==================] ===============================

	// function to sign up user with email and password ( in the AUTH)
	const handleSignUp = async () => {
		try {
			const UserRef = await createUserWithEmailAndPassword(auth, data.email, data.password);
			const user = UserRef.user;
			// create the user document in FIRESTORE using the uid from AUTH
			await setDoc(doc(database, "users", user.uid), {
				name: data.name,
				email: data.email,
				age: data.age,
				phone: data.phone
			});
			console.log(data);
			alert("User Account Created!");
		} catch (error) {
			alert("Error signing up user: " + error);
			console.log(error);
		}
	};

	// function to sign in user with email and password ( using AUTH only)
	const handlesignIn = async () => {
		signInWithEmailAndPassword(auth, data.email, data.password)
			.then(response => {
				alert("User signed in successfully");
				console.log(response);
				console.log("User signed in successfully");
				getToken();
			})
			.catch(error => {
				console.log(error);
			});
		console.log(data);
		// Handle form submission here
	};

	// get idtoken from currently signed in user
	const getToken = async () => {
		const user = auth.currentUser;
		if (user) {
			const idToken = await user.getIdToken();
			console.log("ID Token:", idToken);
			SendIdtokentoServer(idToken);
		} else {
			console.log("No user is signed in.");
		}
	};

	// send the IdToken to my NodeJs server for validation
	const SendIdtokentoServer = async (idToken: string) => {
		const response = await fetch("/api/nexasoft/users/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"authorization": `Bearer ${idToken}`,
				"ngrok-skip-browser-warning": "69420"
			}
		});
		console.log(idToken);
		const responseData = await response.json();
		console.log(responseData);
	};

	// [================== SIGN IN WITH GOOGLE FUNCTIONALITY ( OAUTH) ==================] ===============================
	// Using the getAuth function to create an instance of the authentication service and the GoogleAuthProvider class to create an instance of the Google authentication provider.
	// This will allow us to implement Google sign-in functionality in our application.

	const Oauth = getAuth();
	const provider = new GoogleAuthProvider();

	const handleGoogleSignIn = async () => {
		const result = await signInWithPopup(Oauth, provider);
		const user = result.user;
		// check if user already exist in Firestore
		const userExist = await getDoc(doc(database, "users", user.uid));
		if (!userExist.exists()) {
			// create user document in Firestore
			await setDoc(doc(database, "users", user.uid), {
				name: user.displayName,
				email: user.email,
				phone: user.phoneNumber || '',
				uid: user.uid
			});
			console.log(`user_id: ${user.uid} `);
		}
	};

	return (
		<div className='flex flex-col  justify-center   items'>
			<h1>React Firebase</h1>
			{/* Style the form to be centered and displayed column*/}
			<div className="form-styles">
				<input type="name"
					name="name"
					placeholder="name"
					onChange={event => handleInput(event)}
				/>
				<input type="email"
					name="email"
					placeholder="email"
					onChange={event => handleInput(event)}
				/>
				<input type="password"
					name="password"
					placeholder="password"
					onChange={event => handleInput(event)}
				/>
				<input type="text"
					name="age"
					placeholder="age"
					onChange={event => handleInput(event)}
				/>
				<input type="number"
					name="phone"
					placeholder="phone"
					onChange={event => handleInput(event)}
				/>
				<div className='button-styles'>
					<button onClick={handlesignIn} className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600'>Sign In</button>
					<button onClick={handleSignUp} className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600'>Sign Up</button>
					<p> -OR -</p>
					<button onClick={handleGoogleSignIn} className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>Sign in with Google</button>
				</div>
			</div>
		</div>
	);
}



