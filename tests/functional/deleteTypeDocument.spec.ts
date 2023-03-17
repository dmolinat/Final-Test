import { test } from '@japa/runner'

test('TypeDocumentsController.deleteTypeDocument', async ({client,assert}) => {
  let endpoint = "/api/v1/typeDocument/deleteTypeDocuments/4"
  const response = await client.delete(endpoint)
  response.assertStatus(200)
  assert.isObject(response.body())
})
