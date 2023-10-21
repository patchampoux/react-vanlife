import {initializeApp} from "firebase/app";
import {collection, getDocs, doc, getDoc, getFirestore, query, where} from "firebase/firestore/lite";

const firebaseConfig = {
	apiKey: "AIzaSyDr4AOkYF-FiIYZjqF0XMeT8a23cjy7upw",
	authDomain: "react-vanlife-2e4c5.firebaseapp.com",
	projectId: "react-vanlife-2e4c5",
	storageBucket: "react-vanlife-2e4c5.appspot.com",
	messagingSenderId: "676748333965",
	appId: "1:676748333965:web:1290cbefeb9c54f85a63c4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getVans() {
	const vansCollectionRef = collection(db, "vans");
	const snapshot = await getDocs(vansCollectionRef);

	return snapshot.docs.map(doc => ({
		...doc.data(),
		id: doc.id
	}));
}

export async function getVan(id) {
	const docRef = doc(db, "vans", id);
	const snapshot = await getDoc(docRef);

	console.log(snapshot);

	return {
		...snapshot.data(),
		id: snapshot.id
	}
}

export async function getHostVans() {
	const vansCollectionRef = collection(db, "vans");
	const q = query(vansCollectionRef, where("hostId", '==', "123"));
	const snapshot = await getDocs(q);

	return snapshot.docs.map(doc => ({
		...doc.data(),
		id: doc.id
	}));
}

export async function loginUser(creds) {
	const res = await fetch("/api/login",
		{method: "post", body: JSON.stringify(creds)}
	)
	const data = await res.json()

	if (!res.ok) {
		throw {
			message: data.message,
			statusText: res.statusText,
			status: res.status
		}
	}

	return data
}