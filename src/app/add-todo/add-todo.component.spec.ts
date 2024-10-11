import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddTodoComponent } from './add-todo.component';

describe('AddTodoComponent', () => {
  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTodoComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('se debe crear componente', () => {
    expect(component).toBeTruthy();
  });

  it('inicializar con valores en blanco', () => {
    const todoForm = component.todoForm;
    expect(todoForm.value).toEqual({ name: '', completed: false });
  });

  it('no se debe enviar si el nombre es vacio', () => {
    const todoForm = component.todoForm;
    todoForm.controls['name'].setValue('');
    component.onSubmit();
    expect(localStorage.getItem('todos')).toBeNull();
  });

  it('añadir tarea al loca stirage', () => {

    localStorage.removeItem('todos');

    const todoForm = component.todoForm;
    todoForm.controls['name'].setValue('Test Todo');
    todoForm.controls['completed'].setValue(true);

    component.onSubmit();

    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    expect(todos.length).toBe(1);
    expect(todos[0]).toEqual({ name: 'Test Todo', completed: true });
  });

  it('sresetar formulario despues de añadir', () => {
    const todoForm = component.todoForm;

    todoForm.controls['name'].setValue('Another Todo');
    todoForm.controls['completed'].setValue(false);

    component.onSubmit();


    expect(todoForm.value).toEqual({ name: '', completed: false });
  });
});
