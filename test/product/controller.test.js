const supertest = require('supertest')

const productController = require('../../src/controllers/product.controller')
const app = require('../../index')

const request = supertest(app)

describe('Product Controller', () => {
  beforeAll(async () => {
    // await testDbConnection()
  })

  describe('create()', () => {
    test('given a valid product data then should create the product', async () => {

      const product = {
        name: 'service test',
        description: 'service creation test',
        // is_real_profit: false,
        price: 123.32,
        brand_id: 1,
        category_id: 1
      }

      const response = await request
        .post('/product')
        .send(product)

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('product')
      expect(response.body.product).toHaveProperty('name', product.name)
    })
  })
})