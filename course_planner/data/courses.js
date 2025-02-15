const courses = [
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