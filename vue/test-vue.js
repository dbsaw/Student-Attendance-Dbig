new Vue({
  el: "#app",
  data: {
    selectedGrade: "",
    selected: [],
    grades: [
      "Grade1",
      "Grade2",
      "Grade3",
      "Grade4",
      "Grade5",
      "Grade6",
      "Level1",
      "Level2",
      "Level3",
    ],
    studentNames: [], // Fetch this once and use it
    listNames: [],
    students: [],
    message: "",
    showTable: false,
  },
  created() {
    // Fetch the student list once when the component is created
    this.updateOptions();
  },
  methods: {
    addStudentInput() {
      this.students.push({});
    },
    removeStudentInput(index) {
      this.students.splice(index, 1);
    },
    resetForm() {
      this.selectedGrade = "";
      this.students = [];
      this.message = "";
      this.showTable = false;
    },
    submitForm() {
      // Your form submission logic here
      this.showTable = true; // Display the table
      this.message = "Form submitted successfully"; // Update the message
    },
    updateOptions() {
      this.studentNames = [];
      if (this.listNames.length == 0) {
        this.getStudentList(this.selectedGrade).then((value) => {
          this.listNames = value;
        });
      }
      this.studentNames = this.listNames[this.selectedGrade];
    },
    getStudentList() {
      return fetch(
        "https://raw.githubusercontent.com/dbsaw/Student-Attendance-Dbig/main/students.js"
      )
        .then((response) => response.json())
        .then((data) => {
          return data;
        })
        .catch((error) => console.error("Error fetching JSON:", error));
    },
  },
});
