const request = require('supertest')
const app = require('../app')
const {
   User,
   sequelize
} = require('../database/models/')
const {
   queryInterface
} = sequelize
const {
   signToken
} = require('../helpers/access_token')

const email = 'gabriel@admin.com'
let access_token = ''

beforeAll((done) => {
   User.findOne({
         where: {
            email
         }
      })
      .then(res => {
         access_token = signToken({
            id: res.id,
            email: res.email,
            role: res.role
         }, process.env.SECRET)
         done()
      })
      .catch(err => {
         done()
      });
})

afterAll((done) => {
   queryInterface.bulkDelete('Products', null, {})
      .then(() => {
         done()
      })
      .catch(err => {
         done()
      })
})

describe("TEST /products", function () {
   it("Test create a product no access_token", function (done) {
      request(app)
         .post("/products/")
         .then((response) => {
            const {
               body,
               status
            } = response;
            expect(status).toBe(401);
            expect(body).toHaveProperty("error", "Authentication Failed");
            done();
         })
         .catch((err) => {
            console.log(err);
            done();
         });
   });

   it("Test create a product no input", function (done) {
      request(app)
         .post("/products/")
         .set('access_token', access_token)
         .send({
            name: "",
            image_url: "https://sm.ign.com/ign_ap/review/n/nvidia-gef/nvidia-geforce-rtx-3090-founders-edition-review_28yv.jpg",
            price: 1,
            stock: 1
         })
         .then((response) => {
            const {
               body,
               status
            } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty('error', expect.any(String));
            done();
         })
         .catch((err) => {
            console.log(err);
            done();
         });
   });

   it("Test create a product tock/price negative number", function (done) {
      request(app)
         .post("/products/")
         .set('access_token', access_token)
         .send({
            name: "Test Produk 1",
            image_url: "https://sm.ign.com/ign_ap/review/n/nvidia-gef/nvidia-geforce-rtx-3090-founders-edition-review_28yv.jpg",
            price: 1,
            stock: -10
         })
         .then((response) => {
            const {
               body,
               status
            } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty('error', expect.any(String));
            done();
         })
         .catch((err) => {
            console.log(err);
            done();
         });
   });

   it("Test create a product wrong input type", function (done) {
      request(app)
         .post("/products/")
         .set('access_token', access_token)
         .send({
            name: "Test Produk 1",
            image_url: "ini string biasa",
            price: "wkwk",
            stock: -10
         })
         .then((response) => {
            const {
               body,
               status
            } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty('error', expect.any(String));
            done();
         })
         .catch((err) => {
            console.log(err);
            done();
         });
   });

   it("Test update a product no access_token", function (done) {
      request(app)
         .post("/products/1")
         .set('access_token', '')
         .send({
            name: "Test Product Update",
            image_url: "https://sm.ign.com/ign_ap/review/n/nvidia-gef/nvidia-geforce-rtx-3090-founders-edition-review_28yv.jpg",
            price: 1,
            stock: 10
         })
         .then((response) => {
            const {
               body,
               status
            } = response;
            expect(status).toBe(401);
            expect(body).toHaveProperty("error", "Authentication Failed");
            done();
         })
         .catch((err) => {
            console.log(err);
            done();
         });
   });

   it("Test update a product tock/price negative number", function (done) {
      request(app)
         .post("/products/1")
         .set('access_token', access_token)
         .send({
            name: "Test Produk Update",
            image_url: "https://sm.ign.com/ign_ap/review/n/nvidia-gef/nvidia-geforce-rtx-3090-founders-edition-review_28yv.jpg",
            price: 1,
            stock: -10
         })
         .then((response) => {
            const {
               body,
               status
            } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("error", expect.any(String));
            done();
         })
         .catch((err) => {
            console.log(err);
            done();
         });
   });

   it("Test update a product wrong input type", function (done) {
      request(app)
         .post("/products/1")
         .set('access_token', access_token)
         .send({
            name: "Test Produk Update",
            image_url: "ini string biasa",
            price: "wkwk",
            stock: -10
         })
         .then((response) => {
            const {
               body,
               status
            } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("error", expect.any(String));
            done();
         })
         .catch((err) => {
            console.log(err);
            done();
         });
   });

   it("Test delete a product no access_token", function (done) {
      request(app)
         .delete("/products/1")
         .set('access_token', '')
         .then((response) => {
            const {
               body,
               status
            } = response;
            expect(status).toBe(401);
            expect(body).toHaveProperty("error", "Authentication Failed");
            done();
         })
         .catch((err) => {
            console.log(err);
            done();
         });
   });
});