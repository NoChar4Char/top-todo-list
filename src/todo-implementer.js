export class Item {
  constructor(title, desc, date, priority) {
    this.title = title;
    this.desc = desc;
    this.date = date;
    this.priority = priority;
    this.id = crypto.randomUUID();
  }
}

export class TodoList {
  constructor() {
    this.todoArr = []
    // maybe some extra settings later
  }

  addItem(thisItem) {
    this.todoArr.push(thisItem);
    return true;
  }

  removeItem(thisItem) {
    this.todoArr.filter(item => item.id !== thisItem.id);
  }

  createItem(title, desc, date, priority) {
    const newItem = new Item(title, desc, date, priority);
    return newItem;
  }

  update
}