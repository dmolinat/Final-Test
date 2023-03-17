import { test } from '@japa/runner'

test('QuestionsController.updateQuestion', async ({client,assert}) => {
  let endpoint = "/api/v1/questions/updateQuestion/2"
  let body = {
    "question": "TODOS TIENEN 10"
  }
  const response = await client.put(endpoint).form(body)
  response.assertStatus(200)
  assert.isObject(response.body())
})
