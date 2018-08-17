import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {TodoItem} from '../../models/todo-item.model'

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() item:TodoItem
  @Output() isDeleted = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  toggleState(){
    console.log ("toggling from "+this.item.isDone);
    this.item.isDone=!this.item.isDone
  }

  onDelete(){
    console.log ("deleting from "+this.item.name);
    this.isDeleted.emit();
  }

}
