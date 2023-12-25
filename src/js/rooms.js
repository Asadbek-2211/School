const rooms = JSON.parse(localStorage.getItem("rooms")) || [];

const rooms_add = document.getElementById("rooms_add");
const rooms_phone = document.getElementById("rooms_phone");
const roomsGrid = document.getElementById("roomsGrid");
const button_2 = document.getElementById("button_2");

button_2.addEventListener("click", () => {
  const rooms_name = rooms_add.value;
  const rooms_weast = rooms_phone.value;
  if (!rooms_name.length || !rooms_weast.length) {
    alert("name yoki student numbers yozilmagan");
    return;
  }
  const rooms_obj = {
    id: Date.now(),
    name: rooms_name,
    student_numbers: rooms_weast,
  };
  rooms.push(rooms_obj);
  localStorage.setItem("rooms", JSON.stringify(rooms));
  renderRooms(rooms);
  rooms_add.value = "";
  rooms_phone.value = "";
});

const renderRooms = (rooms = []) => {
  roomsGrid.innerHTML = "";
  if (!rooms.length) {
    roomsGrid.innerHTML = "rooms topilmadi";
  }
  rooms.forEach((room) => {
    roomsGrid.innerHTML += `<div class="col-span-4 bg-[#f5f5f5] rounded-lg p-3">
          <div class="flex justify-between items-center">
          <p class="font-[700]">${room.name}</p>
          <button onclick="edit_action_rooms(${room.id})"><img src="./assest/🦆 icon _edit 2_.png" alt=""></button>
         </div>
         <p class="text-[#999]">${room.student_numbers}</p>
          </div>`;
  });
};
renderRooms(rooms);
const rooms_search = document.getElementById("rooms_search");
rooms_search.addEventListener("input", () => {
  const inp_val = rooms_search.value;
  const filtered_rooms = rooms.filter((t) =>
    t.name.toLocaleLowerCase().includes(inp_val.toLocaleLowerCase())
  );
  renderRooms(filtered_rooms);
});
const rooms_edit_name = document.getElementById("rooms_edit_name");
const rooms_edit_phone = document.getElementById("rooms_edit_phone");
const rooms_edit_btn = document.getElementById("rooms_edit_btn");
const rooms_delete_btn = document.getElementById("rooms_delete_btn");
let rooms_index = null;
let rooms_id = null;
const edit_action_rooms = (id) => {
  rooms_id = id;
  rooms_index = rooms.findIndex((t) => t.id == id);
  rooms_edit_name.value = rooms[rooms_index].name;
  rooms_edit_phone.value = rooms[rooms_index].student_numbers;
};
rooms_edit_btn.addEventListener("click", () => {
  if (!rooms_index && rooms_index !== 0) {
    alert("rooms tanlang!");
    return;
  }
  rooms[rooms_index].name = rooms_edit_name.value;
  rooms[rooms_index].student_numbers = rooms_edit_phone.value;
  localStorage.setItem("rooms", JSON.stringify(rooms));
  renderRooms(rooms);
  rooms_edit_name.value = "";
  rooms_edit_phone.value = "";
});
rooms_delete_btn.addEventListener("click", () => {
  if (!rooms_id) {
    alert("rooms tanlang");
    return;
  }
  const filtered_rooms = rooms.filter((t) => t.id !== rooms_id);
  localStorage.setItem("rooms", JSON.stringify(filtered_rooms));
  renderRooms(filtered_rooms);
    rooms_edit_name.value = "";
    rooms_edit_phone.value = "";
});
