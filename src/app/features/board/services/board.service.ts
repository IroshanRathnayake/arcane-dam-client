import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleTasks: Task[] = [
      {
        id: 1,
        title: 'Hospital Management System',
        description:
          'Enhancing healthcare efficiency, integrated patient management solutions.',
        dueDate: new Date('2023-11-10'),
        assignees: ['user1', 'user2', 'user3'],
        priority: 'High',
        progress: 0,
        attachments: 2,
        comments: 0,
      },
    ];

    this.tasksSubject.next(sampleTasks);
  }

  addTask(task: Task) {
    const currentTasks = this.tasksSubject.value;
    this.tasksSubject.next([...currentTasks, task]);
  }

  updateTask(updatedTask: Task) {
    const currentTasks = this.tasksSubject.value;
    const index = currentTasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      currentTasks[index] = updatedTask;
      this.tasksSubject.next([...currentTasks]);
    }
  }

  deleteTask(taskId: number) {
    const currentTasks = this.tasksSubject.value;
    this.tasksSubject.next(currentTasks.filter((task) => task.id !== taskId));
  }

  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }
}

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  assignees: string[];
  priority: 'High' | 'Low';
  progress: number;
  attachments?: number;
  comments?: number;
}
