let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");

signup.addEventListener("click", () => {
  slider.classList.add("moveslider");
  formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
  slider.classList.remove("moveslider");
  formSection.classList.remove("form-section-move");
});


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

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
const auth = getAuth(app);
const db = getFirestore(app);

let btn = document.querySelector('#subtn')

if (btn) {

  btn.addEventListener('click', () => {

    let email = document.querySelector('#semail')
    let password = document.querySelector('#spass')




    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(async (userCredential) => {

        const user = userCredential.user;
        console.log(user)

        try {
          const docRef = await addDoc(collection(db, "users"), {
            first: email.value,
            last: password.value,
          });
          console.log("Document written with ID: ", docRef.id);
          alert('Sign up Hogaya')
        }


        catch (e) {
          console.error("Error adding document: ", e);
        }

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('error code=> ', errorCode)
        console.log('error message=>', errorMessage)

      });

  })

}


let btn1 = document.querySelector('#sibtn')

if (btn1) {

  btn1.addEventListener('click', () => {
    let email = document.querySelector('#lemail')
    let password = document.querySelector('#lpass')

    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        localStorage.setItem("userUid", user.uid)
        location.href = './todo.html'


      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
      })


  })
}


// let getbtn = document.querySelector('#show') 
// if(getbtn){
//  getbtn.addEventListener('click',async()=>{ const querySnapshot = await getDocs(collection(db, "users"));
//   let getDiv=document.getElementById('getusers') 
//   querySnapshot.forEach((doc) => { console.log(doc.ref._key.path.segments[6])
//      let abc=doc.data()((user)=> //filter(user=>user.first==user.email)); 
//      getDiv.innerHTML+=`
// ${doc.data().first}
// ${doc.data().last}
// ` }); }) }