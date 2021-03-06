import TodoItem from './interface/Todo_Item';
import {todoStatusEnum, TodoStatusEnumItem} from './enum/todo_status';

class TodoList {
  private list: Array<TodoItem>;

  constructor(list) {
    this.list = list;
  }

  get getList() {return this.list;}

  private get maxIdItem() {
    if (this.list.length === 0) {
      return {id: 0};
    }
    return this.list.reduce((pre, cur) => {
      if (pre.id > cur.id) return pre;
      return cur;
    });
  }

  /**
   * create item and insert todolist
   * @param content 
   * @param deadline 
   * @param group 
   */
  create(content, deadline?, group?) {
    const id = this.maxIdItem.id + 1;
    const status = todoStatusEnum.PENDING.name;
    const todoItem = {id, content, status, deadline, group};
    this.list.push(todoItem);
  }

  /**
   * check the todo item as done
   * 
   * @param {number} id 
   * 
   * @memberOf TodoList
   */
  check(id: number) {
    this.list.map( item => {
      if (item.id === id) {
        item.status = todoStatusEnum.DONE.name;
      }
    })
  }

  /**
   * Uncheck the todo item as pending
   * 
   * @param {number} id 
   * 
   * @memberOf TodoList
   */
  uncheck(id: number) {
    this.list.map( item => {
      if (item.id === id) {
        item.status = todoStatusEnum.PENDING.name;
      }
    })
  }
  
  /**
   * get todo item by status
   * 
   * @param {TodoStatusEnumItem} status 
   * @returns {Array<TodoItem>} 
   * 
   * @memberOf TodoList
   */
  getItemListByStatus(status: TodoStatusEnumItem):Array<TodoItem> {
    
    return this.list.filter(item => {
      return status.eql(item.status);
    });
  }
  
  /**
   * resort todo list id 
   * 
   * @returns {Array<TodoItem>} 
   * 
   * @memberOf TodoList
   */
  resort(): Array<TodoItem> {
    let start = 1;
    const compare = function(pre, next) {
      if (todoStatusEnum.DONE.eql(pre.status) && todoStatusEnum.PENDING.eql(next.status)) {
        return 1;
      }
      if (pre.id > next.id) {
        return 1;
      }
      return -1;
    }
    this.list = this.list.sort(compare).map( item => {
      item.id = start;
      start++;
      return item;
    });
    return this.list;
  }

  /**
   * remove all item
   * 
   * @memberOf TodoList
   */
  clearAll() {
    this.list = [];
  }

  /**
   * remove item by status
   * 
   * @param {TodoStatusEnumItem} status 
   * 
   * @memberOf TodoList
   */
  clearListByStatus(status: TodoStatusEnumItem) {
    this.list = this.list.filter( item => !status.eql(item.status));
  }

  /**
   * remove item by id
   * @param id 
   */
  clearById(id: number) {
    this.list = this.list.filter( item => item.id !== id);
  }

  /**
   * stringify list to save into DB
   * 
   * @returns {string} 
   * 
   * @memberOf TodoList
   */
  toStringify(): string {
    return JSON.stringify(this.list);
  }
}

export default TodoList;
