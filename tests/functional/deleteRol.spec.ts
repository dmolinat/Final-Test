import { test } from '@japa/runner'

test('RolesController.deleteRol', async ({client,assert}) => {
  let endpoint = "/api/v1/rol/deleteRol/4"
  const response = await client.delete(endpoint)
  response.assertStatus(200)
  assert.isObject(response.body())
})
