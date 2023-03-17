import { test } from '@japa/runner'

test('AnswersController.createAnswer', async ({client,assert}) => {
  let endpoint = "/api/v1/answer/create"
  let body = {
    "opcion": "Teamo",
    "is_correct": true,
    "question_id": 2,
    "state": true
  }
  const response = await client.post(endpoint).form(body)
  response.assertStatus(200)
  assert.isObject(response.body())
})
