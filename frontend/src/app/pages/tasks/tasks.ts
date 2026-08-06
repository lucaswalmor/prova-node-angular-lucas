import { Component, Input, input, signal } from '@angular/core';
import { Task } from '../../interfaces/task';
import { TaskService } from '../../services/task';
import { FormsModule } from '@angular/forms';
import { CreateTaskModal } from '../../components/create-task-modal/create-task-modal';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  imports: [FormsModule, CreateTaskModal],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  constructor(private taskService: TaskService, private authService: AuthService, private router: Router) {}

  tasks = signal<Task[]>([]);
  selectedTask = signal<Task | null>(null);
  showCreateModal = signal(false);

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.get().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
      },
      error: (err) => {
        console.error(err.error?.message ?? err);
      },
    });
  }

  edit(task: Task) {
    this.selectedTask.set(task);
  }

  cancelEdit() {
    this.selectedTask.set(null);
  }

  deleteTask(task: Task) {
    if (confirm(`Deseja realmente deletar a task ${task.title}?`)) {
      this.taskService.delete(task.id).subscribe({
        next: (response) => {
          this.getTasks();
        },
        error: (err) => {
          console.log('Erro:', err);
          console.log('Mensagem do backend:', err.error);

          alert(err.error.message);
        },
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
      this.getTasks();
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
