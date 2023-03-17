import { test } from '@japa/runner'

test('QuestionsController.getQuestions', async ({client,assert}) => {
  let endpoint = "/api/v1/questions/getQuestions"
  const response = await client.get(endpoint)
  response.assertStatus(200)
  assert.isObject(response.body())
})
