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

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    return await this.tasksRepository.getTaskById(id);
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

  async updateTaskById(id: string, status: string): Promise<Task> {
    return await this.tasksRepository.updateTaskById(id, status);
  }
}
