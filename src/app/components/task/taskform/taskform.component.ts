import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task, TaskStatus } from '../../../models/task.model';
import { customValidator } from './taskform.validator';
import { ActivatedRoute ,ParamMap } from '@angular/router';

@Component({
  selector: 'app-taskform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './taskform.component.html',
  styleUrls: ['./taskform.component.css']
})
export class TaskformComponent implements OnChanges,OnInit {
  @Input() taskToEdit: Task | null = null; // Tarea que llega desde el padre
  @Output() saveTask = new EventEmitter<Task>(); // Evento para enviar tarea al padre
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
    this.route.paramMap.subscribe((params : ParamMap) => {
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
        const newTask = new Task(
          this.taskToEdit?.id || Math.floor(Math.random() * 1000000), // ID aleatorio si es nueva
          this.formTaskEdit.get('name')?.value,
          this.formTaskEdit.get('description')?.value,
          this.formTaskEdit.get('priority')?.value,
          this.taskToEdit?.status || 'P' as TaskStatus,
          this.taskToEdit?.creationDate || new Date(),
          new Date(this.formTaskEdit.get('expirationDate')?.value),
          false // isDelete
        );

        this.saveTask.emit(newTask); // Emitir la tarea al componente padre
        this.formTaskEdit.reset(); // Limpiar el formulario
      }
    }
  }