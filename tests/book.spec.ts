import { describe, expect, it } from 'vitest';
import request from 'supertest';

// const api = 'https://means.vercel.app';
const api = 'http://localhost:8000';

describe('Test (E2e)', () => {
  it('find all', async () => {
    const uri = '/api/books';

    const res = await request(api).get(uri);

    expect(res.status).equal(200);
    res.body.forEach((book: { name: string }) => {
      expect(book).toHaveProperty('id');
      expect(book).toHaveProperty('name');
    });
  });
});
