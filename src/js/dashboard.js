const dashboard_table = document.getElementById("dashboard_table");
const rooms = JSON.parse(localStorage.getItem("rooms"));
const rooms_row = document.getElementById("rooms_row");
const groups = JSON.parse(localStorage.getItem("groups"));
const days = document.querySelector("#days_select");

const findGroup = (time_id, room_id) => {
  const finded_group = groups.find(
    (g) => g.time.id == time_id && g.room.id == room_id && g.days == days.value
  );
  return finded_group;
};
const times = [
  { id: 1, start: "9:00", end: "10:20" },
  { id: 2, start: "10:30", end: "11:50" },
  { id: 3, start: "14:00", end: "15:20" },
  { id: 4, start: "15:30", end: "16:50" },
  { id: 5, start: "17:00", end: "18:20" },
];
const tbody = document.getElementById("tbody");
rooms.forEach((r) => {
  rooms_row.innerHTML += `<th class="border border-solid border-[#999] p-2">${r.name}</th>

        `;
});
const renderDashboard = () => {
  tbody.innerHTML = "";
  times.forEach((t) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td class="border border-solid border-[#999] p-2">${t.start} - ${t.end}</td>`;
    rooms.forEach((r) => {
      if (findGroup(t.id, r.id)) {
        tr.innerHTML += `<td class="border border-solid border-[#999] p-2 w-72">
           <div class="bg-[#F4E7CC] text-center font-bold p-5 rounded-md">
                        <p>${findGroup(t.id, r.id).name}</p>
                        <p>${findGroup(t.id, r.id).teacher.name}</p>
                    </div>
    </td>`;
      } else {
        tr.innerHTML += `<td class="border border-solid border-[#999] p-2">
    </td>`;
      }
    });
    tbody.appendChild(tr);
  });
};
renderDashboard();
const title = document.getElementById("title");
days.addEventListener("change", () => {
  if (days.value == 1) title.innerText = "Odd Days";
  else title.innerText = "Even Days";
  renderDashboard();
});
