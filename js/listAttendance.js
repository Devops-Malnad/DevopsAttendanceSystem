import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js';
import 'https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js';
import { firebaseConfig } from './config.js';

const authToken = localStorage.getItem("authToken");
if (!authToken) {
  window.location.href = "../index.html";
}

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
