import { test } from '@japa/runner'

test('TypeDocumentsController.createTypeDocument', async ({client,assert}) => {
  let endpoint = "/api/v1/typeDocument/create"
  let body = {
    "name": "TEST",
    "state": true
  }
  const response = await client.post(endpoint).form(body)
  response.assertStatus(200)
  assert.isObject(response.body())
})
