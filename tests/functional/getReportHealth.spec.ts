import { test } from '@japa/runner'

test('HealthController.getReportHealth', async ({client,assert}) => {
  let endpoint = "/health"
  const response = await client.get(endpoint)
  response.assertStatus(200)
  assert.isObject(response.body())
})
