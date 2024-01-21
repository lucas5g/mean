import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { CreateWordType } from '@/utils/schemas';
const api = 'http://localhost:3000';

describe('Test', () => {
  let id: string;

  beforeAll(async () => {
    const payload: CreateWordType = {
      name: 'name-'.concat(new Date().valueOf().toString()),
      meaning: 'algum significado-'.concat(new Date().getMinutes().toString()),
      fixed: false,
    };

    const res = await request(api).post('/api').send(payload);

    expect(res.body).toMatchObject(payload);
    expect(res.status).equal(200);

    id = res.body.id;
  });

  it('/ (GET)', async () => {
    const res = await request(api).get('/api').expect(200);

    res.body.forEach((row: any) => {
      ['name', 'meaning'].forEach((property) => {
        expect(row).toHaveProperty(property);
      });
    });
  });

  it('/:id (PATCH)', async () => {
    const res = await request(api)
      .patch('/api/'.concat(id))
      .send({ fixed: true });

    expect(res.body.fixed).equal(true);
  });

  afterAll(async () => {
    await request(api).delete('/api/'.concat(id)).expect(204);
  });
});
