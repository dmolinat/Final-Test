import Route from '@ioc:Adonis/Core/Route'

Route.get('/health','HealthController.getReportHealth')

Route.group(()=>{
  Route.group(()=>{
    Route.post('/create', 'QuestionsController.createQuestions');
    Route.get('/getQuestions', 'QuestionsController.getQuestions');
    Route.delete('/deleteQuestion/:id_question', 'QuestionsController.deleteQuestion');
    Route.put('/updateQuestion/:id_question', 'QuestionsController.updateQuestion');
    Route.put('/updateAnswer/:id_opcion', 'AnswersController.updateAnswer');
    Route.get('/getOptions/:id_question','AnswersController.getOptions')
  }).prefix('questions')

  Route.group(()=>{
    Route.post('/create', 'TypeDocumentsController.createTypeDocument');
    Route.get('/getTypeDocuments', 'TypeDocumentsController.getTypeDocument');
    Route.delete('/deleteTypeDocuments/:id_typeDocument', 'TypeDocumentsController.deleteTypeDocument');
    Route.put('/updateTypeDocuments/:id_typeDocument', 'TypeDocumentsController.updateTypeDocument');
  }).prefix('typeDocument')

  Route.group(()=>{
    Route.post('/create', 'RolesController.createRol');
    Route.get('/getRoles', 'RolesController.getRol');
    Route.delete('/deleteRol/:id_rol', 'RolesController.deleteRol');
    Route.put('/updateRol/:id_rol', 'RolesController.updateRol');
  }).prefix('rol')

  Route.group(()=>{
    Route.post('/create', 'AnswersController.createAnswer');
    Route.delete('/deleteRol/:id_rol', 'AnswersController.deleteRol');
  }).prefix('answer')

  Route.post('/login','UsersController.login')
  Route.group(()=>{
    Route.post('/create', 'UsersController.createUser');
    Route.get('/getUsers', 'UsersController.getUsers').middleware('admin')
    Route.put('/update/:id_user', 'UsersController.updateUser')
    Route.get('/getUser/:id_user', 'UsersController.getUser').middleware('admin')
  }).prefix('user')

  Route.group(()=>{
    Route.get('/getquestions', 'FormsController.getQuestions');
    Route.post('/postquestions', 'FormsController.postQuestions');
  }).prefix('form')

}).prefix('api/v1')
