import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudents.js';
//ATRIBUTOS Y CONSTANTES DE LOS CURSOS
var minCreditsFilter = 0;
var maxCreditsFilter = Number.MAX_VALUE;
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
var inputMinCreditBox = document.getElementById("min-cred-box");
var inputMaxCreditBox = document.getElementById("max-cred-box");
var btnfilterByCredits = document.getElementById("button-filterByCredits");
//ATRIBUTOS Y CONSTANTES DEL ESTUDIANTE
var nameFilter = '';
var studentName = document.getElementById('studentName');
var studentAvatar = document.getElementById('studentAvatar');
var studentInfoTBody = document.getElementById('studentInfo');
renderStudent(dataStudent);
applyFilterByName();
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByCredits(); };
totalCreditElm.innerHTML = "Total cr\u00E9ditos " + getTotalCredits(dataCourses);
//METODOS DE LOS CURSOS
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function applyFilters() {
    applyFilterByName();
    applyFilterByCredits();
}
function applyFilterByCredits() {
    var min = inputMinCreditBox.valueAsNumber;
    min = (isNaN(min)) ? 0 : min;
    minCreditsFilter = min;
    var max = inputMaxCreditBox.valueAsNumber;
    max = (isNaN(max)) ? Number.MAX_VALUE : max;
    maxCreditsFilter = max;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(min, max, dataCourses);
    coursesFiltered = searchCourseByName(nameFilter, coursesFiltered);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    nameFilter = text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    var coursesFiltered2 = searchCourseByCredits(minCreditsFilter, maxCreditsFilter, coursesFiltered);
    renderCoursesInTable(coursesFiltered2);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? courses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByCredits(minCredits, maxCredits, courses) {
    return courses.filter(function (c) { return minCredits <= c.credits && c.credits <= maxCredits; });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
//METODO DEL ESTUDIANTE
function renderStudent(student) {
    console.log('Desplegando información del estudiante');
    studentName.innerText = student.name;
    studentAvatar.setAttribute('src', student.avatar);
    var trElemnt = document.createElement("tr");
    trElemnt.innerHTML = "<td> C\u00F3digo </td>\n                          <td> " + student.code + "</td>";
    studentInfoTBody.appendChild(trElemnt);
    trElemnt = document.createElement("tr");
    trElemnt.innerHTML = "<td> C\u00E9dula </td>\n                          <td> " + student.id + "</td>";
    studentInfoTBody.appendChild(trElemnt);
    trElemnt = document.createElement("tr");
    trElemnt.innerHTML = "<td> Edad </td>\n                          <td> " + student.age + " a\u00F1os</td>";
    studentInfoTBody.appendChild(trElemnt);
    trElemnt = document.createElement("tr");
    trElemnt.innerHTML = "<td> Direcci\u00F3n </td>\n                          <td> " + student.address + "</td>";
    studentInfoTBody.appendChild(trElemnt);
    trElemnt = document.createElement("tr");
    trElemnt.innerHTML = "<td> Tel\u00E9fono </td>\n                          <td> " + student.phone + "</td>";
    studentInfoTBody.appendChild(trElemnt);
}
