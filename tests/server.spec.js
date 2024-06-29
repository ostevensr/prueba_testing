const request = require("supertest");
const server = require("../index");

describe('Testing API de Cafetería Nanacao', () => {

    it('GET/cafes - Devolver status 200 y un array con al menos 1 objeto', async () => {
        const response = await request(server).get('/cafes').send();
        const cafes = response.body;

        expect(response.statusCode).toBe(200);
        expect(cafes).toBeInstanceOf(Array);
        expect(cafes.length).toBeGreaterThan(0);
        expect(cafes[0]).toBeInstanceOf(Object);

    });

    it('DELETE/cafes/:id - Devolver status 404 si el id no existe', async () => {

        const idNoExiste = 100;
        const response = await request(server)
            .delete(`/cafes/${idNoExiste}`)
            .set('Authorization', 'Bearer token')
            .send();

        expect(response.statusCode).toBe(404);

    });

    it('POST/cafes -  Agregar un café nuevo y devolver status 201', async () => {
        const nuevoCafe = { id: 5, nombre: 'Latte'};
        const response = await request(server).post('/cafes').send(nuevoCafe);

        expect(response.statusCode).toBe(201);
        expect(response.body).toMatchObject(nuevoCafe);

    });

    it('PUT/cafes/:id - Devolver status 400 si los ids no coinciden', async () => {
        const idParametro = 1;
        const idPayload = 2;
        const cafeUpdated = { id: idPayload, nombre: 'Café actualizado', precio: 60 };

        const response = await request(server).put(`/cafes/${idParametro}`).send(cafeUpdated);

        expect(response.statusCode).toBe(400);

    });

});
