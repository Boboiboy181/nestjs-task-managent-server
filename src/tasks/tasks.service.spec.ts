import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { TaskStatus } from './tasks_status.enum';
import { NotFoundException } from '@nestjs/common';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  getTaskById: jest.fn(),
});

const mockUser = {
  username: 'Test user',
  id: 'someId',
  password: 'somePassword',
  tasks: [],
};

describe('TaskService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', async () => {
      expect(tasksRepository.getTasks).not.toHaveBeenCalled();
      tasksRepository.getTasks.mockResolvedValue('someValue');
      const result = await tasksService.getTasks(null, mockUser);
      expect(tasksRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });

  describe('getTaskById', () => {
    it('calls TasksRepository.getTaskById and returns the result', async () => {
      const mockTask = {
        title: 'Test task',
        description: 'Test desc',
        id: 'someId',
        status: TaskStatus.OPEN,
      };
      tasksRepository.getTaskById.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById('someId', mockUser);
      expect(result).toEqual(mockTask);
    });
    it('calls TasksRepository.getTaskById and handles an error', async () => {
      tasksRepository.getTaskById.mockRejectedValue(new NotFoundException());
      expect(tasksService.getTaskById('someId', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
