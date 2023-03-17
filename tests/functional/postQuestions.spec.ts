import { test } from '@japa/runner'

test('FormsController.postQuestions', async ({client,assert}) => {
  let endpoint = "/api/v1/form/postquestions"
  let body = {
    "estudianteId": 1,
    "answers": [14,15,16,17]
  }
  const response = await client.post(endpoint).form(body)
  response.assertStatus(200)
  assert.isObject(response.body())
})
