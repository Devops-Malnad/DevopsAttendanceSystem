import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js';
import 'https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js';
import { getFirestore, collection, getDocs, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js';

const authToken = localStorage.getItem("authToken");
if (!authToken) {
    window.location.href = "../index.html";
}

function _0x1224(){const _0x5e9338=['17381OpZYMV','738NWPJbs','6qPmqIx','10oABRnw','fire-d5c6e.appspot.com','fire-d5c6e','27396vsXfkF','902HFXRsF','2231146188','1:2231146188:web:6e0ae975a56c2b0d765469','14714OiAHdG','4XRtzxT','27112GFMRUp','70ozySrX','fire-d5c6e.firebaseapp.com','G-YB81Y74BGS','2115905ulqUlK','843Qqoyls','4348989sRKhef','792381qmClIx'];_0x1224=function(){return _0x5e9338;};return _0x1224();}const _0x52c172=_0x2011;function _0x2011(_0x491a0f,_0x437b30){const _0x1224c7=_0x1224();return _0x2011=function(_0x201118,_0x235b8b){_0x201118=_0x201118-0x15b;let _0x9710d1=_0x1224c7[_0x201118];return _0x9710d1;},_0x2011(_0x491a0f,_0x437b30);}(function(_0xac8f9,_0x24fcca){const _0x1bcfc4=_0x2011,_0x151aa3=_0xac8f9();while(!![]){try{const _0x48bd3e=-parseInt(_0x1bcfc4(0x16a))/0x1*(parseInt(_0x1bcfc4(0x16e))/0x2)+-parseInt(_0x1bcfc4(0x16c))/0x3*(-parseInt(_0x1bcfc4(0x164))/0x4)+parseInt(_0x1bcfc4(0x169))/0x5*(-parseInt(_0x1bcfc4(0x15b))/0x6)+-parseInt(_0x1bcfc4(0x166))/0x7*(-parseInt(_0x1bcfc4(0x165))/0x8)+-parseInt(_0x1bcfc4(0x16b))/0x9*(parseInt(_0x1bcfc4(0x15c))/0xa)+parseInt(_0x1bcfc4(0x160))/0xb*(-parseInt(_0x1bcfc4(0x15f))/0xc)+-parseInt(_0x1bcfc4(0x16d))/0xd*(-parseInt(_0x1bcfc4(0x163))/0xe);if(_0x48bd3e===_0x24fcca)break;else _0x151aa3['push'](_0x151aa3['shift']());}catch(_0x469a16){_0x151aa3['push'](_0x151aa3['shift']());}}}(_0x1224,0x48e21));const firebaseConfig={'apiKey':'AIzaSyAHWDe05u7Fn7Y3I3WQugdu2FpCn44g7lg','authDomain':_0x52c172(0x167),'projectId':_0x52c172(0x15e),'storageBucket':_0x52c172(0x15d),'messagingSenderId':_0x52c172(0x161),'appId':_0x52c172(0x162),'measurementId':_0x52c172(0x168)};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const del = document.getElementById("delete");
del.addEventListener("click", function(e){
    e.preventDefault();

    const usersCollection = collection(db, 'attendance');
    const causeCollection = collection(db, 'cause');

    async function del1() {
        const docSnap = await getDocs(usersCollection);
        const querySnap = await getDocs(causeCollection);
        querySnap.forEach((dox)=> {
            var date = dox.id;
            docSnap.forEach((doc)=> {
                updateDoc(doc.ref, {
                    [date]: deleteField()
                }).then(() => {
                }).catch((error) => {
                    console.error("Error deleting field from document: ${doc.id}", error);
                });
            });
            deleteDoc(dox.ref).then(() =>{
            }).catch((error) => {
                console.error(`Error deleting document: ${doc.id}`, error);
            });
        });
    }
    var prot = prompt("Enter secret code");
    if(prot == "delete complete attendance"){
        del1();
    }else{
        alert("You entered wrong code");
    }
})
