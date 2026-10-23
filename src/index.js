import "./style.css";
import {TodoList} from "./todo-implementer.js";


(() => {
  const list = new TodoList();

  document.querySelector(".book-button").addEventListener('click', () => {
    list.getDialog();
  })

  list.form.addEventListener('submit', () => {
    list.submitForm();
  })
})();