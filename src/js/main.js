const teacher = JSON.parse(localStorage.getItem("teachers")) || [];

const teacher_add = document.getElementById("teacher_add");
const teacher_phone = document.getElementById("teacher_phone");
const teachersGrid = document.getElementById("teachersGrid");
const button_1 = document.getElementById("button_1");
let teacher_index = null;
// add teacher
button_1.addEventListener("click", () => {
  const teacher_name = teacher_add.value;
  const phone = teacher_phone.value;
  if (!teacher_name.length || !phone.length) {
    alert("name yoki phone yozilmagan");
    return;
  }
  const teacher_obj = {
    id: Date.now(),
    name: teacher_name,
    phone: phone,
  };
  teacher.push(teacher_obj);
  localStorage.setItem("teachers", JSON.stringify(teacher));
  renderTeachers(teacher);
  teacher_add.value = "";
  teacher_phone.value = "";
});
// render teacher
const renderTeachers = (teachers = []) => {
  window.teachersGrid.innerHTML = "";
  if (!teachers.length && teacher_index !== 0) {
    teachersGrid.innerHTML = "Teacher topilmadi";
  }
  teachers.forEach((teacher) => {
    teachersGrid.innerHTML += `<div class="col-span-4 bg-[#f5f5f5] rounded-lg p-3">
    <div class="flex justify-between items-center">
        <p class="font-[700]">${teacher.name}</p>
        <button onclick="edit_action(${teacher.id})"><img src="./assest/🦆 icon _edit 2_.png" alt=""></button>
    </div>
    <p class="text-[#999]">Phone:${teacher.phone}</p>
  
</div>`;
  });
};
renderTeachers(teacher);
// search teachers
const teacher_search = document.getElementById("teacher_search");
teacher_search.addEventListener("input", () => {
  const inp_val = teacher_search.value;
  const filtered_teachers = teacher.filter((t) =>
    t.name.toLocaleLowerCase().includes(inp_val.toLocaleLowerCase())
  );
  renderTeachers(filtered_teachers);
});
const teacher_edit_name = document.getElementById("teacher_edit_name");
const teacher_edit_phone = document.getElementById("teacher_edit_phone");
const teacher_edit_btn = document.getElementById("teacher_edit_btn");
const teacher_delete_btn = document.getElementById("teacher_delete_btn");

let teacher_id = null;
const edit_action = (id) => {
  teacher_id = id;
  teacher_index = teacher.findIndex((t) => t.id == id);
  teacher_edit_name.value = teacher[teacher_index].name;
  teacher_edit_phone.value = teacher[teacher_index].phone;
};
// edit teachers
teacher_edit_btn.addEventListener("click", () => {
  if (!teacher_index && teacher_index !== 0) {
    alert("Teacherni tanlang!");
    return;
  }
  teacher[teacher_index].name = teacher_edit_name.value;
  teacher[teacher_index].phone = teacher_edit_phone.value;
  localStorage.setItem("teachers", JSON.stringify(teacher));
  renderTeachers(teacher);
  teacher_edit_name.value = "";
  teacher_edit_phone.value = "";
});
// delete techers
teacher_delete_btn.addEventListener("click", () => {
  if (!teacher_id) {
    alert("Teacherni tanlang");
    return;
  }
  const filtered_teachers = teacher.filter((t) => t.id !== teacher_id);
  localStorage.setItem("teachers", JSON.stringify(filtered_teachers));
  renderTeachers(filtered_teachers);
});
