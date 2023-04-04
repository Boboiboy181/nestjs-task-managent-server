import { IsEnum } from 'class-validator';
import { TaskStatus } from '../tasks_status.enum';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
