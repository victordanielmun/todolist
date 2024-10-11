import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html'
})
export class AddTodoComponent {
  todoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      name: ['', Validators.required],
      completed: [false] // Estado booleano (completado o no)
    });
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      const todos = JSON.parse(localStorage.getItem('todos') || '[]');
      todos.push(this.todoForm.value);
      localStorage.setItem('todos', JSON.stringify(todos));
      this.todoForm.reset();
    }
  }
}