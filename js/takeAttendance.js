import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js';
import 'https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js';
import { getFirestore, collection, doc, getDoc,getDocs, setDoc } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js';

const authToken = localStorage.getItem("authToken");
if (!authToken) {
  window.location.href = "../index.html";
}

function _0x1224(){const _0x5e9338=['17381OpZYMV','738NWPJbs','6qPmqIx','10oABRnw','fire-d5c6e.appspot.com','fire-d5c6e','27396vsXfkF','902HFXRsF','2231146188','1:2231146188:web:6e0ae975a56c2b0d765469','14714OiAHdG','4XRtzxT','27112GFMRUp','70ozySrX','fire-d5c6e.firebaseapp.com','G-YB81Y74BGS','2115905ulqUlK','843Qqoyls','4348989sRKhef','792381qmClIx'];_0x1224=function(){return _0x5e9338;};return _0x1224();}const _0x52c172=_0x2011;function _0x2011(_0x491a0f,_0x437b30){const _0x1224c7=_0x1224();return _0x2011=function(_0x201118,_0x235b8b){_0x201118=_0x201118-0x15b;let _0x9710d1=_0x1224c7[_0x201118];return _0x9710d1;},_0x2011(_0x491a0f,_0x437b30);}(function(_0xac8f9,_0x24fcca){const _0x1bcfc4=_0x2011,_0x151aa3=_0xac8f9();while(!![]){try{const _0x48bd3e=-parseInt(_0x1bcfc4(0x16a))/0x1*(parseInt(_0x1bcfc4(0x16e))/0x2)+-parseInt(_0x1bcfc4(0x16c))/0x3*(-parseInt(_0x1bcfc4(0x164))/0x4)+parseInt(_0x1bcfc4(0x169))/0x5*(-parseInt(_0x1bcfc4(0x15b))/0x6)+-parseInt(_0x1bcfc4(0x166))/0x7*(-parseInt(_0x1bcfc4(0x165))/0x8)+-parseInt(_0x1bcfc4(0x16b))/0x9*(parseInt(_0x1bcfc4(0x15c))/0xa)+parseInt(_0x1bcfc4(0x160))/0xb*(-parseInt(_0x1bcfc4(0x15f))/0xc)+-parseInt(_0x1bcfc4(0x16d))/0xd*(-parseInt(_0x1bcfc4(0x163))/0xe);if(_0x48bd3e===_0x24fcca)break;else _0x151aa3['push'](_0x151aa3['shift']());}catch(_0x469a16){_0x151aa3['push'](_0x151aa3['shift']());}}}(_0x1224,0x48e21));const firebaseConfig={'apiKey':'AIzaSyAHWDe05u7Fn7Y3I3WQugdu2FpCn44g7lg','authDomain':_0x52c172(0x167),'projectId':_0x52c172(0x15e),'storageBucket':_0x52c172(0x15d),'messagingSenderId':_0x52c172(0x161),'appId':_0x52c172(0x162),'measurementId':_0x52c172(0x168)};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const bd = document.body;

const usersCollection = collection(db, 'attendance');
const causeCollection = collection(db, 'cause');

const submitCause = document.getElementById("submitCause");
submitCause.addEventListener("click", function(e) {
    e.preventDefault();

    const today1 = document.getElementById("date");
    const today = today1.value;
    const meetCause1 = document.getElementById("cause");
    const meetCause = meetCause1.value;
    async function cause(){
        try{
            const docRef = doc(causeCollection, today);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()) {
                alert('Date already used');
                
            } else{
                await setDoc(docRef, { Cause: meetCause});
            }
        } catch (error) {
            console.error('Error storing cause:', error);
        }
    }

    async function getList() {      
        try{
            const docSnap = await getDocs(usersCollection);

            docSnap.forEach((doc) => {
                const data = doc.data(); 
                // console.log('Document ID: ${doc.id} => Data: ', data);
                const name = data.Name;
                const Usn = doc.id;
                const year = data.Year;
                const container = document.getElementById(year);
                const appendData = document.createElement("div");

                container.style.display = "block";
                appendData.className = "member";
                appendData.textContent = name;
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.id = Usn;

                appendData.appendChild(checkbox);
                container.appendChild(appendData);
              });

        }catch (error) {
            console.error('Error storing user:', error);
        }
    }
    cause();
    getList();
    submitCause.style.display = "none";
    today1.style.display = "none";
    meetCause1.style.display = "none";
    const submitAttendance = document.createElement("input");
    submitAttendance.type = "submit";
    submitAttendance.id = "submitAttendance";
    bd.appendChild(submitAttendance);

    submitAttendance.addEventListener("click", function(e){
        e.preventDefault();
        
        const checkboxes = document.querySelectorAll("input[type='checkbox']");
        checkboxes.forEach(chkbox=> {
            addAttendance(chkbox, today);
        });
    
        async function addAttendance(chkbox, today) {
            const usn = chkbox.id;
            try{
                const docRef = doc(usersCollection, usn);
                const docSnap = await getDoc(docRef);
                
                if(chkbox.checked){
                    if(docSnap.exists()) {
                        await setDoc(docRef, { [today]: "P"}, { merge: true});
                    }
                }else {
                    await setDoc(docRef, { [today]: "A"}, { merge: true});
                }
            } catch(error){
                console.log('Error string is: '.error);
            }
        }
        setTimeout(function() {
            alert("Attendance of date "+today+" submitted!!");
            window.location.href = "../index.html";
        }, 5000);
    });
});
