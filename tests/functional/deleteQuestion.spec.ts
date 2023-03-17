import { test } from '@japa/runner'

test('QuestionsController.getQuestions', async ({client,assert}) => {
  let endpoint = "/api/v1/questions/deleteQuestion/1"
  const response = await client.delete(endpoint)
  response.assertStatus(200)
  assert.isObject(response.body())
})
