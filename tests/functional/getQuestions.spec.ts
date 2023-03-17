import { test } from '@japa/runner'

test('FormsController.getQuestions', async ({client,assert}) => {
  let endpoint = "/api/v1/form/getquestions"
  const response = await client.get(endpoint)
  response.assertStatus(200)
  assert.isObject(response.body())
})
