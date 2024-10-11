import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html'
})
export class TodoListComponent implements OnInit {
  todos: { name: string; completed: boolean }[] = [];

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    const storedTodos = localStorage.getItem('todos');
    this.todos = storedTodos ? JSON.parse(storedTodos) : [];
  }

  clearTodos(): void {
    localStorage.removeItem('todos');
    this.loadTodos();
  }
}