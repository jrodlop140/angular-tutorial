import { Injectable } from '@angular/core';
import { Task, TaskPriority, TaskStatus } from '../models/task.model';
import { TaskEvent } from '../models/taskEvent.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  private taskList: Task[] = [new Task(1, "Tarea 1", "Descripción Tarea 1", TaskPriority.LOW, TaskStatus.PENDING, new Date("11/1/2024"), new Date("11/18/2024"), false),
  new Task(2, "Tarea 2", "Descripción Tarea 2", TaskPriority.HIGH, TaskStatus.IN_PROGRESS, new Date("11/5/2024"), new Date("11/16/2024"), false),
  new Task(3, "Tarea 3", "Descripción Tarea 3", TaskPriority.LOW, TaskStatus.IN_PROGRESS, new Date("11/21/2024"), new Date("11/30/2024"), false),
  new Task(4, "Tarea 4", "Descripción Tarea 4", TaskPriority.HIGH, TaskStatus.COMPLETED, new Date("11/8/2024"), new Date("11/21/2024"), false),
  new Task(5, "Tarea 5", "Descripción Tarea 5", TaskPriority.MEDIUM, TaskStatus.PENDING, new Date("11/10/2024"), new Date("11/30/2024"), false),
  ];

  taskToEdit: Task | null = null;

  getAllTasks(): Task[] {
    return this.taskList;
  }

  editTask(taskId: number) {
    const tarea = this.getTask(taskId)[0];
    if (tarea) {
      this.taskToEdit = new Task(
        tarea.id,
        tarea.name,
        tarea.description,
        tarea.priority,
        tarea.status,
        tarea.creationDate,
        tarea.expirationDate,
        tarea.isDelete
      );
    }
  }

  modifyTask(taskevent: TaskEvent) {
    switch (taskevent.action) {
      case "raiseTaskPriority": this.raiseTaskPriority(taskevent.taskId); break;
      case "lowerTaskPriority": this.lowerTaskPriority(taskevent.taskId); break;
      case "changeTaskStatus": this.changeTaskStatus(taskevent.taskId); break;
      case "editTask": this.editTask(taskevent.taskId); break;
      case "deleteTask": this.deleteTask(taskevent.taskId); break;
    }
  }

  getTask(taskId: number): Task[] {
    return this.taskList.filter((tarea: Task) => tarea.id === taskId);
  }

  deleteTask(taskId: number) {
    this.taskList = this.taskList.filter((tarea: Task) => tarea.id !== taskId);
  }

  onSaveTask(task: Task) {
    const index = this.taskList.findIndex(t => t.id === task.id);
    if (index > -1) {
      // Reemplazar la tarea existente con una instancia válida
      this.taskList[index] = Object.assign(
        new Task(0, '', '', TaskPriority.LOW, TaskStatus.PENDING, new Date(), new Date(), false), 
        task
      );
    } else {
      // Agregar una nueva tarea como una instancia de Task
      this.taskList.push(
        Object.assign(
          new Task(0, '', '', TaskPriority.LOW, TaskStatus.PENDING, new Date(), new Date(), false), 
          task
        )
      );
    }
    this.taskToEdit = null;
  }
  

  raiseTaskPriority(taskId: number) {
    const tarea = this.getTask(taskId)[0];
    if (tarea) tarea.raisePriority();
  }

  lowerTaskPriority(taskId: number) {
    const tarea = this.getTask(taskId)[0];
    if (tarea) tarea.lowerPriority();
  }

  changeTaskStatus(taskId: number) {
    const tarea = this.getTask(taskId)[0];
    if (tarea) tarea.changeStatus();
  }

  addNewTask(task: Task) {
    this.taskList.push(task);
  }
}


