require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const connect = require('../lib/utils/connect');
const app = require('../lib/app');

const createTask = task => {
  return request(app)
    .post('/api/v1/tasks/')
    .send(task)
    .then(res => res.body)
}

describe('tasks routes', () => {
  beforeAll(() => {
    return connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a task via POST route', () => {
    return request(app)
      .post('/api/v1/tasks/')
      .send({ title: "POST-it", description: "Help me do a thing!" })
      .then(res => {
        console.log(res.text);
        expect(res.body).toEqual({
          _id: expect.any(String),          
          title: "POST-it",
          description: "Help me do a thing!",
          __v: 0
        });
      });
  });
});
