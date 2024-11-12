import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit {
  columns: Column[] = [
    {
      id: 'todo',
      title: 'TO DO',
      tasks: [],
      count: 0,
    },
    {
      id: 'progress',
      title: 'ON PROGRESS',
      tasks: [],
      count: 0,
    },
    {
      id: 'review',
      title: 'IN REVIEW',
      tasks: [],
      count: 0,
    },
    {
      id: 'completed',
      title: 'COMPLETED',
      tasks: [],
      count: 0,
    },
  ];

  constructor() {}

  ngOnInit() {
    this.columns[0].tasks = [
      {
        id: 1,
        title: 'Hospital Management',
        description:
          "Enhancing healthcare efficiency, integrated patient management solutions.",
        dueDate: new Date('2024-11-10'),
        assignees: ['user1', 'user2', 'user3'],
        priority: 'High',
        progress: 0,
        attachments: 2,
        comments: 0,
      },
      {
        id: 2,
        title: 'Weather App',
        description:
          "Delivering accurate, real-time weather insights for daily planning ease.",
        dueDate: new Date('2024-11-20'),
        assignees: ['user1', 'user2', 'user3'],
        priority: 'High',
        progress: 0,
        attachments: 2,
        comments: 0,
      },
    ];

    this.updateCounts();
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.updateCounts();
  }

  getConnectedList(): string[] {
    return this.columns.map((column) => column.id);
  }

  updateCounts() {
    this.columns.forEach((column) => {
      column.count = column.tasks.length;
    });
  }

  getStatusIcon(status: string): string {
    const baseClasses = 'flex items-center justify-center w-6 h-6 rounded-full';
    switch (status) {
      case 'todo':
        return `${baseClasses} text-red-500`;
      case 'progress':
        return `${baseClasses} text-purple-500`;
      case 'review':
        return `${baseClasses} text-orange-500`;
      case 'completed':
        return `${baseClasses} text-emerald-500`;
      default:
        return baseClasses;
    }
  }

  getPriorityClass(priority: string): string {
    return priority === 'High'
      ? 'bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full'
      : 'bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full';
  }
}

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  assignees: string[];
  priority: 'High' | 'Medium' | 'Low';
  progress: number;
  attachments?: number;
  comments?: number;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
  count: number;
}
