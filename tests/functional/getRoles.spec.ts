import { test } from '@japa/runner'

test('RolesController.getRol', async ({client,assert}) => {
  let endpoint = "/api/v1/rol/getRoles"
  const response = await client.get(endpoint)
  response.assertStatus(200)
  assert.isObject(response.body())
})
