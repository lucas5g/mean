import { beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

// const api = 'https://means.vercel.app'
const api = 'http://localhost:8000'

describe('Test (E2e)', () => {

  beforeAll(async () => {

  })

  it('find all', async () => {

    const res = await request(api)
      .get("/api")

    expect(res.body).length.greaterThan(0)
  }, 5000)

  it.only('find one', async() => {
    const res = await request(api)
      .get('/api/1');

    ['id', 'name', 'meaning'].forEach(property => {
      expect(res.body).toHaveProperty(property)
    })
  })
})