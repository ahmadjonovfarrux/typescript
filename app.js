"use strict";
const form = document.querySelector("form");
const template = document.querySelector("template");
const templateBox = document.querySelector(".templateBox");
const users = localStorage.getItem("person")
    ? JSON.parse(localStorage.getItem("person"))
    : [];
console.log(users);
if (users.length > 0) {
    upDateUi(users);
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.elements.namedItem("name");
    const age = form.elements.namedItem("age");
    if (!name.value.trim() && !age.value.trim()) {
        return " Enter something";
    }
    users.push({ name: name.value, age: +age.value });
    upDateUi(users);
    // adding localStorage
    localStorage.setItem("person", JSON.stringify(users));
    form.reset();
});
function upDateUi(user) {
    templateBox.innerHTML = "";
    users.forEach((user, index) => {
        const clone = template.content.cloneNode(true);
        const h4 = clone.querySelector("h4");
        const h5 = clone.querySelector("h5");
        const editItems = clone.querySelector("#edit");
        const removeItem = clone.querySelector("#remove");
        removeItem.addEventListener("click", () => {
            users.splice(index, 1);
            localStorage.setItem("person", JSON.stringify(users));
            upDateUi(users);
        });
        // editItems.addEventListener("click", () => {
        //   const edit = users.find((item) => {
        //    return users.name == item.name && users.age == item.age; 
        //   });
        //   if (edit) {
        //     const newName = prompt("ism");
        //     const newAge = prompt("yosh");
        //     h4.textContent = newName;
        //     h5.textContent = newAge;
        //   }
        // });
        h4.textContent = `Name: ${user.name}`;
        h5.textContent = `Age: ${user.age.toString()}`;
        templateBox.appendChild(clone);
    });
}
