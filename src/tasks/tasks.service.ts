import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks_status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async getTaskById(id: string): Promise<Task> {
    const record = this.tasksRepository.findOne({ where: { id } });
    if (!record) {
      throw new NotFoundException();
    }
    return record;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  // getAllTask(): Task[] {
  //   return this.tasks;
  // }

  // getTaskWithFilter(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTask();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.toLowerCase().includes(search.toLowerCase()) ||
  //         task.description.toLowerCase().includes(search.toLowerCase()),
  //     );
  //   }
  //   return tasks;
  // }
  // deleteTaskById(id: string): void {
  //   const taskIndex = this.tasks.indexOf(this.getTaskById(id));
  //   if (taskIndex > -1) {
  //     this.tasks.splice(taskIndex, 1);
  //   }
  // }
  // updateTaskById(id: string, status: string): Task {
  //   const task = this.getTaskById(id);
  //   task.status = TaskStatus[status];
  //   return task;
  // }
}
