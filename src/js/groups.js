const times = [
  { id: 1, start: "9:00", end: "10:20" },
  { id: 2, start: "10:30", end: "11:50" },
  { id: 3, start: "14:00", end: "15:20" },
  { id: 4, start: "15:30", end: "16:50" },
  { id: 5, start: "17:00", end: "18:20" },
];

const groups = JSON.parse(localStorage.getItem("groups")) || [];
const groupsGrid = document.getElementById("groupsGrid");

const rendergroups = (groups = []) => {
  groupsGrid.innerHTML = "";
  if (!groups.length) {
    groupsGrid.innerHTML = "groups topilmadi";
  }
  groups.forEach((group) => {
    groupsGrid.innerHTML += `<div class="col-span-4 bg-[#f5f5f5] rounded-lg p-3">
          <p class="font-[700] text-[20px]">${group.name}</p>
      <div class="flex justify-between items-center">
        <p class="font-[700]">Teacher:${group.teacher.name}</p>
        <button onclick="edit_action_group(${
          group.id
        })"><img src="./assest/🦆 icon _edit 2_.png" alt=""></button>
    </div>
    <p class="text-[#999]">Days:${group.days == 1 ? "odd" : "even"} | Time:${
      group.time.start
    }-${group.time.end}</p>
     <p class="text-[#999]">Room:${group.room.name}</p>
  
</div>`;
  });
};
rendergroups(groups);
const groups_search = document.getElementById("groups_search");
groups_search.addEventListener("input", () => {
  const inp_val = groups_search.value;
  const filtered_groups = groups.filter((t) =>
    t.name.toLocaleLowerCase().includes(inp_val.toLocaleLowerCase())
  );
  rendergroups(filtered_groups);
});

const room_select = document.getElementById("select_3");
const rooms = JSON.parse(localStorage.getItem("rooms"));
room_select.innerHTML = "";
rooms.forEach((room) => {
  room_select.innerHTML += `<option value=${room.id}>${room.name}</option>`;
});
const time_select = document.getElementById("select_4");
time_select.innerHTML = "";
times.forEach((time) => {
  time_select.innerHTML += `<option value=${time.id}>${time.start}-${time.end}</option>`;
});
const teacher_select = document.getElementById("select_1");
const teachers = JSON.parse(localStorage.getItem("teachers"));
teacher_select.innerHTML = "";
teachers.forEach((teacher) => {
  teacher_select.innerHTML += `<option value=${teacher.id} >${teacher.name}</option>`;
});
const group_name = document.getElementById("group_name");
const add_group_btn = document.getElementById("button_3");
const days_select = document.getElementById("select_2");
add_group_btn.addEventListener("click", () => {
  if (!group_name.value.length) {
    alert("Group name kiritilmadi");
    return;
  }
  const new_group = {};
  new_group.id = Date.now();
  new_group.name = group_name.value;
  new_group.days = +days_select.value;
  const finded_teacher = teachers.find((t) => t.id == teacher_select.value);
  new_group.teacher = finded_teacher;
  const finded_time = times.find((t) => t.id == time_select.value);
  new_group.time = finded_time;
  const finded_room = rooms.find((r) => r.id == room_select.value);
  new_group.room = finded_room;
  groups.push(new_group);
  localStorage.setItem("groups", JSON.stringify(groups));
  rendergroups(groups);
});

const groups_edit_btn = document.getElementById("groups_edit_btn");
const groups_delete_btn = document.getElementById("groups_delete_btn");
const edit_group_name = document.getElementById("edit_group_name");
const teacher_full_name_select = document.getElementById("select_5");
const group_edit_days = document.getElementById("select_6");
const group_edit_room = document.getElementById("select_7");
const group_edit_time = document.getElementById("select_8");
let group_id = null;
let group_index = null;

const edit_action_group = (id) => {
  group_id = id;
  group_index = groups.findIndex((g) => g.id == id);
  const group = groups[group_index];
  edit_group_name.value = group.name;
  teacher_full_name_select.innerHTML = `<option value=${group.teacher.id}>${group.teacher.name}</option>`;
  teachers.forEach((t) => {
    if (t.id != group.teacher.id) {
      teacher_full_name_select.innerHTML += `<option value=${t.id}>${t.name}</option>`;
    }
  });
  if (group.days == 1) {
    group_edit_days.innerHTML = `
    <option value=${1}>Odd</option>
       <option value=${2}>Even</option>
    `;
  } else {
    group_edit_days.innerHTML = `
    <option value=${2}>Even</option>
       <option value=${1}>Odd</option>
    `;
  }
  group_edit_room.innerHTML = `<option value=${group.room.id}>${group.room.name}</option>`;
  rooms.forEach((room) => {
    if (room.id != group.room.id) {
      group_edit_room.innerHTML += `<option value=${room.id}>${room.name}</option>`;
    }
  });
  group_edit_time.innerHTML = `<option value=${group.time.id}>${group.time.start}-${group.time.end}</option>`;
  times.forEach((time) => {
    if (time.id != group.time.id) {
      group_edit_time.innerHTML += `<option value=${time.id}>${time.start}-${time.end}</option>`;
    }
  });
};

groups_edit_btn.addEventListener("click", () => {
  if (!group_index && group_index !== 0) {
    alert("group tanlang!");
    return;
  }
  groups[group_index].name = edit_group_name.value;
  const finded_teacher = teachers.find(
    (t) => t.id == teacher_full_name_select.value
  );
  groups[group_index].teacher = finded_teacher;
  groups[group_index].days = +group_edit_days.value;
  console.log(group_edit_room.value);
  const finded_room = rooms.find((r) => r.id == group_edit_room.value);
  console.log(finded_room);
  groups[group_index].room = finded_room;
  const finded_time = times.find((t) => t.id == group_edit_time.value);
  groups[group_index].time = finded_time;

  localStorage.setItem("groups", JSON.stringify(groups));
  rendergroups(groups);

  edit_group_name.value = "";
  teacher_full_name_select.value = "";
  group_edit_days.value = "";
  group_edit_time.value = "";
  group_edit_room.value = "";
});

groups_delete_btn.addEventListener("click", () => {
  if (!group_index && group_index !== 0) {
    alert("group tanlang!");
    return;
  }
  const filtered_groups = groups.filter((g) => g.id != group_id);
  localStorage.setItem("groups", JSON.stringify(filtered_groups));
  rendergroups(filtered_groups);

  edit_group_name.value = "";
  teacher_full_name_select.value = "";
  group_edit_days.value = "";
  group_edit_time.value = "";
  group_edit_room.value = "";
});
