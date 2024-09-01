import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js';
import 'https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js';

const authToken = localStorage.getItem("authToken");
if (!authToken) {
  window.location.href = "../index.html";
}

function _0x1224(){const _0x5e9338=['17381OpZYMV','738NWPJbs','6qPmqIx','10oABRnw','fire-d5c6e.appspot.com','fire-d5c6e','27396vsXfkF','902HFXRsF','2231146188','1:2231146188:web:6e0ae975a56c2b0d765469','14714OiAHdG','4XRtzxT','27112GFMRUp','70ozySrX','fire-d5c6e.firebaseapp.com','G-YB81Y74BGS','2115905ulqUlK','843Qqoyls','4348989sRKhef','792381qmClIx'];_0x1224=function(){return _0x5e9338;};return _0x1224();}const _0x52c172=_0x2011;function _0x2011(_0x491a0f,_0x437b30){const _0x1224c7=_0x1224();return _0x2011=function(_0x201118,_0x235b8b){_0x201118=_0x201118-0x15b;let _0x9710d1=_0x1224c7[_0x201118];return _0x9710d1;},_0x2011(_0x491a0f,_0x437b30);}(function(_0xac8f9,_0x24fcca){const _0x1bcfc4=_0x2011,_0x151aa3=_0xac8f9();while(!![]){try{const _0x48bd3e=-parseInt(_0x1bcfc4(0x16a))/0x1*(parseInt(_0x1bcfc4(0x16e))/0x2)+-parseInt(_0x1bcfc4(0x16c))/0x3*(-parseInt(_0x1bcfc4(0x164))/0x4)+parseInt(_0x1bcfc4(0x169))/0x5*(-parseInt(_0x1bcfc4(0x15b))/0x6)+-parseInt(_0x1bcfc4(0x166))/0x7*(-parseInt(_0x1bcfc4(0x165))/0x8)+-parseInt(_0x1bcfc4(0x16b))/0x9*(parseInt(_0x1bcfc4(0x15c))/0xa)+parseInt(_0x1bcfc4(0x160))/0xb*(-parseInt(_0x1bcfc4(0x15f))/0xc)+-parseInt(_0x1bcfc4(0x16d))/0xd*(-parseInt(_0x1bcfc4(0x163))/0xe);if(_0x48bd3e===_0x24fcca)break;else _0x151aa3['push'](_0x151aa3['shift']());}catch(_0x469a16){_0x151aa3['push'](_0x151aa3['shift']());}}}(_0x1224,0x48e21));const firebaseConfig={'apiKey':'AIzaSyAHWDe05u7Fn7Y3I3WQugdu2FpCn44g7lg','authDomain':_0x52c172(0x167),'projectId':_0x52c172(0x15e),'storageBucket':_0x52c172(0x15d),'messagingSenderId':_0x52c172(0x161),'appId':_0x52c172(0x162),'measurementId':_0x52c172(0x168)};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const usersCollection = collection(db, 'attendance');
const causeCollection = collection(db, 'cause');
const dt = document.getElementById("dataTable");
const downloadBtn = document.getElementById("downloadBtn");

window.addEventListener("load", function(e) {
    e.preventDefault();

    async function display() {
        const docSnap = await getDocs(causeCollection);

        //creating table
        const table = document.createElement("table");
        table.style.width = '100%';
        table.setAttribute('border', '1');
        const headerRow = document.createElement('tr');
        const headData = ['Name'];
        //collecting "date" as table head value from "cause" collection 
        docSnap.forEach((doc) => {
            headData.push(doc.id);
        });

        const len = headData.length - 1;

        //setting Name head Percentage in header of table
        var th = document.createElement('th');
        th.textContent = 'Name';
        headerRow.appendChild(th);
        
        var th = document.createElement('th');
        th.textContent = 'Percentage';
        headerRow.appendChild(th);

        table.appendChild(headerRow);

        const attendanceSnap = await getDocs(usersCollection);
        const tableData = []; // Array to store data for Excel download

        //getting "field" value of each date of "cause" from "attendance"
        attendanceSnap.forEach((doc) => {
            const data = doc.data();
            const dataRow = [];
            const rowObj = {}; // Object for Excel data row
            var p = 0; //percentage
            headData.forEach(headerText => {
                const value = data[headerText] || '';
                if (value == 'P') {
                    p = p + 1;
                }
            });

            dataRow.push(data.Name);
            rowObj['Name'] = data.Name;

            const per = (p / len) * 100; //calculating percentage
            dataRow.push(per.toFixed(2) + '%');
            rowObj['Percentage'] = per.toFixed(2) + '%'; // Adding percentage to Excel data
            tableData.push(rowObj);

            //pushing data to table
            const row = document.createElement('tr');
            dataRow.forEach(rowData => {
                const cell = document.createElement('td');
                cell.textContent = rowData;
                row.appendChild(cell);
            });
            table.appendChild(row);
        });

        dt.appendChild(table);

        // Adding download button functionality
        downloadBtn.addEventListener('click', () => {
            const ws = XLSX.utils.json_to_sheet(tableData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
            XLSX.writeFile(wb, 'attendance_data.xlsx');
        });
    }

    display();
});
