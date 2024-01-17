var studentCounter = 1;

function addStudentInput() {
  studentCounter++;

  var container = document.getElementById("studentNamesContainer");
  var secContainer = document.createElement("div");
  var thiContainer = document.createElement("div");

  var inputId = "StudentName" + studentCounter;
  var label = document.createElement("label");
  label.setAttribute("class", inputId);
  label.setAttribute("for", inputId);
  label.textContent = "Student Name " + studentCounter;

  secContainer.setAttribute("class", `input-group ${inputId}`);
  thiContainer.setAttribute("class", "input-group-append");

  var select = document.createElement("select");
  select.setAttribute("class", "form-control Studentnames");
  select.setAttribute("id", inputId);
  select.setAttribute("name", "Student Name");

  var addButton = document.createElement("button");
  addButton.setAttribute("type", "button");
  addButton.setAttribute("class", "btn btn-outline-danger");
  addButton.textContent = "Remove";
  addButton.onclick = function () {
    removeStudentInput(inputId);
  };

  container.appendChild(label);
  secContainer.appendChild(select);
  thiContainer.appendChild(addButton);
  secContainer.append(thiContainer);
  container.appendChild(secContainer);
}

function removeStudentInput(studentId) {
  studentCounter--;
  document.querySelectorAll(`.${studentId}`).forEach((e) => e.remove());
}

function resetForm() {
  document.getElementById("form").reset();
  document.getElementById("message").style.display = "none";
  document.getElementById("studentTable").style.display = "none";
  document.querySelectorAll(".Studentnames").forEach((e) => (e.innerHTML = ""));
  document.getElementById("studentNamesContainer").innerHTML = ""; // Clear dynamic student inputs
  studentCounter = 1; // Reset the student counter
}

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  var numberOfStudents = studentCounter;
  var tableBody = document.getElementById("studentTableBody");
  tableBody.innerHTML = ""; // Clear previous content

  for (var i = 1; i <= numberOfStudents; i++) {
    var inputId = "StudentName" + i;
    var studentName = document.getElementById(inputId).value;

    // Create a new row in the table
    var row = tableBody.insertRow();
    var cellName = row.insertCell(0);
    cellName.innerHTML = studentName;

    // Add buttons for Participation, Attendance, and Spelling
    var cellAttendance = row.insertCell(1);
    var cellBehaviour = row.insertCell(2);
    var cellParticipation = row.insertCell(3);
    var cellSpelling = row.insertCell(4);

    // Create a select element
    var attendanceSelect = document.createElement("select");
    var behaviourSelect = document.createElement("select");
    var ParticipationSelect = document.createElement("select");
    var SpellingSelect = document.createElement("select");
    attendanceSelect.setAttribute("class", "form-control form-control-sm");
    behaviourSelect.setAttribute("class", "form-control form-control-sm");
    ParticipationSelect.setAttribute("class", "form-control form-control-sm");
    SpellingSelect.setAttribute("class", "form-control form-control-sm");

    // Create options from 0 to 5
    // Create options from 0 to 5
    for (var j = 0; j <= 5; j++) {
      // Create a new option element for each iteration

      if (j <= 1) {
        var optionAttendance = document.createElement("option");
        optionAttendance.text = j;
        optionAttendance.text = j;
        attendanceSelect.appendChild(optionAttendance);
      }
      if (j <= 4) {
        var optionBehaviour = document.createElement("option");
        optionBehaviour.value = j;
        optionBehaviour.text = j;
        behaviourSelect.appendChild(optionBehaviour);
      }

      var optionParticipation = document.createElement("option");
      var optionSpelling = document.createElement("option");

      // Set the value and text of the option
      optionParticipation.value = j;
      optionParticipation.text = j;

      optionSpelling.value = j;
      optionSpelling.text = j;

      // Append the option to the respective select element

      ParticipationSelect.appendChild(optionParticipation);
      SpellingSelect.appendChild(optionSpelling);
    }

    // Append the select element to the corresponding cells
    cellAttendance.appendChild(attendanceSelect.cloneNode(true));
    cellBehaviour.appendChild(behaviourSelect.cloneNode(true));
    cellParticipation.appendChild(ParticipationSelect.cloneNode(true));
    cellSpelling.appendChild(SpellingSelect.cloneNode(true));
  }

  // Display the table
  document.getElementById("studentTable").style.display = "table";

  // Rest of your form submission logic...
});

var selectedGrade = ""; // Global variable to store the selected grade
var sgnames;

document.querySelector("#StudentGrade").addEventListener("change", (event) => {
  selectedGrade = event.target.value; // Update the selected grade
  sgnames = "";
  updateOptions();
});

function updateOptions() {
  var namesList = document.querySelectorAll(".Studentnames");

  if (sgnames == "") {
    getStudentlist(selectedGrade).then((value) => {
      sgnames = value;

      // Clear previous options
      namesList.forEach((names) => {
        names.innerHTML = "";
      });

      // Create and append new options
      namesList.forEach((names) => {
        for (var key in sgnames) {
          if (sgnames.hasOwnProperty(key)) {
            // Create an <option> element
            var option = document.createElement("option");

            // Set the value and text of the option
            option.value = sgnames[key];
            option.text = sgnames[key];

            // Append the option to the <select> element
            names.add(option);
          }
        }
      });
    });
  } else {
    // Clear previous options
    namesList.forEach((names) => {
      names.innerHTML = "";
    });

    // Create and append new options
    namesList.forEach((names) => {
      for (var key in sgnames) {
        if (sgnames.hasOwnProperty(key)) {
          // Create an <option> element
          var option = document.createElement("option");

          // Set the value and text of the option
          option.value = sgnames[key];
          option.text = sgnames[key];

          // Append the option to the <select> element
          names.add(option);
        }
      }
    });
  }
}

// Initial update when the page loads
updateOptions();

function getStudentlist(grade) {
  return fetch(
    "https://raw.githubusercontent.com/dbsaw/Student-Attendance-Dbig/main/students.json"
  )
    .then((response) => response.json())
    .then((data) => {
      // Access data using keys
      const value = data[grade];

      // Print or manipulate the data as needed
      return value;
    })
    .catch((error) => console.error("Error fetching JSON:", error));
}
