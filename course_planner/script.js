let semesters = [
            
    { season: "fall", year: 2024 },
    { season: "winter", year: 2025 }

];
let semesterColors = {
    fall: 'fall',
    winter: 'winter',
    spring: 'spring',
    summer: 'summer'
};
const semesterDiv = document.getElementById("semesters");
const missingCoursesDiv = document.getElementById("missing-courses");
const seasons = ["spring", "summer", "fall", "winter"];
function generateSemesters() {
    semesterDiv.innerHTML = '';
    semesters.forEach((sem, index) => {
        let semesterBox = document.createElement("div");
        semesterBox.className = `semester-box ${semesterColors[sem.season]}`;
        semesterBox.dataset.index = index;
        semesterBox.innerHTML = `<div>${capitalize(sem.season)} ${sem.year}</div><div class="courses-list"></div>`;
        semesterBox.ondrop = dropCourse;
        semesterBox.ondragover = allowDrop;
        semesterDiv.appendChild(semesterBox);
    });
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function addSemester() {
    let newSemester;
    if (semesters.length === 0) {
        // If no semesters, start with Spring 2024
        newSemester = { season: "spring", year: 2024 };
    } else {
        // Get the last semester
        let lastSemester = semesters[semesters.length - 1];
        let lastSeasonIndex = seasons.indexOf(lastSemester.season);
        let nextSeasonIndex = (lastSeasonIndex + 1) % 4;
        let nextSeason = seasons[nextSeasonIndex];
        let nextYear = lastSemester.year;

        // Increment year if we're moving from Winter to Spring
        if (nextSeason === "winter" && lastSemester.season === "fall") {
            nextYear++;
        }

        newSemester = { season: nextSeason, year: nextYear };
    }

    semesters.push(newSemester);
    generateSemesters();
}

function removeSemester() {
    if (semesters.length > 0) {
        semesters.pop();
        generateSemesters();
    }
}

function displayMissingCourses() {
    missingCoursesDiv.innerHTML = ''; // Clear previous list
    const missingCourses = courses.filter(course => !studentCourses.includes(course.id));
    missingCourses.forEach(course => {
        let courseNode = createCourseNode(course.id);
        missingCoursesDiv.appendChild(courseNode);
    });
}

function createCourseNode(courseId) {
    let courseNode = document.createElement("div");
    courseNode.className = "course-node";
    courseNode.draggable = true;
    courseNode.ondragstart = dragCourse;
    courseNode.dataset.courseId = courseId;
    courseNode.innerHTML = courseId;
    return courseNode;
}

function dragCourse(event) {
    event.dataTransfer.setData("text", event.target.dataset.courseId);
}

function allowDrop(event) {
    event.preventDefault();
}
function dropCourse(event) { 
event.preventDefault();

// Find the closest parent that is a semester-box
let semesterBox = event.target.closest('.semester-box');

// If no valid semester-box is found, return early
if (!semesterBox) {
return;
}

let courseId = event.dataTransfer.getData("text");
let semesterIndex = semesterBox.dataset.index;
let semester = semesters[semesterIndex];
let course = courses.find(c => c.id === courseId);

// Check if the course can be added to this semester
if (course.semester.includes(semester.season) && check(course.id, semesterIndex)) {
// Remove the course from wherever it was before
let existingCourseNode = document.querySelector(`[data-course-id="${courseId}"]`);
if (existingCourseNode) {
    existingCourseNode.parentNode.removeChild(existingCourseNode);
}

// Add the course to the new semester
let coursesList = semesterBox.querySelector('.courses-list');
let newCourseNode = createCourseNode(courseId);
coursesList.appendChild(newCourseNode);

// Update student courses to reflect this change
if (!studentCourses.includes(courseId)) {
    studentCourses.push(courseId);
}
} else {
alert(`Cannot add ${courseId} to ${capitalize(semester.season)} ${semester.year}`);
}
}


function dropCourse_offline(event) { 
event.preventDefault();

// Find the closest parent that is a semester-box
let semesterBox = event.target.closest('.semester-box');

// If no valid semester-box is found, return early
if (!semesterBox) {
return;
}

let courseId = event.dataTransfer.getData("text");
let semesterIndex = semesterBox.dataset.index;
let semester = semesters[semesterIndex];
let course = courses.find(c => c.id === courseId);

// Check if the course can be added to this semester
if (course.semester.includes(semester.season) && check(course.id, semesterIndex)) {
// Remove the course from wherever it was before
let existingCourseNode = document.querySelector(`[data-course-id="${courseId}"]`);
if (existingCourseNode) {
    existingCourseNode.parentNode.removeChild(existingCourseNode);
}

// Add the course to the new semester
let coursesList = semesterBox.querySelector('.courses-list');
let newCourseNode = createCourseNode(courseId);
coursesList.appendChild(newCourseNode);

// Update student courses to reflect this change
if (!studentCourses.includes(courseId)) {
    studentCourses.push(courseId);
}
} else {
alert(`Cannot add ${courseId} to ${capitalize(semester.season)} ${semester.year}`);
}
}



function dropCourse(event) { 
    event.preventDefault();

    let semesterBox = event.target.closest('.semester-box');
    if (!semesterBox) return;

    let courseId = event.dataTransfer.getData("text");
    let semesterIndex = semesterBox.dataset.index;
    let semester = semesters[semesterIndex];
    let course = courses.find(c => c.id === courseId);

    if (course.semester.includes(semester.season) && check(course.id, semesterIndex)) {
        let existingCourseNode = document.querySelector(`[data-course-id="${courseId}"]`);
        if (existingCourseNode) {
            existingCourseNode.parentNode.removeChild(existingCourseNode);
        }

        let coursesList = semesterBox.querySelector('.courses-list');
        let newCourseNode = createCourseNode(courseId);
        coursesList.appendChild(newCourseNode);

        // Update server-side studentCourses
        updateStudentCoursesOnServer(courseId, 'add');
    } else {
        alert(`Cannot add ${courseId} to ${capitalize(semester.season)} ${semester.year}`);
    }
}

function updateStudentCoursesOnServer(courseId, action) {
    fetch('/update-course', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId, action }),
    })
    .then(response => response.json())
    .then(data => {
        if (!data.success) {
            alert('Failed to update student courses');
        }
    })
    .catch(error => {
        console.error('Error updating courses:', error);
    });
}
