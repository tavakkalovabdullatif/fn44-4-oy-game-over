import { cars as initialCars } from "./cars.js";
import {
  scrollToTopBtn,
  themeToggleBtn,
  addCarBtn,
  modal,
  root,
} from "./html-elements.js";

let cars = [];

function loadCars() {
  const saved = localStorage.getItem("cars");
  if (saved) {
    try {
      cars = JSON.parse(saved);
    } catch (e) {
      cars = [...initialCars];
    }
  } else {
    cars = [...initialCars];
  }
}

function saveCars() {
  localStorage.setItem("cars", JSON.stringify(cars));
}

// Dark mode toggle
themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }

  console.log("ishladi");
});

function closeModal() {
  modal.classList.add("hidden");
  modal.innerHTML = "";
}

function renderCars() {
  root.innerHTML = "";
  cars.forEach((car) => {
    const card = document.createElement("div");
    card.className =
      "bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-2 transition-colors duration-300";
    card.innerHTML = `
      
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${car.name}</h5>
      <p class="font-normal text-gray-700 dark:text-gray-400">${car.description}</p>
      <p class="font-normal text-gray-700 dark:text-gray-400">Davlati: <b>${car.country}</b></p>
      <p class="font-normal text-gray-700 dark:text-gray-400">Turkumi: <b>${car.category}</b></p>
      <p class="font-normal text-gray-700 dark:text-gray-400">Rangi: <b>${car.colorName}</b></p>
      


      <div class="flex justify-end gap-2 pt-2">

        <button  onclick="showDeleteModal(${car.id})" class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
          <span class="relative px-4 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
          <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </span>
        </button>




        <button onclick="showEditModal(${car.id})" class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
          <span class="relative px-4 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
          <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.1464 1.14645C12.3417 0.951184 12.6583 0.951184 12.8535 1.14645L14.8535 3.14645C15.0488 3.34171 15.0488 3.65829 14.8535 3.85355L10.9109 7.79618C10.8349 7.87218 10.7471 7.93543 10.651 7.9835L6.72359 9.94721C6.53109 10.0435 6.29861 10.0057 6.14643 9.85355C5.99425 9.70137 5.95652 9.46889 6.05277 9.27639L8.01648 5.34897C8.06455 5.25283 8.1278 5.16507 8.2038 5.08907L12.1464 1.14645ZM12.5 2.20711L8.91091 5.79618L7.87266 7.87267L8.12731 8.12732L10.2038 7.08907L13.7929 3.5L12.5 2.20711ZM9.99998 2L8.99998 3H4.9C4.47171 3 4.18056 3.00039 3.95552 3.01877C3.73631 3.03668 3.62421 3.06915 3.54601 3.10899C3.35785 3.20487 3.20487 3.35785 3.10899 3.54601C3.06915 3.62421 3.03669 3.73631 3.01878 3.95552C3.00039 4.18056 3 4.47171 3 4.9V11.1C3 11.5283 3.00039 11.8194 3.01878 12.0445C3.03669 12.2637 3.06915 12.3758 3.10899 12.454C3.20487 12.6422 3.35785 12.7951 3.54601 12.891C3.62421 12.9309 3.73631 12.9633 3.95552 12.9812C4.18056 12.9996 4.47171 13 4.9 13H11.1C11.5283 13 11.8194 12.9996 12.0445 12.9812C12.2637 12.9633 12.3758 12.9309 12.454 12.891C12.6422 12.7951 12.7951 12.6422 12.891 12.454C12.9309 12.3758 12.9633 12.2637 12.9812 12.0445C12.9996 11.8194 13 11.5283 13 11.1V6.99998L14 5.99998V11.1V11.1207C14 11.5231 14 11.8553 13.9779 12.1259C13.9549 12.407 13.9057 12.6653 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.6653 13.9057 12.407 13.9549 12.1259 13.9779C11.8553 14 11.5231 14 11.1207 14H11.1H4.9H4.87934C4.47686 14 4.14468 14 3.87409 13.9779C3.59304 13.9549 3.33469 13.9057 3.09202 13.782C2.7157 13.5903 2.40973 13.2843 2.21799 12.908C2.09434 12.6653 2.04506 12.407 2.0221 12.1259C1.99999 11.8553 1.99999 11.5231 2 11.1207V11.1206V11.1V4.9V4.87935V4.87932V4.87931C1.99999 4.47685 1.99999 4.14468 2.0221 3.87409C2.04506 3.59304 2.09434 3.33469 2.21799 3.09202C2.40973 2.71569 2.7157 2.40973 3.09202 2.21799C3.33469 2.09434 3.59304 2.04506 3.87409 2.0221C4.14468 1.99999 4.47685 1.99999 4.87932 2H4.87935H4.9H9.99998Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </span>
        </button>





        <button onclick="showDetails(${car.id})" class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
          <span class="relative px-4 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
          <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </span>
        </button>
      </div>
    `;
    root.appendChild(card);
  });
}

// --- Batafsil ---

window.showDetails = function (id) {
  const car = cars.find((c) => c.id === id);
  if (!car) return;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  modal.innerHTML = `
    <div class="bg-white dark:bg-gray-800 p-6 rounded shadow max-w-md w-full mx-auto transition-colors duration-300">
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">${car.name}</h2>
      <ul class="space-y-2 text-gray-700 dark:text-gray-300">
        <li><strong>Trim: </strong> ${car.trim}</li>
        <li><strong>Generation: </strong> ${car.generation}</li>
        <li><strong>Year: </strong> ${car.year}</li>
        <li><strong>Color: </strong> ${car.color}</li>
        <li><strong>ColorName: </strong> ${car.colorName}</li>
        <li><strong>Category: </strong> ${car.category}</li>
        <li><strong>DoorCount: </strong> ${car.doorCount}</li>
        <li><strong>SeatCount: </strong> ${car.seatCount}</li>
        <li><strong>MaxSpeed: </strong> ${car.maxSpeed}</li>
        <li><strong>Acceleration: </strong> ${car.acceleration}</li>
        <li><strong>Engine: </strong> ${car.engine}</li>
        <li><strong>Horsepower: </strong> ${car.horsepower}</li>
        <li><strong>FuelType: </strong> ${car.fuelType}</li>
        <li><strong>FuelConsumption: City: </strong> ${car.fuelConsumption.city}</li>
        <li><strong>FuelConsumption: Highway: </strong> ${car.fuelConsumption.highway}</li>
        <li><strong>FuelConsumption: Combined: </strong> ${car.fuelConsumption.combined}</li>
        
        
      </ul>
      <div class="mt-4 text-right">
        <button onclick="closeModal()" class="px-4 py-2 bg-blue-500 text-white rounded">Yopish</button>
      </div>
    </div>
  `;
};

window.closeModal = function () {
  modal.classList.add("hidden");
  modal.innerHTML = "";
};
// --- O'chirish ---

window.showDeleteModal = function (id) {
  const car = cars.find((c) => c.id === id);
  if (!car) return;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  modal.innerHTML = `
    <div class="bg-white dark:bg-gray-800 p-6 rounded shadow max-w-sm w-full mx-auto transition-colors duration-300">
      <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
      </svg>
      <p class="text-center text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Rostdan ham <span class="text-red-600 dark:text-red-400">${car.name}</span> mashinasini o‘chirmoqchimisiz?</p>
      <div class="flex justify-end gap-4">
        <button onclick="deleteCar(${id})" class="px-4 py-2 bg-red-600 text-white rounded">Ha</button>
        <button onclick="closeModal()" class="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-gray-200 rounded">Yo‘q</button>
      </div>
    </div>

    
  `;
};

window.deleteCar = function (id) {
  cars = cars.filter((c) => c.id !== id);
  saveCars();
  closeModal();
  renderCars();
};

// --- Tahrirlash ---

window.showEditModal = function (id) {
  const car = cars.find((c) => c.id === id);
  if (!car) return;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  modal.innerHTML = `
    <div class="bg-white dark:bg-gray-800 p-6 rounded shadow max-w-lg w-full mx-auto transition-colors duration-300">
      <h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">${car.name} — Tahrirlash</h2>
      <form onsubmit="editCar(event, ${id})" class="space-y-2">

        <input name="Name" value=" ${car.name}" class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="Name" />

        <input name="Trim" value="${car.trim}" class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="Trim" />

        <input name="Generation" value="${car.generation}" type="string" class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="Generation"  />

        <input name="Year" value="${car.year}" type="number" class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="Year" />

        <input name="Color" value="${car.color}" class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"  placeholder="Color" />

        <input name="Color Name" class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="Color Name" value="${car.colorName}" ></input>

        <input name="Category" value="${car.category}" class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="Category" />

        <input name="DoorCount" value="${car.doorCount}" class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="DoorCount" />

        <input name="SeatCount" value="${car.seatCount}" class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="SeatCount" />

        <input name="MaxSpeed" value="${car.maxSpeed}" class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="MaxSpeed" />

        <input name="Acceleration" value="${car.acceleration}" class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="Acceleration" />

        <input name="Engine" value="${car.engine}" class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="Engine" />

        <input name="Horsepower" value="${car.horsepower}" class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="Horsepower" />

        <input name="FuelType" value="${car.fuelType}" class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="FuelType" />

        <input name="FuelConsumption: City:" value="${car.fuelConsumption.city}" class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="FuelConsumption: City:" />

        <input name="FuelConsumption: Highway:" value="${car.fuelConsumption.highway}" class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="FuelConsumption: Highway:" />

        <input name="FuelConsumption: Combined:" value="${car.fuelConsumption.combined}" class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="FuelConsumption: Combined:" />
        <div class="flex justify-end gap-4 pt-2">
          <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded">Saqlash</button>
          <button type="button" onclick="closeModal()" class="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-gray-200 rounded">Bekor qilish</button>
        </div>
      </form>
    </div>
  `;
};

window.editCar = function (event, id) {
  event.preventDefault();
  const form = event.target;
  const car = cars.find((c) => c.id === id);
  if (!car) return;
  car.nomi = form.nomi.value;
  car.rangi = form.rangi.value;
  car.yili = +form.yili.value;
  car.narxi = +form.narxi.value;
  car.holati = form.holati.value;
  car.tavsif = form.tavsif.value;
  car.rasmi = form.rasmi.value;

  saveCars();
  closeModal();
  renderCars();
};

// --- Qo'shish ---

addCarBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  modal.innerHTML = `
    <div class="bg-white dark:bg-gray-800 p-6 rounded shadow max-w-lg w-full mx-auto transition-colors duration-300">
      <h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Yangi mashina qo‘shish</h2>
      <form onsubmit="addCar(event)" class="space-y-2">
      
        <input name="Name"  class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="Name" />

        <input name="Trim" class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="Trim" />

        <input name="Generation"type="string" class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="Generation"  />

        <input name="Year" type="number" class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="Year" />

        <input name="Color"  class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"  placeholder="Color" />

        <input name="Color Name" class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="Color Name" ></input>

        <input name="Category"  class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="Category" />

        <input name="DoorCount" class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="DoorCount" />

        <input name="SeatCount"  class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="SeatCount" />

        <input name="MaxSpeed"  class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="MaxSpeed" />

        <input name="Acceleration" class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="Acceleration" />

        <input name="Engine"  class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="Engine" />

        <input name="Horsepower"  class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="Horsepower" />

        <input name="FuelType"  class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="FuelType" />

        <input name="FuelConsumption: City:"  class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="FuelConsumption: City:" />

        <input name="FuelConsumption: Highway:"  class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="FuelConsumption: Highway:" />

        <input name="FuelConsumption: Combined:"  class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="FuelConsumption: Combined:" />
        
        <div class="flex justify-end gap-4 pt-2">
          <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded">Qo‘shish</button>
          <button type="button" onclick="closeModal()" class="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-gray-200 rounded">Bekor qilish</button>
        </div>
      </form>
    </div>
  `;
});

window.addCar = function (event) {
  event.preventDefault();
  const form = event.target;
  const newCar = {
    id: Date.now(),
    nomi: form.nomi.value,
    rangi: form.rangi.value,
    yili: +form.yili.value,
    narxi: +form.narxi.value,
    holati: form.holati.value,
    tavsif: form.tavsif.value,
    rasmi: form.rasmi.value,
  };
  cars.push(newCar);
  saveCars();
  closeModal();
  renderCars();
};

loadCars();
renderCars();

// scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.remove("hidden");
  } else {
    scrollToTopBtn.classList.add("hidden");
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
