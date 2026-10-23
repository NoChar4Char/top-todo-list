class Item {
  constructor(title, details, date, priority) {
    this.title = title;
    this.desc = details;
    this.date = date;
    this.priority = priority;
    this.id = crypto.randomUUID();
    this.isViewingDetail = false;
  }
}

export class TodoList {

  containerBlock = document.querySelector(".todo-container");
  dialog = document.querySelector(".prompt-dialog");
  form = this.dialog.querySelector("form");
  editingId = null;

  constructor() {
    this.todoArr = []
    // maybe some extra settings later
  }

  getDialog() {
    this.editingId = null;
    this.form.reset();
    this.dialog.showModal();
  }

  addItem(thisItem) {
    this.todoArr.push(thisItem);
    return true;
  }

  removeItem(thisItem) {
    this.todoArr = this.todoArr.filter(item => item.id !== thisItem.id);
  }

  createItem(title, details, date, priority) {
    const newItem = new Item(title, details, date, priority);
    return newItem;
  }

  editItem(newItem, id) {
    newItem.id = id;
    this.todoArr = this.todoArr.map(item => item.id === id ? newItem : item);
  }

  insertItemAndAppend(thisItem) {
    const task = document.querySelector(".task-template")?.content.cloneNode(true).firstElementChild;
    const priorityCircle = task.querySelector(".priority-circle");
    switch (thisItem.priority) {
      case "High":
        priorityCircle.classList.add("high-priority");
        break;
      case "Medium":
        priorityCircle.classList.add("medium-priority");
        break;
      case "Low":
        priorityCircle.classList.add("low-priority");
        break;
    }
    task.querySelector(".title").textContent = thisItem.title;
    task.querySelector(".date").textContent = thisItem.date;

    task.querySelector(".view-details").addEventListener('click', () => {
      thisItem.isViewingDetail = !thisItem.isViewingDetail;
      task.querySelector(".details-inner").textContent = (thisItem.isViewingDetail ? thisItem.desc : "");
    })

    task.querySelector(".edit").addEventListener('click', () => {
      this.editingId = thisItem.id;
      this.form.querySelector(".input-name").value = thisItem.title;
      this.form.querySelector(".input-desc").value = thisItem.desc;
      this.form.querySelector(".input-date").value = thisItem.date;
      this.form.querySelector(".input-priority").value = thisItem.priority;
      this.dialog.showModal();
    })

    task.querySelector(".delete").addEventListener('click', () => {
      this.removeItem(thisItem);
      task.remove();
    })

    this.containerBlock?.appendChild(task);
  }

  renderAll() {
    this.containerBlock?.replaceChildren();
    for (const oneItem of this.todoArr) {
      this.insertItemAndAppend(oneItem);
    }
  }

  submitForm() {
    const newItem = this.createItem(
      this.form.querySelector(".input-name").value,
      this.form.querySelector(".input-desc").value,
      this.form.querySelector(".input-date").value,
      this.form.querySelector(".input-priority").value,
    );

    if (this.editingId) {
      this.editItem(newItem, this.editingId);
    } else {
      this.addItem(newItem);
    }
    this.renderAll();
    this.form.reset();
  }
}

