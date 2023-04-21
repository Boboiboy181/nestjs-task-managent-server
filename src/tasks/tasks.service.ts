import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks_status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}
  // constructor(
  //   @InjectRepository(Task)
  //   private tasksRepository: Repository<Task>,
  // )

  async getTaskById(id: string): Promise<Task> {
    const record = await this.tasksRepository.findOne({ where: { id } });
    if (!record) {
      throw new NotFoundException();
    }
    return record;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async deleteTaskById(id: string): Promise<void> {
    const result = await this.tasksRepository.deleteTaskById(id);

    if (result === 0) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
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

  // updateTaskById(id: string, status: string): Task {
  //   const task = this.getTaskById(id);
  //   task.status = TaskStatus[status];
  //   return task;
  // }
}
