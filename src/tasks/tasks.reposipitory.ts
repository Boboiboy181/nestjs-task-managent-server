import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks.model';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksReposipitory {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new this.taskModel({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    return await task.save();
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.taskModel.find().exec();
  }

  async getTasksById(id: string): Promise<Task> {
    const result = await this.taskModel.findById(id).exec();
    if (!result) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return result;
  }

  async getTasksWithFilter(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.taskModel.find();
    query.setOptions({ lean: true });
    if (status) {
      query.where('status').equals(status);
    }
    if (search) {
      query.or([
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ]);
    }
    return await query.exec();
  }

  async deleteTaskById(id: string): Promise<void> {
    await this.taskModel.findByIdAndDelete(id).exec();
  }

  async updateTaskById(id: string, status: string): Promise<Task> {
    return await this.taskModel
      .findByIdAndUpdate(
        id,
        { status: status },
        { returnDocument: 'after', lean: true },
      )
      .exec();
  }
}
