// Student database
const students = [
    { roll: "101", name: "Rahul" },
    { roll: "102", name: "Priya" },
    { roll: "103", name: "Arjun" },
    { roll: "104", name: "Sneha" },
    { roll: "105", name: "Vikram" },
    { roll: "106", name: "Anjali" },
    { roll: "107", name: "Kiran" },
    { roll: "108", name: "Neha" },
    { roll: "109", name: "Ravi" },
    { roll: "110", name: "Pooja" }
];

let attendance = [];

// Simulate an IR sensor detecting a student
function simulateSensor() {

    // Find students who are not yet marked present
    const absentStudents = students.filter(student =>
        !attendance.some(record => record.roll === student.roll)
    );

    if (absentStudents.length === 0) {
        document.getElementById("sensorStatus").textContent =
            "All students are already marked present!";
        return;
    }

    // Simulate detection of the next student
    const student = absentStudents[0];

    markAttendance(student);
}

// Mark student attendance
function markAttendance(student) {

    const now = new Date();

    const time = now.toLocaleTimeString();

    attendance.push({
        roll: student.roll,
        name: student.name,
        time: time
    });

    updateDashboard();
    updateTable();

    const sensorStatus = document.getElementById("sensorStatus");

    sensorStatus.textContent =
        `Student Detected: ${student.name}`;

    sensorStatus.style.background = "#dcfce7";
    sensorStatus.style.color = "#166534";
}

// Update dashboard numbers
function updateDashboard() {

    const total = students.length;
    const present = attendance.length;
    const absent = total - present;

    document.getElementById("totalStudents").textContent = total;
    document.getElementById("presentCount").textContent = present;
    document.getElementById("absentCount").textContent = absent;
}

// Update attendance table
function updateTable() {

    const table = document.getElementById("attendanceTable");

    table.innerHTML = "";

    attendance.forEach(record => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${record.roll}</td>
            <td>${record.name}</td>
            <td>${record.time}</td>
            <td class="status-present">Present</td>
        `;

        table.appendChild(row);
    });
}

// Initial dashboard
updateDashboard();
