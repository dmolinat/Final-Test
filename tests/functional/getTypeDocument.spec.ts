import { test } from '@japa/runner'

test('TypeDocumentsController.updateTypeDocument', async ({client,assert}) => {
  let endpoint = "/api/v1/typeDocument/getTypeDocuments"
  const response = await client.get(endpoint)
  response.assertStatus(200)
  assert.isObject(response.body())
})
