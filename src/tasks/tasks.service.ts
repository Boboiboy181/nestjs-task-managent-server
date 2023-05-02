import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  getAllTask(): Promise<Task[]> {
    return this.tasksRepository.getAllTasks();
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }
  getTaskById(id: string): Promise<Task> {
    return this.tasksRepository.getTasksById(id);
  }
  getTaskWithFilter(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasksWithFilter(filterDto);
  }
  deleteTaskById(id: string): Promise<void> {
    return this.tasksRepository.deleteTaskById(id);
  }
  updateTaskById(id: string, status: string): Promise<Task> {
    return this.tasksRepository.updateTaskById(id, status);
  }
}
