import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-create-task-modal',
  imports: [FormsModule],
  templateUrl: './create-task-modal.html',
  styleUrl: './create-task-modal.css',
})
export class CreateTaskModal {
  @Output() closeCreateModal = new EventEmitter<void>();
  @Output() openCreateModal = new EventEmitter<void>();
  @Output() createTaskModal = new EventEmitter<Task>();

  task = signal<Task>({
    id: 0,
    title: '',
    description: '',
    isCompleted: false
  });

  openModal() {
    this.openCreateModal.emit();
  }

  closeModal() {
    this.closeCreateModal.emit();
  }

  createTask() {
    if (this.task().title.trim() === '' || this.task().description.trim() === '') {
      alert('Título e descrição são obrigatórios');
      return;
    }

    this.createTaskModal.emit(this.task());
  }
}
