import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor (private api: HttpClient) {}
  private apiUrl = 'http://localhost:3000';

  get() {
    return this.api.get<Task[]>(`${this.apiUrl}/tasks`);
  }

  delete(id: number) {
    return this.api.delete<Task>(`${this.apiUrl}/tasks/${id}`);
  }

  put(id: number, task: Task) {
    return this.api.put<Task>(`${this.apiUrl}/tasks/${id}`, task);
  }

  post(task: Task) {
    return this.api.post<Task>(`${this.apiUrl}/tasks`, task);
  }
}
