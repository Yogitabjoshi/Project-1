// Add an event listener to the form with the id "form1" when it is submitted
document.getElementById("form1").addEventListener("submit", submitFun1);

// Initialize an array to store student data from local storage, or create an empty array if no data is present
var studentDataArr = JSON.parse(localStorage.getItem("studentData")) || [];

// Function to handle form submission
function submitFun1(e) {
    // Prevent the form from submitting in the usual way
    e.preventDefault();

    // Get input values from the form
    var name = document.querySelector("#name").value;
    var number = document.querySelector("#number").value;
    var city = document.querySelector("#city").value;
    var rollNo = document.querySelector("#rollNo").value;

    // Create a student object with the input values and attendance counts
    var studentObj = {
        name: name,
        number: number,
        city: city,
        rollNo: rollNo,
        presentCount: 0,
        absentCount: 0,
    }

    // Add the student object to the array
    studentDataArr.push(studentObj);

    // Update local storage with the updated student data
    localStorage.setItem("studentData", JSON.stringify(studentDataArr));

    // Reset the form and provide a success message
    document.querySelector("#form1").reset();
    alert("Student Added Successfully");

    // Update the display to show the added student
    displayFun(studentDataArr);
}

// Function to delete a student at a specific index
function deleteStudent(index) {
    // Remove the student at the specified index
    studentDataArr.splice(index, 1);

    // Update local storage with the modified student data
    localStorage.setItem("studentData", JSON.stringify(studentDataArr));

    // Refresh the display to reflect the deleted student
    displayFun(studentDataArr);
}

// Function to display student data in a table
function displayFun(studentDataArr) {
    var count = 1;
    document.querySelector("#tbody").innerHTML = "";

    // Loop through the student data and create table rows to display it
    studentDataArr.forEach(function (item, index) {
        var tr = document.createElement("tr");

        // Create table cells for each student property
        var td1 = document.createElement("td");
        td1.innerHTML = count++;
        var td2 = document.createElement("td");
        td2.innerHTML = item.name;
        var td3 = document.createElement("td");
        td3.innerHTML = item.number;
        var td4 = document.createElement("td");
        td4.innerHTML = item.city;
        var td5 = document.createElement("td");
        td5.innerHTML = item.rollNo;
        var td6 = document.createElement("td");

        // Create "Present" and "Absent" buttons and attach event listeners
        var btn1 = document.createElement("button");
        btn1.innerHTML = "P";
        btn1.addEventListener("click", function () {
            item.presentCount++;
            updateAttendance(item);
        });
        var btn2 = document.createElement("button");
        btn2.innerHTML = "A";
        btn2.addEventListener("click", function () {
            item.absentCount++;
            updateAttendance(item);
        });

        // Add the buttons to the cell
        td6.classList.add("td6");
        td6.append(btn1, btn2);

        // Create cells to display the attendance counts
        var td7 = document.createElement("td");
        td7.textContent = item.presentCount || 0;
        var td8 = document.createElement("td");
        td8.textContent = item.absentCount || 0;

        // Create a "Delete" button and attach an event listener
        var td9 = document.createElement("td");
        var deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.addEventListener("click", function () {
            deleteStudent(index);
        });
        td9.appendChild(deleteBtn);

        // Add all cells to the table row
        tr.append(td1, td2, td3, td4, td5, td6, td7, td8, td9);

        // Add the row to the table body
        document.querySelector("#tbody").append(tr);
    });
}

// Function to update attendance counts and refresh the display
function updateAttendance(student) {
    localStorage.setItem("studentData", JSON.stringify(studentDataArr));
    displayFun(studentDataArr);
}

// Initially, display student data in the table
displayFun(studentDataArr);
