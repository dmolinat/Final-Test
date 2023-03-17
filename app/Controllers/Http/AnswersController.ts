import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Models/Answer';
import Question from 'App/Models/Question';
import QuestionsController from './QuestionsController';

export default class AnswersController {
  public async createAnswer({request,response}:HttpContextContract){
    const {opcion,is_correct,state,question_id}=request.all()
    try{
      const answerObj = new Answer();
      answerObj.opcion = opcion;
      answerObj.is_correct = is_correct;
      answerObj.state = state
      const state_question = await this.getValidarQuestion(question_id);
      if(state_question==0){
        return response.status(500).json({"msg": "ERROR EN VALIDAR QUESTION"})
      }
      answerObj.question_id=question_id

      const L_question = await Question.query().select('question', 'options').where('id',question_id)
      const options_question=L_question[0]['$attributes']['options']
      const option = {opcion: answerObj['$attributes']['opcion'], iscorrect: answerObj['$attributes']['is_correct']}
      options_question[options_question.length] = option
      const question_aux = new QuestionsController()
      question_aux.updateQuestionNewAnswer(question_id,options_question)

      await answerObj.save();
      return response.status(200).json({"state": true,"message": "Pregunta creada exitosamente"})
    }catch(e){
      return response.status(500).json({"state": false, "message": "Error al crear answer"})
    }

  }

  public async createAnswerQuestion(question_id: number,options: JSON[]){
    try{
      options.map((answer)=>{
        const answer_new = new Answer()
        answer_new.opcion = answer['opcion']
        answer_new.is_correct = answer['iscorrect']
        answer_new.question_id = question_id
        answer_new.state = true
        answer_new.save()
      })
    }catch(e){
      //console.log(`e -> ${e}`)
    }
  }

  private async getValidarQuestion(question_id: number): Promise<Number>{
    const total = await Question.query().where({"id": question_id}).count('*')
    return total.length;
  }

  public async updateAnswer({request,response}: HttpContextContract){
    const id=request.param('id_opcion');
    const {opcion, iscorrect} = request.all();
    try{
      await Answer.query().where('id',id).update({
        opcion: opcion,
        is_correct: iscorrect
    });
    //Actualizarlo en la pregunta
    //Seleccionar las respuestas asociadas a la pregunta
    //Extraer el question_id asociado a la pregunta
    const L_answer = await Answer.query().select('question_id').where('id',id)
    const question_id=L_answer[0]['$attributes']['question_id']
    //Extraer la lista de preguntas
    const L_answerquestions = await Answer.query().select('opcion','is_correct').where('question_id',question_id)
    const op_aux=Array();
    for(const i in L_answerquestions){
      op_aux[op_aux.length] = {opcion: L_answerquestions[i]['$attributes']['opcion'], iscorrect:L_answerquestions[i]['$attributes']['is_correct']}
    }

    const question_aux = new QuestionsController()
    question_aux.updateQuestionNewAnswer(question_id,op_aux)
    return response.status(200).json({"state": true, "message": "opcion Editada con exito"})
    }catch(e){
      return response.status(500).json({"state": false,"message": "Error al editar la opcion"})
    }
  }

  public async getOptions({request,response}: HttpContextContract){
    const id=request.param('id_question');
    try{
      const L_answerquestions = await Answer.query().select('id','opcion').where('question_id',id)
      response.status(200).json({"state": true, "message": "Listado de opciones", "options": L_answerquestions})
    }catch(e){
        return response.status(500).json({"state": false,"message": "Error al obtener listado de opciones"})
    }
  }

}
