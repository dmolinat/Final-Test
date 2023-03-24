import { test } from '@japa/runner'

test('UsersController.NOT(login)', async ({client,assert}) => {
  let endpoint = "/api/v1/login"
  let body = {
    "email": "xdsdsd@hotma.co",
    "password": "123456"
  }
  const response = await client.post(endpoint).form(body)
  response.assertStatus(400)
  assert.isObject(response.body())
})
