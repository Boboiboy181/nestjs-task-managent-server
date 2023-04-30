import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksReposipitory } from './tasks.reposipitory';
import { Task } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(private readonly tasksReposipitory: TasksReposipitory) {}

  getAllTask(): Promise<Task[]> {
    return this.tasksReposipitory.getAllTasks();
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksReposipitory.createTask(createTaskDto);
  }
  getTaskById(id: string): Promise<Task> {
    return this.tasksReposipitory.getTasksById(id);
  }
  getTaskWithFilter(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksReposipitory.getTasksWithFilter(filterDto);
  }
  deleteTaskById(id: string): Promise<void> {
    return this.tasksReposipitory.deleteTaskById(id);
  }
  updateTaskById(id: string, status: string): Promise<Task> {
    return this.tasksReposipitory.updateTaskById(id, status);
  }
}
