import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'

export async function TestGenerarToken(payload:any) {
  const opciones = {expiresIn: "30 mins"}
  return jwt.sign(payload, Env.get('JWT_SECRET_KEY'), opciones)
}
