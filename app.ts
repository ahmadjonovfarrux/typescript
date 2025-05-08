const form = document.querySelector("form")!;
const template = document.querySelector("template")!;
const templateBox = document.querySelector(".templateBox")!;

type User = {
  name: string;
  age: number;
};

const users: User[] = localStorage.getItem("person")
  ? JSON.parse(localStorage.getItem("person") as string)
  : [];
console.log(users);
if (users.length > 0) {
  upDateUi(users);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.elements.namedItem("name") as HTMLInputElement;
  const age = form.elements.namedItem("age") as HTMLInputElement;
  if (!name.value.trim() && !age.value.trim()) {
    return " Enter something";
  }
  users.push({ name: name.value, age: +age.value });
  upDateUi(users);
  // adding localStorage
  localStorage.setItem("person", JSON.stringify(users));
  form.reset();
});

function upDateUi(user: User[]) {
  templateBox.innerHTML = "";
  users.forEach((user, index) => {
    const clone = template.content.cloneNode(true) as HTMLTemplateElement;

    const h4 = clone.querySelector("h4") as HTMLHeadElement;
    const h5 = clone.querySelector("h5") as HTMLHeadElement;
    const editItems = clone.querySelector("#edit") as HTMLHeadElement;
    const removeItem = clone.querySelector("#remove") as HTMLHeadElement;

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
