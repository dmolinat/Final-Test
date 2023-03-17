import { test } from '@japa/runner'
import User from 'App/Models/User'
import { TestGenerarToken } from './TestGenerarToken'
const bcryptjs = require('bcryptjs')

test('UsersController.getUser', async ({client,assert}) => {
  let endpoint = "/api/v1/user/getUser/1"
  const user_test = await User.findBy('email',"1802@hotma.co")

  if (!user_test) {
    const response = await client.get(endpoint).header('Authorization', `Bearer a`)
    response.assertStatus(200)
    assert.isObject(response.body())
  }

  const validPassword = bcryptjs.compareSync("123456", user_test?.password)
  if (!validPassword) {
    const response = await client.get(endpoint).header('Authorization', `Bearer a`)
    response.assertStatus(200)
    assert.isObject(response.body())
  }

  const payload ={
    nombres: user_test?.first_name,
    id: user_test?.id,
    cedula: user_test?.document_number,
  }

  const token = await TestGenerarToken(payload)
  const response = await client.get(endpoint).header('Authorization', `Bearer ${token}`)
  response.assertStatus(200)
  assert.isArray(response.body())
})
