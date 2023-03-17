import { test } from '@japa/runner'

test('AnswersController.updateAnswer', async ({client,assert}) => {
  let endpoint = "/api/v1/questions/updateAnswer/10"
  let body = {
    "opcion": "TE AMO MUCHO MI VIDA",
    "iscorrect": true
  }
  const response = await client.put(endpoint).form(body)
  response.assertStatus(200)
  assert.isObject(response.body())
})
