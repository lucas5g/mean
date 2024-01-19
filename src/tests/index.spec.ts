import { describe, expect, it } from 'vitest';
import request from 'supertest';
const api = 'http://localhost:8000';

describe('Test', () => {
  const deleteId = async (id: string) => {
    await request(api).delete('/'.concat(id)).expect(204);
  };

  it('/ (GET)', async () => {
    const res = await request(api).get('/').expect(200);

    res.body.forEach((row: any) => {
      ['name', 'meaning'].forEach((property) => {
        expect(row).toHaveProperty(property);
      });
    });
  });

  it('/ (POST)', async () => {
    const payload = {
      name: 'name-'.concat(new Date().valueOf().toString()),
      meaning: 'algum significado-'.concat(new Date().getMinutes().toString()),
    };

    const res = await request(api).post('/').send(payload);

    expect(res.body).toMatchObject(payload);
    expect(res.status).equal(201);

    deleteId(res.body.id);
  });
});
