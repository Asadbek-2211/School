const students = JSON.parse(localStorage.getItem("students")) || [];

const students_add = document.getElementById("students_add");
const students_phone = document.getElementById("students_phone");
const studentsGrid = document.getElementById("studentsGrid");
const button_4 = document.getElementById("button_4");
const students_select = document.getElementById("students_select");
const students_select_2 = document.getElementById("students_select_2");
const groups = JSON.parse(localStorage.getItem("groups"));
button_4.addEventListener("click", () => {
  const students_name = students_add.value;
  const students_weast = students_phone.value;
  if (!students_name.length || !students_weast.length) {
    alert("name yoki student numbers yozilmagan");
    return;
  }
  const finded_group = groups.find((g) => g.id == students_select.value);
  const students_obj = {
    id: Date.now(),
    name: students_name,
    group: finded_group,
    phone: students_weast,
  };
  students.push(students_obj);
  localStorage.setItem("students", JSON.stringify(students));
  renderStudents(students);
  students_add.value = "";
  students_phone.value = "";
});

const renderStudents = (students = []) => {
  studentsGrid.innerHTML = "";
  if (!students.length) {
    studentsGrid.innerHTML = "Student topilmadi";
  }
  students.forEach((student) => {
    studentsGrid.innerHTML += `<div class="col-span-4 bg-[#f5f5f5] rounded-lg p-3">
          <div class="flex justify-between items-center">
          <p class="font-[700]">${student.name}</p>
          <button onclick="edit_action_students(${student.id})"><img src="./assest/🦆 icon _edit 2_.png" alt=""></button>
         </div>
         <p class="text-[#999]">Phone:${student.phone}</p>
               <p class="text-[#999]">Group:${student.group?.name}</p>
          </div>`;
  });
};
renderStudents(students);
const students_search = document.getElementById("students_search");
students_search.addEventListener("input", () => {
  const inp_val = students_search.value;
  const filtered_students = students.filter((t) =>
    t.name.toLocaleLowerCase().includes(inp_val.toLocaleLowerCase())
  );
  renderStudents(filtered_students);
});
const students_edit_name = document.getElementById("students_edit_name");
const students_edit_phone = document.getElementById("students_edit_phone");
const students_edit_btn = document.getElementById("students_edit_btn");
const students_delete_btn = document.getElementById("students_delete_btn");
let students_index = null;
let students_id = null;

const edit_action_students = (id) => {
  students_id = id;
  students_index = students.findIndex((t) => t.id == id);
  students_edit_name.value = students[students_index].name;
  students_edit_phone.value = students[students_index].phone;
  students_select_2.innerHTML = `<option value=${students[students_index].group.id}>${students[students_index].group.name}</option>`;
  groups?.forEach((g) => {
    if (g.id != students[students_index].group.id)
      students_select_2.innerHTML += `<option value=${g.id}>${g.name}</option>`;
  });
};
students_edit_btn.addEventListener("click", () => {
  if (!students_index && students_index !== 0) {
    alert("student tanlang!");
    return;
  }
  students[students_index].name = students_edit_name.value;
  students[students_index].phone = students_edit_phone.value;
  const finded_group = groups.find((g) => g.id == students_select_2.value);
  students[students_index].group = finded_group;

  localStorage.setItem("students", JSON.stringify(students));
  renderStudents(students);
  students_edit_name.value = "";
  students_edit_phone.value = "";
});
students_delete_btn.addEventListener("click", () => {
  if (!students_id) {
    alert("student tanlang");
    return;
  }
  const filtered_students = students.filter((t) => t.id !== students_id);
  renderStudents(filtered_students);
  localStorage.setItem("students", JSON.stringify(filtered_students));
  students_edit_name.value = "";
  students_edit_phone.value = "";
});
groups?.forEach((g) => {
  students_select.innerHTML += `<option value=${g.id}>${g.name}</option>`;
});
