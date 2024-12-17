import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../models/task.model';
import { TaskEvent } from '../../../models/taskEvent.model';
import { TaskService } from '../../../services/task.service';
import { TaskformComponent } from '../taskform/taskform.component';
import { TaskresumeComponent } from '../taskresume/taskresume.component';

@Component({
  selector: 'app-tasklist',
  standalone: true,
  imports: [CommonModule, TaskresumeComponent, TaskformComponent, FormsModule],
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.css'
})
export class TasklistComponent implements OnInit {
  taskList: Task[] = [];
  taskToEdit: Task | null = null; // Propiedad para la tarea que se editará

  constructor(private taskService: TaskService) {

  }

  ngOnInit(): void {
    this.taskList = this.taskService.getAllTasks();
  }

  modifyTask(taskevent: TaskEvent) {
    console.log('Event received in modifyTask:', taskevent);
    if (taskevent.action === 'editTask') {
      this.editTask(taskevent.taskId);
    }

    this.taskService.modifyTask(taskevent);
    this.taskList = this.taskService.getAllTasks();
  }

  editTask(taskId: number) {
    console.log('Task ID received in Tasklist:', taskId);
    this.taskService.editTask(taskId);
    this.taskToEdit = this.taskService.taskToEdit
    console.log('Task to edit in Tasklist:', this.taskToEdit);
  }

  onSaveTask(task: Task) {
    console.log('Saving task:', task);
    this.taskService.onSaveTask(task); 
    this.taskList = this.taskService.getAllTasks(); 
    console.log('Updated task list:', this.taskList);
    this.taskToEdit = null;
  }

  addNewTask(task: Task) {
    this.taskService.addNewTask(task);
  }
}
