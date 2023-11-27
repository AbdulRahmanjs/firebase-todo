import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDtmncWtP-fFKjA2ezi6x83tpk0fUfsoNI",
    authDomain: "saylanib10.firebaseapp.com",
    projectId: "saylanib10",
    storageBucket: "saylanib10.appspot.com",
    messagingSenderId: "392928539435",
    appId: "1:392928539435:web:6689dc8b93218a25da4b6e",
    measurementId: "G-7YHJC3P4HB"
  };
  

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const userUid = localStorage.getItem("userUid");
console.log(userUid);

window.addtodo = async function () {
    let getinp = document.querySelector('#getinp')
    const docRef = await addDoc(collection(db, userUid), {
        name: getinp.value,
        time: new Date().toLocaleString()
    });
    console.log("Document written with ID: ", docRef.id);

}

function getData() {
    let ul = document.querySelector('#getul')
    onSnapshot(collection(db, userUid), (data) => {
        data.docChanges().forEach((newData) => {

            if (newData.type == 'removed') {
                let del = document.getElementById(newData.doc.id)
                del.remove()
            }
            else if(newData.type == 'added') {
                // console.log(newData)
                ul.innerHTML += `
                            <li id=${newData.doc.id}>${newData.doc.data().name} <br> ${newData.doc.data().time} <button onclick="delTodo('${newData.doc.id}')">Delete</button> <button onclick="edit(this,'${newData.doc.id}')">Edit</button></li>
                            `

            }
           

        })
    })
}

getData()

async function delTodo(id) {
    await deleteDoc(doc(db, userUid, id));
}


async function edit(e,id) {
    let editval = prompt('Enter Edit value')

    e.parentNode.firstChild.nodeValue = editval

    await updateDoc(doc(db, userUid, id), {
        name: editval,
        time: new Date().toLocaleString()
    });
}


window.getData = getData
window.delTodo = delTodo
window.edit = edit