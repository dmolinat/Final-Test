import { test } from '@japa/runner'

test('RolesController.createRol', async ({client,assert}) => {
  let endpoint = "/api/v1/rol/create"
  let body = {
    "name": "TEST",
    "state": true
  }
  const response = await client.post(endpoint).form(body)
  response.assertStatus(200)
  assert.isObject(response.body())
})
