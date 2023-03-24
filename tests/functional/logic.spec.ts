import { test } from '@japa/runner'

test('UsersController.login', async ({client,assert}) => {
  let endpoint = "/api/v1/login"
  let body = {
    "email": "18@hotma.co",
    "password": "123456"
  }
  const response = await client.post(endpoint).form(body)
  response.assertStatus(200)
  assert.isObject(response.body())
})
