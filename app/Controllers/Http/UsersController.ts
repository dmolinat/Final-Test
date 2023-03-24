import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
const bcryptjs = require('bcryptjs')
import Env from '@ioc:Adonis/Core/Env'
import jwt from 'jsonwebtoken'
import roles from 'App/Models/Rol';

export default class UsersContUserler {
  public async login({ request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    try {
      const user = await User.findBy('email',email)
      if (!user) {
        throw Error('email no encontrado');
      }

      const validPassword = bcryptjs.compareSync(password, user.password)
      if (!validPassword) {
        throw Error('Contrasena invalida');
      }

      const payload ={
        nombres: user.first_name,
        id: user.id,
        cedula: user.document_number,
      }
      const token = await this.generarToken(payload)


      const user_rol = await roles.findBy('id',user.rol_id)
      if(!user_rol){
        throw Error('Rol no encontrado');
      }

      response.status(200).json({
        state: user.state,
        id: user.id,
        name: (user.first_name).concat(" ",user.second_name," ",user.surname," ",user.second_sur_name),
        role: user_rol.name,
        msg: "Ingreso exitoso",
        token: token
      })
    } catch (error) {
      console.log(`error -> ${error}`)
      response.status(400).json({state: false, message: "password or email invalid."})
    }
  }

  private async generarToken(payload: any){
    const opciones = {expiresIn: "30 mins"}
    return jwt.sign(payload, Env.get('JWT_SECRET_KEY'), opciones)
  }

  public async verificarToken(authorizationHeader: string){
    let token = authorizationHeader.split(' ')[1]
    jwt.verify(token,Env.get('JWT_SECRET_KEY'), (e) =>{
      if(e){
        console.log(`e token expirado -> ${e}`)
        throw new Error('Token expirado');
      }
    })
    return true
  }

  public async createUser({request, response}: HttpContextContract){
    try{
      const data_User = request.all();
      const UserObj = new User();
      UserObj.first_name = data_User.firstName
      UserObj.second_name = data_User.secondName
      UserObj.surname = data_User.surname
      UserObj.second_sur_name = data_User.secondSurName
      UserObj.type_document = data_User.typeDocument
      UserObj.document_number = data_User.documentNumber
      UserObj.email = data_User.email

      //Se encripta la contrasena con bcryptjs
      const salt = bcryptjs.genSaltSync();
      UserObj.password =  bcryptjs.hashSync(data_User.password,salt)

      //No hay criterio para el rol, sera aleatorio, entre 1: admin o 2: estudiante
      UserObj.rol_id = (Math.floor(Math.random()*2)+1)      //randint(1,2)
      UserObj.phone = data_User.phone
      UserObj.state = true      //Por default los usuarios creados estan habilitados para usarse

      await UserObj.save();
      return response.status(200).json({"state": true,"message": "Estudiante creado exitosamente"})
    }catch(e){
      console.log(`e -> ${e}`)
      return response.status(500).json({"state": false, "message": "Fallo en la creación del estudiante"})
    }
  }

  public async getUsers({response}: HttpContextContract){
    try{
      const L_User = await User.query().select('first_name','second_name','surname','second_sur_name','type_document','document_number','email','phone').where({});
      return response.status(200).json({"state": true,"message": "Listado de estudiantes", "users": L_User})
    }catch(e){
      return response.status(500).json({"state": false, "message": "Fallo en el listado de estudiantes"})
    }
  }

  public async updateUser({request,response}: HttpContextContract){
    const id_User=request.param('id_user');
    const data_User = request.all();
    try{
      await User.query().where('id',id_User).update({
        first_name: data_User.firstName,
        second_name: data_User.secondName,
        surname: data_User.surname,
        second_sur_name: data_User.secondSurName,
        type_document: data_User.typeDocument,
        document_number: data_User.documentNumber,
        email: data_User.email,
        password: data_User.password,
        rol_id: data_User.rolId,
        phone: data_User.phone,
        state: data_User.state
    });
    return response.status(200).json( {
      "state": true, "message": "Se actualizo correctamente"})
    }catch(e){
      return response.status(500).json({"state": false,"message": "Error al actualizar"})
    }
  }

  public async getUser({request,response}: HttpContextContract){
    const id = request.param('id_user')
    try{
      const user = await User.query().select('first_name','second_name','surname','second_sur_name','type_document','document_number','email','phone').where('id',id)
      return response.status(200).json(user)
    }catch(e){
      return response.status(500).json({"state": false,"message": "Error al consultar el detalle del usuario"})
    }
  }


  public getPayload(authorizationHeader:string) {
    let token = authorizationHeader.split(' ')[1]
    const payload = jwt.verify(token, Env.get("JWT_SECRET_KEY"), {complete: true}).payload
    return payload
  }


}
