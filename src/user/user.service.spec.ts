import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

describe('UserService', () => {
  let service: UserService;

  const mockUsersRepository = {
    create: jest.fn((dto) => dto),
    save: jest.fn((user) =>
      Promise.resolve({ id: String(Date.now()), ...user }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create and return a new user method', async () => {
    const dto = {
      name: 'Shanice',
      email: 'shanny@hotmail.uk',
      password: 'shanny',
      comments: [],
    };
    expect(await service.createUser(dto)).toEqual({
      id: expect.any(String),
      name: 'Shanice',
      email: 'shanny@hotmail.uk',
      password: 'shanny',
      comments: [],
    });
  });
});
