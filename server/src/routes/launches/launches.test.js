const request = require('supertest');
const app = require('../../app');
const { loadPlanetsData } = require('../../models/planets.model');
const { mongoConnect, mongoDisconect } = require('../../services/mongo');


describe('Launches API', () => {

    beforeAll(async () => {
        await mongoConnect();
        await loadPlanetsData();
    })

    afterAll(async () => {
        await mongoDisconect();
    })


    describe("TEST GET /launches", () => {
        test("It should respond with 200 success", async () => {
            const response = await request(app)
                .get('/api/v1/launches')
                .expect("Content-Type", /json/)
                .expect(200)
        })
    })


    describe('TEST POST /launches', () => {

        const mockMission = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            destination: "Kepler-296 e",
            launchDate: 'January 4, 2028'
        }

        const launchDataWithoutDate = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            destination: "Kepler-296 e",
        }

        const mokcMissionDateError = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            destination: "Kepler-296 e",
            launchDate: 'Helllo'
        }

        test("It should respond with 201 created", async () => {
            const response = await request(app)
                .post('/api/v1/launches')
                .send(mockMission)
                .expect("Content-Type", /json/)
                .expect(201)

            const requestDate = new Date(mockMission.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
            expect(response.body).toMatchObject(launchDataWithoutDate)
            expect(responseDate).toBe(requestDate);
        })

        test("It should catch missing required properities", async () => {
            const response = await request(app)
                .post('/api/v1/launches')
                .send(launchDataWithoutDate)
                .expect("Content-Type", /json/)
                .expect(400)

            expect(response.body).toStrictEqual({
                error: "Error! Missing data!"
            })
        });
        test("It should catch invalid dates", async () => {
            const response = await request(app)
                .post('/api/v1/launches')
                .send(mokcMissionDateError)
                .expect("Content-Type", /json/)
                .expect(400)

            expect(response.body).toStrictEqual({
                error: "Error! Invalid Date"
            })
        });
    });

})

