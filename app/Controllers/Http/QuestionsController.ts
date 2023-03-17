import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Question from 'App/Models/Question';
import AnswersController from './AnswersController';

export default class QuestionsController {
  public async createQuestions({request, response}: HttpContextContract){
    try{
      const data_question = request.all();
      const questionObj = new Question();
      questionObj.question = data_question.question;
      questionObj.options = JSON.stringify(data_question.options);
      questionObj.state = true;
      await questionObj.save();

      const answerObj = new AnswersController()
      answerObj.createAnswerQuestion(questionObj.id,data_question.options)
      return response.status(200).json({"state": true,"message": "Pregunta creada exitosamente"})
    }catch(e){
      console.log(`e -> ${e}`)
      return response.status(500).json({"state": false, "message": "Error al crear la pregunta"})
    }
  }

  public async getQuestions({response}: HttpContextContract){
    try{
      const L_question = await Question.query().select('question', 'id').where('state',true);
      return response.status(200).json({"state": true, "questions": L_question})
    }catch(e){
      return response.status(500).json({"state": false, "message": "Error al listar las preguntas"})
    }
  }

  public async deleteQuestion({request,response}: HttpContextContract){
    const id = request.param('id_question')
    try{
      await Question.query().delete().where('id',id)
      return response.status(200).json({"state": true, "message": "Pregunta eliminada con exito"})
    }catch(e){
      // console.log(e) OK
      return response.status(500).json({"state": false,"message": "Error al eliminar la pregunta"})
    }
  }

  public async updateQuestion({request,response}: HttpContextContract){
    const id_question=request.param('id_question');
    const {question,options,state} = request.all();
    try{
      await Question.query().where('id',id_question).update({
        question: question,
        options: options,
        state: state
    });
    return response.status(200).json( {
      "state": true, "message": "Pregunta Editada con exito"})
    }catch(e){
      return response.status(500).json({"state": false,"message": "Error al editar la pregunta"})
    }
  }

  public async updateQuestionNewAnswer(id_question,options){

    try{
      await Question.query().where('id',id_question).update({
        options: JSON.stringify(options),
    });
    }catch(e){
      console.log(`ERROR EN ACTUALIZACION DE RESPUESTA -> ${e}`)
    }
  }
}
