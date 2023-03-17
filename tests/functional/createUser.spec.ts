import { test } from '@japa/runner'

test('UsersController.createUser', async ({client,assert}) => {
  let endpoint = "/api/v1/user/create"
  const dig = String((Math.floor(Math.random()*10)+1)) + String((Math.floor(Math.random()*10)+1)) + String((Math.floor(Math.random()*10)+1))
  let body = {
    "firstName": "T",
    "secondName": "E",
    "surname": "S",
    "secondSurName": "T",
    "typeDocument": 1,
    "documentNumber": dig,
    "email": dig+"@hotma.co",
    "password": "123456",
    "phone": dig
  }
  const response = await client.post(endpoint).form(body)
  response.assertStatus(200)
  assert.isObject(response.body())
})
