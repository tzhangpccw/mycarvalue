import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { setupApp } from '../src/setup-app';
import exp from 'constants';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        // setupApp(app);
        await app.init();
    });

    it('handles a signup request', () => {
        const email = 'a22@a22.com'
        return request(app.getHttpServer())
            .post('/auth/signup')
            .send({ email, password: 'a22' })
            .expect(201)
            .then((res) => {
                const { id, email } = res.body;
                expect(id).toBeDefined();
                expect(email).toEqual(email)
            });
    });

    it('singup as a new user then get the currently logged user', async () => {
        const email = 'a22@a22.com'

        const res = await request(app.getHttpServer())
            .post('/auth/signup')
            .send({ email, password: 'a22' })
            .expect(201)

        const cookie = res.get('Set-Cookie');

        const { body } = await request(app.getHttpServer())
            .get('/auth/whoami')
            .set('Cookie', cookie)
            .expect(200)

        expect(body.email).toEqual(email)
    })

});
