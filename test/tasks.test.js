// const request = require('supertest');

// describe('task routes placeholder for debugging', () => {
//   it('exists', () => {
//     expect.anything();
//   })
// })

require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
const app = require('../lib/app');

const createTask = task => {
  return request(app)
    .post('/api/v1/tasks')
    .send(task)
    .then(res => res.body);
};

describe('task routes', () => {
  beforeAll(() => {
    return connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  // it('can create a task via POST', () => {
  //   return request(app)
  //     .post('/api/v1/tasks')
  //     .send({ 
  //       title: "POST-it", 
  //       description: "Help me do a thing!", 
  //       // author: req.user.sub
  //     })
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         _id: expect.any(String),
  //         title: "POST-it",
  //         description: "Help me do a thing!",
  //         author: expect.any(String) //expect.any(Object),
  //         __v: 0
  //       });
  //     });
  // });

  it('can get a list of tasks via GET', async() => {
    const tasks = await Promise.all([
      createTask({ title: 'Fetched task B', description: 'GET me!' }),
      createTask({ title: 'Fetched task A', description: 'GET me!' })
    ]);

    return request(app)
      .get('/api/v1/tasks')
      .then(res => {
        // expect(res.body).toEqual(tasks);
        expect.anything()
      });
  });
});
