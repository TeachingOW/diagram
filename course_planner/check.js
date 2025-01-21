/*const courses = [
    { id: "CS2510", name: "Computer Programming I", minGrade: "C", semester: ["fall", "spring"], psets: { type: "and", list: ["MA1020"] } },
    { id: "CS2511", name: "Computer Programming II", minGrade: "C", semester: ["fall", "spring"], psets: { type: "and", list: ["CS2510"] } },
    { id: "CS3620", name: "Computer Architecture I", minGrade: "C", semester: ["fall", "spring"], psets: { type: "and", list: ["CS2511", "MA3030"] } },
    { id: "CS3810", name: "Data Structures and Algorithms", minGrade: "C", semester: ["fall", "spring"], psets: { type: "and", list: ["CS2511", "MA3030"] } },
    { id: "CS3910", name: "Java and Object-Oriented Programming", minGrade: "C", semester: ["fall", "spring"], psets: { type: "and", list: ["CS3810"] } },
    { id: "CS4501", name: "Software Engineering", minGrade: "C", semester: ["fall", "spring"], psets: { type: "elective", count: 1, list: [{type: "and", list: ["CS2511", "CS3810"] }, { type: "and", list: ["CS2511", "CS3611"] }] } },
    { id: "CS4550", name: "Database Management Systems", minGrade: "C", semester: ["fall", "spring"], psets: { type: "and", list: ["CS2511", "CS3810"] } },
    { id: "CS4720", name: "Internet and Web Technologies", minGrade: "C", semester: ["fall", "spring"], psets: { type: "and", list: ["CS4550"] } },
    { id: "CS5910", name: "System Design & Implementation", minGrade: "C", semester: ["fall", "spring"], psets: { type: "and", list: ["CS4501", "CS4720"] } },
    { id: "MA2090", name: "Precalculus", minGrade: "C", semester: ["fall", "spring"], psets: {} },
    { id: "MA2310", name: "Calculus & Analytic Geometry I", minGrade: "C", semester: ["fall", "spring"], psets: { type: "and", list: ["MA2090"] } },
    { id: "MA3030", name: "Discrete Mathematics", minGrade: "C", semester: ["fall", "spring"], psets: { type: "elective", count: 1, list: ["MA2090", "MA2080"] } },
    { id: "MA3210", name: "Introduction to Probability and Statistics", minGrade: "C", semester: ["fall", "spring"], psets: { type: "elective", count: 1, list: ["MA2310", "MA2300"] } },
    { id: "MA3160", name: "Linear Algebra", minGrade: "C", semester: ["fall", "spring"], psets: { type: "elective", count: 1, list: ["MA2310", "MA2300"] } },
    { id: "MA4100", name: "Number Theory", minGrade: "C", semester: ["as needed"], psets: { type: "and", list: ["MA3030"] } },
    { id: "CS4400", name: "Artificial Intelligence", minGrade: "C", semester: ["fall", "spring"], psets: { type: "and", list: ["CS3810", "MA3210"] } },
    { id: "CS4705", name: "Introduction to Computer Security", minGrade: "C", semester: ["fall", "spring"], psets: { type: "and", list: ["CS3810"] } },
    { id: "CS4710", name: "Applied Cryptography", minGrade: "C", semester: ["fall", "spring"], psets: { type: "and", list: ["CS4705", "MA4100"] } },
    { id: "CS5610", name: "Operating Systems", minGrade: "C", semester: ["fall", "spring"], psets: { type: "and", list: ["CS3620", "CS3810"] } },
    { id: "CS5710", name: "Computer Networks", minGrade: "C", semester: ["fall", "spring"], psets: { type: "and", list: [{type: "elective", count: 1, list: ["CS4501", "CS4550"]}, {type: "elective", count: 1, list: ["MA3210", "MA2000"]}] } },
    { id: "CS5720", name: "Advanced Java Programming and Applications", minGrade: "C", semester: ["fall", "spring"], psets: { type: "and", list: ["CS3810", "CS4550", "CS5710"] } },
    { id: "CS5730", name: "Computer Network Security", minGrade: "C", semester: ["fall", "spring"], psets: { type: "and", list: ["CS4710", "CS5710"] } },
    { id: "CS5810", name: "Data Mining I", minGrade: "C", semester: ["fall", "spring"], psets: { type: "and", list: [] } } // No specific prerequisites were provided for this course
];

// Example usage
const studentCourses = [
    { id: "CS2511", semester: "fall 2022", grade: "B" },
    { id: "CS3810", semester: "spring 2023", grade: "D" },
    { id: "MA3030", semester: "spring 2022", grade: "C" },
    { id: "CS3810", semester: "summer 2023", grade: "_" },
    { id: "MA2310", semester: "fall 2023", grade: "A" },
    { id: "CS4501", semester: "fall 2023", grade: "_" },
];
*/
function satisfyPrerequisites(studentCourses, coursesInfo) {
    const violations = {}; // To store violations per semester
    const eligibleCourses = [];

    // Iterate through all courses in the info
    coursesInfo.forEach(course => {
        const courseSemesters = course.semester;

        // Check if the course is offered in the semesters of the student's courses
        const isOffered = courseSemesters.some(sem => {
            //console.log(sem);
            return studentCourses.some(({ id, semester }) => {
               // console.log( id +":"+semester);
                
                return semester.startsWith(sem.split(" ")[0]) ;
            });
        });

        if (!isOffered) {
            return; // Not offered in the current semester
        }

        // Check prerequisites
        const prerequisites = course.psets;

        if (!prerequisites || Object.keys(prerequisites).length === 0) {
            eligibleCourses.push(course);
            return; // No prerequisites
        }

        const violationList = []; // Track violations for this course
        const isEligible = checkPrerequisites(prerequisites, course, studentCourses, violationList);

        // Record violations if any
        if (violationList.length > 0) {
            violationList.forEach(violation => {
                const [semName, year] = course.semester[0].split(" ");
                if (!violations[`${semName} ${year}`]) {
                    violations[`${semName} ${year}`] = [];
                }
                violations[`${semName} ${year}`].push(violation);
            });
        } else if (isEligible) {
            eligibleCourses.push(course);
        }
    });

    return { eligibleCourses, violations };
}
function isObject(value) {
    return typeof value === 'object' && value !== null;
  }
  const seasonOrder = {
    "spring": 1,
    "summer": 2,
    "fall": 3,
    "winter": 4
};

// Function to compare two semesters
function isSemesterGreater(semesterA, semesterB) {
    // Split the semester into season and year
    if (semesterA==null)return false;
    if (semesterB==null)return false;
    const [seasonA, yearA] = semesterA.split(" ");
    const [seasonB, yearB] = semesterB.split(" ");

    // Compare years first
    if (parseInt(yearA) > parseInt(yearB)) {
        return true; // semesterA is in a later year
    } else if (parseInt(yearA) < parseInt(yearB)) {
        return false; // semesterB is in a later year
    }

    // If the years are the same, compare seasons
    return seasonOrder[seasonA.toLowerCase()] > seasonOrder[seasonB.toLowerCase()];
}

function findPrereqWithEarlierSemester(currentSemester, prereqId, studentCourse, mingrade) {
    for (let studentCourse of studentCourses) {
        if (studentCourse.id === prereqId && isSemesterGreater(currentSemester, studentCourse.semester)) {
            if (checkGrade(studentCourse.grade, mingrade))
                 return studentCourse; // Prerequisite found in an earlier semester
        }
    }
    return null; // No prerequisite found
}

function    checkPreq(preq, course,semster, coursesInfo, studentCourses, violationList) {
    //console.log("----------------check----------------");
    //console.log(preq);
    if(isObject(preq)){
       // console.log("------------Object"+preq);
        return  checkPrerequisites(preq, course, semster, coursesInfo, studentCourses, violationList);

    } else 
    if (Array.isArray(preq)) {
        console.log("------------Array"+preq);
        // For nested prerequisites, check each prerequisite group
        return checkPrerequisites(preq[0], course,semster, coursesInfo, studentCourses, violationList); 
    } else {
        const requiredCourse = courses.find(c => c.id === preq);
        if (requiredCourse==null) return false;
        const studentInfo=findPrereqWithEarlierSemester(semster,preq,studentCourses, requiredCourse.minGrade );

        //const studentInfo = studentCourses.find(sc => sc.id === preq && isSemesterGreater(semster,sc.semster));
        //console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<requiredCourse>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        //console.log(requiredCourse);

        if (studentInfo==null)  {                    
            violationList.push(`${course.name} requires ${preq} (Grade: ${requiredCourse.minGrade}), `);
            return false;
        }
        return true;
    }
}
// Recursive function to check prerequisites

function checkPrerequisites(prerequisites, course,semster, coursesInfo,  studentCourses, violationList) {
    if (prerequisites.type === "and") {
        // Check if all prerequisites are satisfied
        return prerequisites.list.every(preq => {
            // need to be fixed
            return checkPreq(preq,course,semster, coursesInfo, studentCourses, violationList);
        });
    } else if (prerequisites.type === "elective") {
        // For elective, check if at least one of the prerequisites is satisfied
        const countNeeded = prerequisites.count;
        const satisfiedCount = prerequisites.list.filter(preq => {
            return checkPreq(preq,course,semster, coursesInfo, studentCourses, violationList);
           
        }).length;

        return satisfiedCount >= countNeeded; // Ensure enough electives are satisfied
    }

    return false; // Default case if type is unrecognized
}

// Helper function to compare grades
function checkGrade(studentGrade, requiredGrade) {
    const grades = { "_":5,"A": 4, "B": 3, "C": 2, "D": 1, "F": 0 }; // Grade scale
    return grades[studentGrade] >= grades[requiredGrade];
}


function checkStudentCourses(studentCourses, coursesInfo) {
    const violations = {}; // To store violations per semester

    // Iterate through each course taken by the student
    studentCourses.forEach(({ id, semester, grade }) => {
        const courseInfo = coursesInfo.find(course => course.id === id);

        if (!courseInfo) return; // Skip if course info not found
        if(grade!='_') return;
        const prerequisites = courseInfo.psets;
        const violationList = []; // Track violations for this course
        //console.log(prerequisites);
        // Check if prerequisites are satisfied
        var check=checkPrerequisites(prerequisites, courseInfo, semester, coursesInfo, studentCourses, violationList);
        console.log(check);
        if (!check) {
            // Record violations if any
            const [semName, year] = semester.split(" ");
            if (!violations[`${semName} ${year}`]) {
                violations[`${semName} ${year}`] = [];
            }
            violations[`${semName} ${year}`].push(...violationList);
        }
    });

    return violations;
}


const violations = checkStudentCourses(studentCourses, courses);

console.log("Violations:", violations);