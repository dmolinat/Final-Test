import { test } from '@japa/runner'

test('AnswersController.getOptions', async ({client,assert}) => {
  let endpoint = "/api/v1/questions/getOptions/1"
  const response = await client.get(endpoint)
  response.assertStatus(200)
  assert.isObject(response.body())
})
