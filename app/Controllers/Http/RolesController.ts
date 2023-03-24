import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Rol from 'App/Models/Rol';

export default class RolesController {
  public async createRol({request, response}: HttpContextContract){
    try{
      const data_Rol = request.all();
      const RolObj = new Rol();
      RolObj.id = data_Rol.id;
      RolObj.name = data_Rol.name;
      RolObj.state = data_Rol.state;
      await RolObj.save();
      return response.status(200).json({"state": true,"message": "Rol creado exitosamente"})
    }catch(e){
      return response.status(500).json({"state": false, "message": "Error al crear Rol"})
    }
  }

  public async getRol({response}: HttpContextContract){
    try{
      const L_Rol = await Rol.query().select('id', 'name').where('state',true);
      return response.status(200).json({"state": true, "Roles": L_Rol})
    }catch(e){
      return response.status(500).json({"state": false, "message": "Error al listar roles"})
    }
  }

  public async deleteRol({request,response}: HttpContextContract){
    const id = request.param('id_rol')
    try{
      await Rol.query().delete().where('id',id)
      return response.status(200).json({"state": true, "message": "Rol eliminado con exito"})
    }catch(e){
      return response.status(500).json({"state": false,"message": "Error al eliminar Rol"})
    }
  }

  public async updateRol({request,response}: HttpContextContract){
    const id_Rol=request.param('id_rol');
    const {name,state} = request.all();
    try{
      await Rol.query().where('id',id_Rol).update({
        name: name,
        state: state
    });
    return response.status(200).json( {
      "state": true, "message": "Rol editado con exito"})
    }catch(e){
      return response.status(500).json({"state": false,"message": "Error al editar Rol"})
    }
  }


}
