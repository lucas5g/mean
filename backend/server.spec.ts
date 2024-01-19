import { describe, it } from "vitest";
import request from 'supertest'
import { app } from "./server";

// const request = supertest(app.server)
// const api = 'http://localhost:8000' 
const api = app.server

describe('Test', () => {

  it('/ (GET)', async () => {

    await request(api)
      .get('/')
      .expect(200)

    // console.log(res.body)
  })

  it.only('/ (POST)', async() => {
    const res = await request(api)
      .post('/')
      .send({word: 'agastado', meaning: 'Que está desgastado, aborrecido ou irritado.'})

    console.log(res.body)
  })
})