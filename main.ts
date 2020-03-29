import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { Student } from './student.js';

import { dataStudent } from './dataStudents.js';

//ATRIBUTOS Y CONSTANTES DE LOS CURSOS
let minCreditsFilter: number = 0;
let maxCreditsFilter: number = Number.MAX_VALUE;
let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;
const inputMinCreditBox: HTMLInputElement = <HTMLInputElement> document.getElementById("min-cred-box")!;
const inputMaxCreditBox: HTMLInputElement = <HTMLInputElement> document.getElementById("max-cred-box")!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;

//ATRIBUTOS Y CONSTANTES DEL ESTUDIANTE
let nameFilter: string = '';
let studentName: HTMLElement = document.getElementById('studentName')!;
let studentAvatar: HTMLElement = document.getElementById('studentAvatar')!;
let studentInfoTBody:HTMLElement = document.getElementById('studentInfo')!;

renderStudent(dataStudent);
applyFilterByName();

btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyFilterByCredits();

totalCreditElm.innerHTML = `Total créditos ${getTotalCredits(dataCourses)}`

//METODOS DE LOS CURSOS
function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
} 

function applyFilters(){
  applyFilterByName();
  applyFilterByCredits();
}
function applyFilterByCredits(){
  let min = inputMinCreditBox.valueAsNumber;
  min = (isNaN(min)) ? 0 : min;
  minCreditsFilter = min;
  let max = inputMaxCreditBox.valueAsNumber;
  max = (isNaN(max)) ? Number.MAX_VALUE : max;
  maxCreditsFilter = max;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByCredits(min,max,dataCourses);
  coursesFiltered = searchCourseByName(nameFilter,coursesFiltered);
  renderCoursesInTable(coursesFiltered);  
}

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  nameFilter = text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  let coursesFiltered2: Course[] = searchCourseByCredits(minCreditsFilter,maxCreditsFilter,coursesFiltered);
  renderCoursesInTable(coursesFiltered2);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? courses : courses.filter( c => 
    c.name.match(nameKey));
}

function searchCourseByCredits(minCredits: number, maxCredits: number, courses: Course[]){
    return courses.filter(c =>  minCredits<=c.credits && c.credits<=maxCredits)
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
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
function renderStudent(student: Student): void{
    console.log('Desplegando información del estudiante');
    studentName.innerText = student.name;
    studentAvatar.setAttribute('src', student.avatar);
    
    let trElemnt = document.createElement("tr");
    trElemnt.innerHTML = `<td> Código </td>
                          <td> ${student.code}</td>`;
    studentInfoTBody.appendChild(trElemnt);
    
    trElemnt = document.createElement("tr");
    trElemnt.innerHTML = `<td> Cédula </td>
                          <td> ${student.id}</td>`;
    studentInfoTBody.appendChild(trElemnt);
  
    trElemnt = document.createElement("tr");
    trElemnt.innerHTML = `<td> Edad </td>
                          <td> ${student.age} años</td>`;
    studentInfoTBody.appendChild(trElemnt);
  
    trElemnt = document.createElement("tr");
    trElemnt.innerHTML = `<td> Dirección </td>
                          <td> ${student.address}</td>`;
    studentInfoTBody.appendChild(trElemnt);
  
    trElemnt = document.createElement("tr");
    trElemnt.innerHTML = `<td> Teléfono </td>
                          <td> ${student.phone}</td>`;
    studentInfoTBody.appendChild(trElemnt);
  }