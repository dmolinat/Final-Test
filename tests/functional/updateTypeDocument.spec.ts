import { test } from '@japa/runner'

test('AnswersController.updateAnswer', async ({client,assert}) => {
  let endpoint = "/api/v1/typeDocument/updateTypeDocuments/3"
  let body = {
    "name": "unbanned",
    "state": true
  }
  const response = await client.put(endpoint).form(body)
  response.assertStatus(200)
  assert.isObject(response.body())
})
