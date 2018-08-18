import request from 'supertest';
import { Test } from '@nestjs/testing';
import { EventsModule } from './events.module';
import { INestApplication } from '@nestjs/common';

describe('EventsModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [EventsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should update other players positions list on connect', async () => {
    // TODO: add test
    // const WebSocket = require('ws');

    // const socket1 = new WebSocket('ws://localhost:8000');
    // socket1.onopen = function () {
    //     socket1.send(JSON.stringify({
    //         event: 'message',
    //         data: '0 0 0 0',
    //     }));
    // }
    // const socket2 = new WebSocket('ws://localhost:8000');
    // socket2.onopen = function () {
    //     socket2.send(JSON.stringify({
    //         event: 'message',
    //         data: '1 1 1 1',
    //     }));
    // };
    // socket2.onmessage = function (data) {
    //     console.log(data);
    //     expect(data).toBe('0 0 0 0');
    //     socket1.close();
    //     socket2.close();
    // }
    // // socket2.onmessage((data) => {
    // //     console.log(data);
    // // }).then()
    // // fetchData(callback);

    // console.log('Disconnected');

    // // return request(app.getHttpServer())
    // //   .get('/')
    // //   .expect(200)
    // //   .expect('Hello World!');
  });
});
