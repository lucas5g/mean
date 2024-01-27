import { describe, expect, it } from 'vitest';
import request from 'supertest';

// const api = 'https://means.vercel.app';
const api = 'http://localhost:8000';

describe('Test (E2e)', () => {
  it('find all', async () => {
    const uri = '/api';

    const res = await request(api).get(uri);

    expect(res.body).length.lessThanOrEqual(200);
  }, 6000);

  it('find one', async () => {
    const res = await request(api).get('/api/1');

    ['id', 'name', 'meaning', 'fixed'].forEach((property) => {
      expect(res.body).toHaveProperty(property);
    });
  });

  it('create and delete', async () => {
    const payload = {
      name: 'test-1',
      meaning: 'desc',
      fixed: false,
    };

    const res = await request(api).post('/api').send(payload);

    expect(res.body).toMatchObject(payload);

    await request(api).delete('/api/'.concat(res.body.id)).expect(204);
  }, 6000);
});
