import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Form from 'App/Models/Form';
import Question from 'App/Models/Question'

export default class FormsController {
  public async getQuestions({response}: HttpContextContract){
    try{
      const L_questions = await Question.query().select('question','id','options').where({state: true})
      const question_aux=Array();
      for(const i in L_questions){
        question_aux[question_aux.length] = {
          question: L_questions[i]['$attributes']['question'],
          id: L_questions[i]['$attributes']['id'],
          options: L_questions[i]['$attributes']['options']}
      }
      response.status(200).json({state: true, questions: question_aux})
    }catch(e){
      response.status(500).json({"state": false, "message": "Error al obtener el listado"})
    }
  }

  public async postQuestions({request,response}: HttpContextContract){
    try{
      const form_data = request.all()
        for(const i in form_data.answers){
          await Form.create({
            student_id: form_data.estudianteId,
            answer_id: form_data.answers[i],
            state: true
          })
      }
      response.status(200).json({"state": true,"message": "Respuestas almacenadas con exito"})
    }catch(e){
      response.status(500).json({"state": false, "message": "No se pudieron almacenar las respuestas"})
    }
  }
}
