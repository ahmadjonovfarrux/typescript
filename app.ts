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

if (users.length > 0) {
  upDateUi(users);
}

function upDateUi(user: User[]) {
  users.forEach((user) => {
    const clone = template.content.cloneNode(true) as HTMLTemplateElement;

    const h4 = clone.querySelector("h4") as HTMLHeadElement;
    const h5 = clone.querySelector("h5") as HTMLHeadElement;
    const editItem = document.getElementById("edit") as HTMLHeadElement;
    const removeItem = document.getElementById("remove") as HTMLHeadElement;

    h4.textContent = `Name: ${user.name}`;
    h5.textContent = `Age: ${user.age.toString()}`;

    templateBox.appendChild(clone);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.elements.namedItem("name") as HTMLInputElement;
  const age = form.elements.namedItem("age") as HTMLInputElement;
  //   adding to localStorage
  localStorage.setItem("person", JSON.stringify(users));
  if (!name.value.trim() && !age.value.trim()) {
    return " Enter something";
  }

  const clone = template.content.cloneNode(true);
  
  users.push({ name: name.value, age: +age.value });
  upDateUi(users);
  form.reset();
});
