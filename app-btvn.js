//Cafe Class: Represent Cafe
class Cafe {
  constructor(name, city) {
    this.name = name;
    this.city = city;
  }
}

//UI Class: Handle UI Task
class UI {
  static displayCafes() {
    // let StoredCafes = [
    //   {
    //     name: "Cafe Cyber",
    //     city: "Night City",
    //   },
    //   {
    //     name: "Cafe Haha",
    //     city: "Day City",
    //   },
    //   {
    //     name: "Cafe Very Nice",
    //     city: "Very nice City",
    //   },
    //   {
    //     name: "Starbuck",
    //     city: "Hanoi",
    //   },
    //   {
    //     name: "Highland",
    //     city: "Vung Tau",
    //   },
    // ];
    const cafes = Store.getCafes();

    cafes.forEach((cafe, index) => UI.addCafeToList(cafe, index));
  }
  static addCafeToList(cafe, index) {
    const list = document.querySelector("#cafe-list");

    const row = document.createElement("li");
    row.innerHTML = `
    <span>${cafe.name}</span>
    <span>${cafe.city}</span>
    <div class="delete" data-index-number="${index}">x</div>
    `;

    list.appendChild(row);
  }
  static deleteCafe(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.remove();
    }
  }

  static clearField() {
    document.querySelector("#name").value = "";
    document.querySelector("#city").value = "";
  }
}

//Store Class: Handle Storage
class Store {
  static getCafes() {
    let cafes;
    if (localStorage.getItem("cafes") === null) {
      cafes = [];
    } else {
      cafes = JSON.parse(localStorage.getItem("cafes"));
    }
    return cafes;
  }

  static addCafe(cafe) {
    const cafes = Store.getCafes();
    cafes.push(cafe);
    localStorage.setItem("cafes", JSON.stringify(cafes));
  }

  static removeCafe(target) {
    const cafes = Store.getCafes();

    const index = target.dataset.indexNumber;
    console.log(target);
    console.log(index);
    cafes.splice(index, 1);

    localStorage.setItem("cafes", JSON.stringify(cafes));
  }
}

//Event: Display Cafe
document.addEventListener("DOMContentLoaded", UI.displayCafes);

//Event: Add a cafe
document.querySelector("#add-cafe-form").addEventListener("submit", (e) => {
  //prevent submit
  e.preventDefault();

  //get form value
  let name = document.querySelector("#name").value;
  let city = document.querySelector("#city").value;
  let index = Store.getCafes().length;
  console.log("NINH ", index);
  //instatiate cafe
  const cafe = new Cafe(name, city);

  //add cafe to UI
  UI.addCafeToList(cafe, index);

  //add cafe to localstorage
  Store.addCafe(cafe);

  //clear field
  UI.clearField();
});

//Event: Remove a cafe
document.querySelector("#cafe-list").addEventListener("click", (e) => {
  //Remove cafe in UI
  UI.deleteCafe(e.target);
  console.dir(e.target);
  //Remove cafe in storage
  Store.removeCafe(e.target);
});
