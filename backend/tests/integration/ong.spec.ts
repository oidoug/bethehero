import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import { connection } from '../../src/database/connection';
import app from '../../src/app';

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  after(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(app).post('/ongs')
      // .set('Authorization', 'iddddd')
      .send({
        name: "ONG Name",
        email: "ong@email.com",
        whatsapp: "12345678901",
        city: "City",
        uf: "EE"
      });
    expect(response.body).to.have.property('id');
    expect(response.body.id).to.have.length(8);
  });
});
