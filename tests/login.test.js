const request = require('supertest')
const app = require('../app')

describe("POST /users/login", function () {
	it("Test login success ", function (done) {
		request(app)
			.post("/users/login")
			.send({ email: "gabriel@admin.com", password: "gabriel@admin.com" })
			.then((response) => {
				const { body, status } = response;
				expect(status).toBe(200);
				expect(body).toHaveProperty("access_token", expect.any(String));
				done();
			})
			.catch((err) => {
				done();
			});
    });
    
    it("Test login invalid email/password ", function (done) {
		request(app)
			.post("/users/login")
			.send({ email: "gabriel@admin.com", password: "asdad1sad1" })
			.then((response) => {
				const { body, status } = response;
				expect(status).toBe(400);
				expect(body).toHaveProperty("error", "Account not found");
				done();
			})
			.catch((err) => {
				done();
			});
    });
    
    it("Test login email/password not found in db", function (done) {
		request(app)
			.post("/users/login")
			.send({ email: "gabriel123123@admin.com", password: "gabriel@admin.com" })
			.then((response) => {
				const { body, status } = response;
				expect(status).toBe(400);
				expect(body).toHaveProperty("error", "Account not found");
				done();
			})
			.catch((err) => {
				done();
			});
    });
    
    it("Test login email & password field empty", function (done) {
		request(app)
			.post("/users/login")
			.send({ email: "", password: "" })
			.then((response) => {
				const { body, status } = response;
				expect(status).toBe(400);
				expect(body).toHaveProperty("error", `Email/password didn't match`);
				done();
			})
			.catch((err) => {
				done();
			});
	});
});