import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersController from 'App/Controllers/Http/UsersController'
import User from 'App/Models/User'

export default class VerifyAdmin {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const authorizationHeader = ctx.request.header('authorization')

    if(authorizationHeader === undefined){
      return ctx.response.status(401).send({
        mensaje: "Falta el token de autorización",})}

    try{
      const usersController = new UsersController()
      const {id} = await usersController.getPayload(authorizationHeader)
      const usuario = await User.find(id)

      if(!usuario){
        return ctx.response.status(401).json({
          msj: 'Token no válido'})}

      if(usuario.rol_id !== 1){      //id_profile = 1, it's admin.
        return ctx.response.status(401).json({msj: 'No tiene permisos para acceder a esta ruta'})
      }
      await next()
    }catch(error){
      console.log(`error -> ${error}`);
      ctx.response.status(400).json({"msj": "Token no valido"})
    }
  }
}
