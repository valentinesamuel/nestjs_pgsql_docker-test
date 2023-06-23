import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../src/user/user.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/user/entities/user.entity';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  const mockUsers = [
    {
      id: Date.now(),
      name: 'Mary',
      email: 'mary@marily.com',
      password: 'password',
      coments: [],
    },
  ];

  const mockUserRepository = {
    find: jest.fn().mockResolvedValue(mockUsers),
    create: jest.fn((dto) => dto),
    save: jest.fn((dto) =>
      Promise.resolve({
        id: String(Date.now()),
        ...dto,
      }),
    ),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUserRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  it('/user (GET)', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .expect(mockUsers);
  });

  it('/user (POST)', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({
        name: 'Dave',
        email: 'davy@santan.com',
        password: 'pass',
        comments: [],
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          id: expect.any(String),
          name: 'Dave',
          email: 'davy@santan.com',
          password: 'pass',
          comments: [],
        });
      });
  });

  it('/user (POST) ---> Bad Request', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({
        name: 2,
      })
      .expect(400, {
        statusCode: 400,
        message: [
          'name must be a string',
          'email must be a string',
          'password must be a string',
        ],
        error: 'Bad Request',
      });
  });
});
