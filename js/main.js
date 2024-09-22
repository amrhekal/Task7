// selectors
const inputs = document.querySelectorAll("form input");
const selects = document.querySelectorAll("form select");
const form = document.querySelector("form");
const btnUpdate = document.getElementById("update");
const btnSubmit = document.getElementById("submit");
const cardsContainer = document.querySelector("#cards-container");
const toastLiveExample = document.getElementById("liveToast");
const toastBody = document.getElementById("toastBody");
const toastHeader = document.getElementById("toastHeader");
// =====================================================
// =====================================================
let applications = JSON.parse(localStorage.getItem("applications")) || [];
let editIndex = "";
createCards(applications);

//create new card
form.addEventListener("submit", (e) => {
 e.preventDefault();

 if (validation(inputs, selects)) {
  let application = getCvData();
  applications.push(application);
  setArrayLocal(applications);
  createCards(applications);
  form.reset();
  showToast("You have successfully added the CV.", "bg-primary");
 } else {
  showToast(
   "You must fill in all the fields and make valid selections from the  dropdown lists.",
   "bg-warning"
  );
 }
});

// update card
btnUpdate.addEventListener("click", () => {
 if (validation(inputs, selects)) {
  let application = getCvData();
  applications[editIndex] = application;
  setArrayLocal(applications);
  createCards(applications);
  form.reset();
  btnUpdate.classList.add("d-none");
  btnSubmit.classList.remove("d-none");
  showToast("You have successfully updated the CV.", "bg-success");
  editIndex = "";
 } else {
  showToast(
   "You must fill in all the fields and make valid selections from the  dropdown lists.",
   "bg-warning"
  );
 }
});

// validation
function validation(inputs, selects) {
 for (let i = 0; i < inputs.length; i++) {
  if (inputs[i].value.trim() == "") {
   return false;
  }
 }
 for (let i = 0; i < selects.length; i++) {
  if (selects[i].value == "Open this select menu") {
   return false;
  }
 }
 return true;
}

// get CV Data
function getCvData() {
 return {
  firstName: inputs[0].value.trim(),
  lastName: inputs[1].value.trim(),
  age: inputs[2].value.trim(),
  phone: inputs[3].value.trim(),
  address: inputs[4].value.trim(),
  degree: inputs[5].value.trim(),
  salary: inputs[6].value.trim(),
  email: inputs[7].value.trim(),
  experience: inputs[8].value.trim(),
  img: inputs[9].value.trim(),
  gender: selects[0].value,
  jobTitle: selects[1].value,
  maritalStatus: selects[2].value,
 };
}

// set new array in localstorge
function setArrayLocal(applications) {
 localStorage.setItem("applications", JSON.stringify(applications));
}

// create cards on page
function createCards(applications) {
 cardsContainer.innerHTML = "";
 applications.forEach((application, index) => {
  cardsContainer.innerHTML += `
  <div class="card m-2" style="width: 18rem">
 <img src=${
  application.gender == "male" ? "./images/male.png" : "./images/female.png"
 }  class="card-img-top" alt="..." />
 <div class="card-body d-flex flex-wrap">
  <h5 class="col-12">
  ${application.firstName} ${application.lastName}
  </h5>
  <p class="col-12">Gender: ${application.gender}</p>
  <p class="col-12">Age: ${application.age}</p>
  <p class="col-12">Phone: ${application.phone}</p>
  <p class="col-12">Address: ${application.address}</p>
  <p class="col-12">Degree: ${application.degree}</p>
  <p class="col-12">JobTitle: ${application.jobTitle}</p>
  <p class="col-12">Salary: ${application.salary}</p>
  <p class="col-12">Email: ${application.email}</p>
  <p class="col-12">Marital Status: ${application.maritalStatus}</p>
  <i class="fa-solid fa-pen-to-square text-warning fs-2" role="button" onclick="editCard(${index})"></i>
  <i class="fa-solid fa-trash text-danger fs-2 ms-auto" role="button" onclick= "deleteCard(${index})" ></i>
 </div>
</div>
`;
 });
}

// Delete Card
function deleteCard(index) {
 applications.splice(index, 1);
 createCards(applications);
 setArrayLocal(applications);
 showToast("You have successfully deleted the CV.", "bg-danger");
}

// Edit Card
function editCard(index) {
 inputs[0].value = applications[index].firstName;
 inputs[1].value = applications[index].lastName;
 inputs[2].value = applications[index].age;
 inputs[3].value = applications[index].phone;
 inputs[4].value = applications[index].address;
 inputs[5].value = applications[index].degree;
 inputs[6].value = applications[index].salary;
 inputs[7].value = applications[index].email;
 inputs[8].value = applications[index].experience;
 inputs[9].value = applications[index].img;

 selects[0].value = applications[index].gender;
 selects[1].value = applications[index].jobTitle;
 selects[2].value = applications[index].maritalStatus;
 btnUpdate.classList.remove("d-none");
 btnSubmit.classList.add("d-none");
 editIndex = index;
}

// show toast
function showToast(message, myStyle) {
 const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
 toastBootstrap.show();
 toastHeader.classList.remove(
  "bg-danger",
  "bg-success",
  "bg-primary",
  "bg-warning"
 );
 toastHeader.classList.add(myStyle);
 toastBody.innerHTML = message;
}
