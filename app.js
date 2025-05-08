"use strict";
const form = document.querySelector("form");
const template = document.querySelector("template");
const templateBox = document.querySelector(".templateBox");
const users = localStorage.getItem("person")
    ? JSON.parse(localStorage.getItem("person"))
    : [];
if (users.length > 0) {
    upDateUi(users);
}
function upDateUi(user) {
    users.forEach((user) => {
        const clone = template.content.cloneNode(true);
        const h4 = clone.querySelector("h4");
        const h5 = clone.querySelector("h5");
        const editItem = document.getElementById("edit");
        const removeItem = document.getElementById("remove");
        h4.textContent = `Name: ${user.name}`;
        h5.textContent = `Age: ${user.age.toString()}`;
        templateBox.appendChild(clone);
    });
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let localStore = [];
    const name = form.elements.namedItem("name");
    const age = form.elements.namedItem("age");
    localStore.push(name.value, +age.value);
    //   adding to localStorage
    localStorage.setItem("person", JSON.stringify(localStore));
    if (!name.value.trim() && !age.value.trim()) {
        return " Enter something";
    }
    users.push({ name: name.value, age: +age.value });
    upDateUi(users);
    form.reset();
});
