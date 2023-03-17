import { test } from '@japa/runner'

test('QuestionsController.createQuestions', async ({client,assert}) => {
  let endpoint = "/api/v1/questions/create"
  let body = {
    "question": "PRUEBAAAA",
    "options": [
        {
            "opcion":"esta es correcta",
            "iscorrect":true
        },{
            "opcion":"incorrecta",
            "iscorrect":false
        }]
      }
  const response = await client.post(endpoint).form(body)
  response.assertStatus(200)
  assert.isObject(response.body())
})
