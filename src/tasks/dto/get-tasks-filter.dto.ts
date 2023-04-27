import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../tasks_status.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetTasksFilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
}
