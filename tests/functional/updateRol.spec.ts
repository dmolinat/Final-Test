import { test } from '@japa/runner'

test('RolesController.updateRol', async ({client,assert}) => {
  let endpoint = "/api/v1/rol/updateRol/3"
  let body = {
    "name": "Banned3",
    "state": false
}
  const response = await client.put(endpoint).form(body)
  response.assertStatus(200)
  assert.isObject(response.body())
})
