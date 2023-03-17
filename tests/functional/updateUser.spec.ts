import { test } from '@japa/runner'

test('UsersController.updateUser', async ({client,assert}) => {
  let endpoint = "/api/v1/user/update/1"
  let body = {
    "rolId": 1
  }
  const response = await client.put(endpoint).form(body)
  response.assertStatus(200)
  assert.isObject(response.body())
})
