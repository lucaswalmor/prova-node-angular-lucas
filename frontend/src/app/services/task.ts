import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor (private api: HttpClient) {}

  get() {
    return this.api.get<Task[]>('http://localhost:3000/tasks');
  }

  delete(id: number) {
    return this.api.delete<Task>(`http://localhost:3000/tasks/${id}`);
  }

  put(id: number, task: Task) {
    return this.api.put<Task>(`http://localhost:3000/tasks/${id}`, task);
  }

  post(task: Task) {
    return this.api.post<Task>('http://localhost:3000/tasks', task);
  }
}
