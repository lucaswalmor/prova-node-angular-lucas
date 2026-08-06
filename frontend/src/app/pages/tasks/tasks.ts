import { Component, Input, input, signal } from '@angular/core';
import { Task } from '../../interfaces/task';
import { TaskService } from '../../services/task';
import { FormsModule } from '@angular/forms';
import { CreateTaskModal } from '../../components/create-task-modal/create-task-modal';

@Component({
  selector: 'app-tasks',
  imports: [FormsModule, CreateTaskModal],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  constructor(private taskService: TaskService) {}

  tasks = signal<Task[]>([]);
  selectedTask = signal<Task | null>(null);
  showCreateModal = signal(false);

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.get().subscribe(tasks => {
      this.tasks.set(tasks);
    });
  }

  edit(task: Task) {
    this.selectedTask.set(task);
  }

  cancelEdit() {
    this.selectedTask.set(null);
  }

  deleteTask(task: Task) {
    console.log("Task clicada:", task);
    if (confirm(`Deseja realmente deletar a task ${task.title}?`) == true) {
      this.taskService.delete(task.id).subscribe(() => {
        this.getTasks();
      });
    }
  }

  updateTask(task: Task) {
    this.selectedTask.set(null);
    this.taskService.put(task.id, task).subscribe(() => {
      this.getTasks();
    });
  }

  openCreateModal() {
    this.showCreateModal.set(true);
  }

  closeCreateModal() {
    this.showCreateModal.set(false);
  }

  createTask(data: Task) {
    this.taskService.post(data).subscribe(() => {
      this.closeCreateModal();
      this.getTasks()
    })
  }
}
