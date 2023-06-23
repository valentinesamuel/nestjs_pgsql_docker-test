import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    createUser: jest.fn((dto) => {
      return {
        id: String(Date.now()),
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    const userDto = {
      name: 'Val',
      email: 'val@val.com',
      password: 'password',
      comments: [],
    };
    expect(controller.create(userDto)).toEqual({
      id: expect.any(String),
      name: 'Val',
      email: 'val@val.com',
      password: 'password',
      comments: [],
    });
  });
});
