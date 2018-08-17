import { Component, OnInit } from '@angular/core';
import {TodoItem} from '../models/todo-item.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodoListComponent implements OnInit {
  itemName:string
  itemList:TodoItem[] = [];
  isDisabled:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onAdd(){    
    if(this.itemName){
      this.itemList.push(new TodoItem(this.itemName));
    }
  }

  onDelete(item:TodoItem){
    console.log("Deleting "+item.name)
    var i = this.itemList.indexOf(item);
    if(i>-1)
      this.itemList.splice(i,1);
  }

}

