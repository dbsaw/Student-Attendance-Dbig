document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission
    document.getElementById("message").textContent = "Submitting..";
    document.getElementById("message").style.display = "block";
    document.getElementById("submit-button").disabled = true;

    // Collect the form data
    var formData = new FormData(this);
    var keyValuePairs = [];
    for (var pair of formData.entries()) {
      keyValuePairs.push(pair[0] + "=" + pair[1]);
    }

    var formDataString = keyValuePairs.join("&");

    // Send a POST request to your Google Apps Script
    fetch(
      "https://script.google.com/macros/s/AKfycbxwgylRbjue8NBZXR_pK3D0Hsl4LIkd123dkHG1FBIkG_CmDpi6H-87L4PXjsnSd2fm/exec",
      {
        redirect: "follow",
        method: "POST",
        body: formDataString,
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      }
    )
      .then(function (response) {
        // Check if the request was successful
        if (response) {
          return response; // Assuming your script returns JSON response
        } else {
          throw new Error("Failed to submit the form.");
        }
      })
      .then(function (data) {
        // Display a success message
        document.getElementById("message").textContent =
          "Data submitted successfully!";
        document.getElementById("message").style.display = "block";
        document.getElementById("message").style.backgroundColor = "green";
        document.getElementById("message").style.color = "beige";
        document.getElementById("submit-button").disabled = false;
        document.getElementById("form").reset();

        setTimeout(function () {
          document.getElementById("message").textContent = "";
          document.getElementById("message").style.display = "none";
        }, 2600);
      })
      .catch(function (error) {
        // Handle errors, you can display an error message here
        console.error(error);
        document.getElementById("message").textContent =
          "An error occurred while submitting the form.";
        document.getElementById("message").style.display = "block";
      });
  });


  var grade = document.querySelector("#StudentGrade");
  grade.addEventListener("change", (event) => {
      var selectedGrade = event.target.value;  // Get the selected value from the <select> element
  
      getStudentlist(selectedGrade).then(value => {
          var names = document.querySelector('#Studentnames');
          names.innerHTML = '';
  
          for (var key in value) {
              if (value.hasOwnProperty(key)) {
                // Create an <option> element
                var option = document.createElement('option');
                
                // Set the value and text of the option
                option.value = value[key];
                option.text = value[key];
                
                // Append the option to the <select> element
                names.add(option);
              }
          }
          // Do something with the value, e.g., update the studentList
          // studentList.innerHTML = value;
      });
  });


  function getStudentlist(grade){
    return fetch('https://raw.githubusercontent.com/dbsaw/Student-Attendance-Dbig/main/students.js')
        .then(response => response.json())
        .then(data => {
            // Access data using keys
            const value = data[grade];

            // Print or manipulate the data as needed
            return value;
        })
        .catch(error => console.error('Error fetching JSON:', error));
}