import { describe, expect, it } from 'vitest';
import request from 'supertest';
const api = 'http://localhost:3000';

describe('Test', () => {
  const deleteId = async (id: string) => {
    await request(api).delete('/api'.concat(id)).expect(204);
  };

  it('/ (GET)', async () => {
    const res = await request(api).get('/api').expect(200);

    res.body.forEach((row: any) => {
      ['name', 'meaning'].forEach((property) => {
        expect(row).toHaveProperty(property);
      });
    });
  });

  it.only('/ (POST)', async () => {
    const payload = {
      name: 'name-'.concat(new Date().valueOf().toString()),
      meaning: 'algum significado-'.concat(new Date().getMinutes().toString()),
    };

    const res = await request(api).post('/api').send(payload);

    expect(res.body).toMatchObject(payload);
    expect(res.status).equal(200);

    deleteId(res.body.id);
  }, 5000);
});
