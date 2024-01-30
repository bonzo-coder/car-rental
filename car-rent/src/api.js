import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    query,
    where
} from "firebase/firestore/lite"

const firebaseConfig = {
    apiKey: "AIzaSyAj6HrEgW8iC8I5C0ov17kZiiXCTPYggL4",
    authDomain: "car-rent-page.firebaseapp.com",
    projectId: "car-rent-page",
    storageBucket: "car-rent-page.appspot.com",
    messagingSenderId: "568775281451",
    appId: "1:568775281451:web:0329d5cc60964b8163936e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const carsCollectionRef = collection(db, "cars")

export async function getCars() {
    const querySnapshot = await getDocs(carsCollectionRef)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return dataArr
}

export async function getCar(id) {
    const docRef = doc(db, "cars", id)
    const carSnapshot = await getDoc(docRef)
    return {
        ...carSnapshot.data(),
        id: carSnapshot.id
    }
}

export async function getHostCars() {
    const q = query(carsCollectionRef, where("hostId", "==", 123))
    const querySnapshot = await getDocs(q)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return dataArr
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
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