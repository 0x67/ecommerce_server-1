const request = require('supertest')
const app = require('../app')
const {
  User,
  sequelize
} = require('../database/models/')
const {
  queryInterface
} = sequelize

const {Sequelize} = sequelize
const {
  signToken
} = require('../helpers/access_token')

const email = 'gabriel@admin.com'
let access_token = ''

const email2 = 'user2@admin.com'
let access_token2 = ''

let productData = [{
    name: 'RTX 3090 FE',
    category: 'Graphic Cards',
    price: 10000000,
    stock: 10,
    image_url: 'https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ampere/rtx-3090/geforce-rtx-3090-shop-630-d@2x.png',
    UserId: 8,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Ryzen 7 3700X',
    category: 'Processor',
    price: 5000000,
    stock: 5,
    image_url: 'https://www.amd.com/system/files/styles/992px/private/2019-06/238593-ryzen-7-pib-left-facing-1260x709.png?itok=ACRb3hX0',
    UserId: 9,
    createdAt: new Date(),
    updatedAt: new Date()
  },
]

let editData = {
  name: 'Edit Judul',
  category: 'Edit cart',
  price: 111,
  stock: 100,
  image_url: 'https://www.amd.com/system/files/styles/992px/private/2019-06/238593-ryzen-7-pib-left-facing-1260x709.png?itok=ACRb3hX0',
  UserId: 2,
  createdAt: new Date(),
  updatedAt: new Date()
}

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

      return User.findOne({
        where: {
          email: email2
        }
      })
    })
    .then(res => {
      access_token2 = signToken({
        id: res.id,
        email: res.email,
        role: res.role
      }, process.env.SECRET)

      return queryInterface.bulkInsert(
        'Products', productData, {})
    })
    .then(res => {
      done()
    })
    .catch(err => {
      done()
    });
})

afterAll((done) => {
  queryInterface.dropTable('Products', 'force')
    .then(() => {
      return queryInterface.createTable('Products', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING
        },
        image_url: {
          type: Sequelize.STRING
        },
        price: {
          type: Sequelize.INTEGER
        },
        stock: {
          type: Sequelize.INTEGER
        },
        category: {
           type: Sequelize.STRING
        },
        UserId: {
          type: Sequelize.INTEGER,
          references: {
             model: 'Users',
             key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
    })
    .then(() => {
      done()
    })
    .catch(err => {
      console.log(err);
    })
})

describe("TEST /products", function () {
  it("Test CREATE product SUCCESS", function (done) {
    request(app)
      .post("/products/")
      .set('access_token', access_token)
      .send(productData[0])
      .then((response) => {
        const {
          body,
          status
        } = response;
        expect(status).toBe(201);
        expect(body).toHaveProperty('id', expect.any(Number));
        expect(body).toHaveProperty('name', productData[0].name)
        expect(body).toHaveProperty('category', productData[0].category)
        expect(body).toHaveProperty('price', productData[0].price)
        expect(body).toHaveProperty('stock', productData[0].stock)
        expect(body).toHaveProperty('image_url', productData[0].image_url)
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });

  it("Test CREATE product stock is not a number", function (done) {
    request(app)
      .post("/products/")
      .set('access_token', access_token)
      .send({
        name: 'RTX 3090 FE',
        category: 'Graphic Cards',
        price: 10000000,
        stock: 'asdsad',
        image_url: 'https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ampere/rtx-3090/geforce-rtx-3090-shop-630-d@2x.png',
        UserId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },)
      .then((response) => {
        const {
          body,
          status
        } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty('error', 'Product stock must contain only number');
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });

  it("Test CREATE product stock is a negative number", function (done) {
    request(app)
      .post("/products/")
      .set('access_token', access_token)
      .send({
        name: 'RTX 3090 FE',
        category: 'Graphic Cards',
        price: 10000000,
        stock: -1,
        image_url: 'https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ampere/rtx-3090/geforce-rtx-3090-shop-630-d@2x.png',
        UserId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },)
      .then((response) => {
        const {
          body,
          status
        } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty('error', 'Product stock minimum must start from 1');
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });

  it("Test CREATE product price is not a number", function (done) {
    request(app)
      .post("/products/")
      .set('access_token', access_token)
      .send({
        name: 'RTX 3090 FE',
        category: 'Graphic Cards',
        price: 'harga',
        stock: 111,
        image_url: 'https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ampere/rtx-3090/geforce-rtx-3090-shop-630-d@2x.png',
        UserId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },)
      .then((response) => {
        const {
          body,
          status
        } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty('error', 'Product price must contain only number');
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });

  it("Test CREATE product stock is a negative number", function (done) {
    request(app)
      .post("/products/")
      .set('access_token', access_token)
      .send({
        name: 'RTX 3090 FE',
        category: 'Graphic Cards',
        price: -1000,
        stock: 111,
        image_url: 'https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ampere/rtx-3090/geforce-rtx-3090-shop-630-d@2x.png',
        UserId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },)
      .then((response) => {
        const {
          body,
          status
        } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty('error', 'Product price minimum must start from 1');
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });
  
  it("Test CREATE product stock is a negative number", function (done) {
    request(app)
      .post("/products/")
      .set('access_token', access_token)
      .send({
        name: 'RTX 3090 FE',
        category: 'Graphic Cards',
        price: -1000,
        stock: 111,
        image_url: 'https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ampere/rtx-3090/geforce-rtx-3090-shop-630-d@2x.png',
        UserId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },)
      .then((response) => {
        const {
          body,
          status
        } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty('error', 'Product price minimum must start from 1');
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });
  
  it("Test CREATE product image_url is a not an url", function (done) {
    request(app)
      .post("/products/")
      .set('access_token', access_token)
      .send({
        name: 'RTX 3090 FE',
        category: 'Graphic Cards',
        price: 1000,
        stock: 111,
        image_url: 1123,
        UserId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },)
      .then((response) => {
        const {
          body,
          status
        } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty('error', 'Link is not a valid URL');
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });
  
  it("Test CREATE product image_url is not provided", function (done) {
    request(app)
      .post("/products/")
      .set('access_token', access_token)
      .send({
        name: 'RTX 3090 FE',
        category: 'Graphic Cards',
        price: 1000,
        stock: 111,
        UserId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },)
      .then((response) => {
        const {
          body,
          status
        } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty('error', 'Link is required');
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });
  
  it("Test CREATE product name is not defined", function (done) {
    request(app)
      .post("/products/")
      .set('access_token', access_token)
      .send({
        category: 'Graphic Cards',
        price: 1000,
        stock: 111,
        image_url: 'https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ampere/rtx-3090/geforce-rtx-3090-shop-630-d@2x.png',
        UserId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },)
      .then((response) => {
        const {
          body,
          status
        } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty('error', 'Product name is required');
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });

  it("Test GET product SUCCESS", function (done) {
    request(app)
      .get("/products/1")
      .set('access_token', access_token)
      .then((response) => {
        const {
          body,
          status
        } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty('id', expect.any(Number));
        expect(body).toHaveProperty('name', productData[0].name)
        expect(body).toHaveProperty('category', productData[0].category)
        expect(body).toHaveProperty('price', productData[0].price)
        expect(body).toHaveProperty('stock', productData[0].stock)
        expect(body).toHaveProperty('image_url', productData[0].image_url)
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });
  
  it("Test UPDATE product SUCCESS", function (done) {
    request(app)
      .put("/products/1")
      .set('access_token', access_token)
      .send(editData)
      .then((response) => {
        const {
          body,
          status
        } = response;
        expect(status).toBe(201);
        expect(body).toHaveProperty('id', expect.any(Number));
        expect(body).toHaveProperty('name', editData.name)
        expect(body).toHaveProperty('category', editData.category)
        expect(body).toHaveProperty('price', editData.price)
        expect(body).toHaveProperty('stock', editData.stock)
        expect(body).toHaveProperty('image_url', editData.image_url)
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });
  
  it("Test GET product no access_token", function (done) {
    request(app)
      .get("/products/1")
      .then((response) => {
        const {
          body,
          status
        } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty('error', 'Authentication Failed');
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });

  it("Test GET product different access_token or customer access_token", function (done) {
    request(app)
      .get("/products/1")
      .set('access_token', access_token2)
      .then((response) => {
        const {
          body,
          status
        } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty('error', 'Not Authorized');
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });

  it("Test DELETE product SUCCESS", function (done) {
    request(app)
      .delete("/products/1")
      .set('access_token', access_token)
      .then((response) => {
        const {
          body,
          status
        } = response;
        expect(status).toBe(201);
        expect(body).toHaveProperty('message', 'Product successfully deleted')
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });

  it("Test DELETE product different access_token or customer access_token", function (done) {
    request(app)
      .delete("/products/1")
      .set('access_token', access_token2)
      .then((response) => {
        const {
          body,
          status
        } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty('error', 'Not Authorized')
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });

});