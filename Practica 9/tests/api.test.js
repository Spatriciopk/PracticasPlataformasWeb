const request = require("supertest");

const app = require("../src/app");

//Testing get all users
//describe()
//it que me respondan con 200


// 18. En api.test.js organizar las pruebas usando describe

describe("GET /users", () => {
    it("TEST 01 responde con json y contiene una lista de usuarios", (done) => {
        request(app)
            .get("/users")
            .set("Aceptado", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});

// 19. Casos de prueba para id

describe("GET /users/:id", () => {
    it("TEST 02 verificar usuario por id", (done) => {
        request(app)
            .get("/users/U001")
            .set("Aceptado", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
    });

    it("TEST 03 verificar usuario por id, incorrecto", (done) => {
        request(app)
            .get("/users/afdfdf")
            .set("Aceptado", "application/json")
            .expect("Content-Type", /json/)
            .expect(404)
            .expect('"Usuario no encontrado"')
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })


    it("TEST 04 verificar usuario por id, cuando existe", (done) => {
        request(app)
            .get("/users/U001")
            .set("Aceptado", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .expect('"Usuario 001 correcto"')
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

});

// 20. Caso de prueba para la ruta de creación de un nuevo usuarios

describe("POST /users", () => {
    it("TEST 05 usuario creado", (done) => {
        const data = {
            username: "admin",
            password: "admin01",
        };
        request(app)
            .post("/users")
            .send(data)
            .set("Aceptado", "application/json")
            .expect("Content-Type", /json/)
            .expect(201)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

    it("TEST 06 usuario no creado", (done) => {
        const data = {};
        request(app)
            .post("/users")
            .send(data)
            .set("Aceptado", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .expect('"Usuario no creado"')
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});