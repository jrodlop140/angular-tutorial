import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task, TaskStatus } from '../../../models/task.model';
import { customValidator } from './taskform.validator';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-taskform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './taskform.component.html',
  styleUrls: ['./taskform.component.css']
})
export class TaskformComponent implements OnChanges, OnInit {
  @Input() taskToEdit: Task | null = null; // Tarea que llega desde el padre
  @Output() saveTask = new EventEmitter<Task>(); // Evento para enviar tarea al padre
  @Output() newTask = new EventEmitter<Task>();

  formTaskEdit: FormGroup;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.formTaskEdit = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(250)]],
      priority: ['', [Validators.required, Validators.pattern(/^(L|M|H)$/)]],
      expirationDate: ['', [Validators.required, customValidator()]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      console.log(id);
    });
  }

  ngOnChanges(): void {
    // Si llega una tarea para editar, cargar sus valores en el formulario
    if (this.taskToEdit) {
      this.formTaskEdit.patchValue({
        name: this.taskToEdit.name,
        description: this.taskToEdit.description,
        priority: this.taskToEdit.priority,
        expirationDate: this.taskToEdit.expirationDate.toISOString().slice(0, 16),
      });
    }
  }

  onSubmit(): void {
    if (this.formTaskEdit.valid) {
      if (this.taskToEdit) {
        // Editar tarea existente
        const updatedTask: Task = {
          ...this.taskToEdit, // Mantén los valores de la tarea existente
          ...this.formTaskEdit.value, // Sobrescribe los valores con los del formulario
          expirationDate: new Date(this.formTaskEdit.value.expirationDate), // Actualiza la fecha de expiración
        };
        this.saveTask.emit(updatedTask); // Emitir tarea editada
      } else {
        const newTask = new Task(
          Math.floor(Math.random() * 1000000), // ID aleatorio
          this.formTaskEdit.value.name,
          this.formTaskEdit.value.description,
          this.formTaskEdit.value.priority,
          TaskStatus.PENDING,
          new Date(this.formTaskEdit.value.expirationDate),
          new Date(), // Fecha de creación
          false // isDelete
        );
        this.saveTask.emit(newTask); // Emitir la tarea al componente padre
        this.formTaskEdit.reset(); // Limpiar el formulario
      }
    }
  }
}