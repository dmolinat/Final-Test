import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TypeDocument from 'App/Models/TypeDocument';

export default class TypeDocumentsController {
  public async createTypeDocument({request, response}: HttpContextContract){
    try{
      const data_typeDocument = request.all();
      const typeDocumentObj = new TypeDocument();
      typeDocumentObj.id = data_typeDocument.id;
      typeDocumentObj.name = data_typeDocument.name;
      typeDocumentObj.state = data_typeDocument.state;
      await typeDocumentObj.save();
      return response.status(200).json({"state": true,"message": "Tipo documento creada exitosamente"})
    }catch(e){
      console.log(`e -> ${e}`)
      return response.status(500).json({"state": false, "message": "Error al crear el tipo de documento"})
    }
  }

  public async getTypeDocument({response}: HttpContextContract){
    try{
      const L_typeDocument = await TypeDocument.query().select('id', 'name').where('state',true);
      return response.status(200).json({"state": true, "typeDocuments": L_typeDocument})
    }catch(e){
      return response.status(500).json({"state": false, "message": "Error al listar las Tipo de documentos"})
    }
  }

  public async deleteTypeDocument({request,response}: HttpContextContract){
    const id = request.param('id_typeDocument')
    try{
      await TypeDocument.query().delete().where('id',id)
      return response.status(200).json({"state": true, "message": "Tipo de documento eliminado con exito"})
    }catch(e){
      return response.status(500).json({"state": false,"message": "Error al eliminar tipo de documento"})
    }
  }

  public async updateTypeDocument({request,response}: HttpContextContract){
    const id_typeDocument=request.param('id_typeDocument');
    const {name,state} = request.all();
    try{
      await TypeDocument.query().where('id',id_typeDocument).update({
        name: name,
        state: state
    });
    return response.status(200).json( {
      "state": true, "message": "Tipo de documento Editada con exito"})
    }catch(e){
      return response.status(500).json({"state": false,"message": "Error al editar la Tipo de documento"})
    }
  }
}
