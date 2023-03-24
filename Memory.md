0.1. Instalar `npm i -g @adonisjs/cli`
0.2. Instalar el paquete para manejar postgres `npm i -g postgres`
0.3. Instalar el paquete para manejar postgres `npm i -g proxy-addr`

PASOS Y DIFICULTADOES PARA REALIZAR EL PROYECTO.
1. Crear el nuevo proyecto: `npm init adonis-ts-app@latest Final_test`
    1.1. Me salía este error:   Command failed with exit code 1: node ace configure tests
Error: spawn npm ENOENT
    at Process.ChildProcess._handle.onexit (node:internal/child_process:283:19)
    at onErrorNT (node:internal/child_process:476:16)
    at processTicksAndRejections (node:internal/process/task_queues:82:21)
    SOLUCIÓN: Instalar y volver a instalar el node, apagar y el pc y encenderlo al día siguiente :D.

2. Se crea el orm para usar en postgres: npm i @adonisjs/lucid@ -> node ace invoke @adonisjs/lucid -> postgres.
3. Se crea en pgadmin4 la base de datos: dbFinaltest
4. Se configura el archivo .env para conectar la base de datos.
5. Se configura el documento config/database.ts para asegurar la conexión de la base de datos.
  5.1 Me salía el error: "Knex: run\and$ npm install pg --save\Cannot find module
  SOLUCIÓN: Al crear un proyecto, este no puede estar en sub-folder, por alguna razón no encuentra la carpeta node_modules que es. Se volvió a crear el proyecto de 0, en la carpeta de BOOTCAMP.
6. Para cada entidad:
  - node ace make:migration <NombreTabla> con sus relaciones.
  - Se va ir haciendo el modelo node ace make:model <NombreTabla>
  - Se van a ir haciendo los controladores: node ace make:controller <NombreTabla>
      6.1. No está la lista de options por pregunta, se va a agregar como JSON en la tabla..
      6.2. Para enviar una lista de jsons. `JSON.stringify(data_question.options)`;
      6.3. No olvidar que para los parametros, en las rutas se estable /ruta/:parametro
      6.4. Para acceder al parametro de la ruta hay que usar una sentencia aparte, y luego se usa las parametros enviados.
        const id_question=request.param('id_question');
        const {question,options,state} = request.all();
      6.5. Para el orm, el modelo debe llamarse igual que la tabla migrada en postgres:
        export default class *types_documents* extends BaseModel 
        export default class *roles* extends BaseModel
      6.6 hasMany solo lleva esta estructura.
          `@hasMany(()=>Answer,{
                localKey: 'id',
                foreignKey: 'question_id',
            }) public answers: HasMany<typeof Answer>`
      6.7 Para que se parezca al CRUD, answer se va a llamar opcion
      6.8. Es un string: JSON.stringify(data_question.options)
      6.9. question_id se debe declarar con la clase Number @column() public question_id: Number
      7.0. Manejo de FOR en javascript:
          `for(const i in L_answerquestions){
            op_aux[op_aux.length] = {opcion: L_answerquestions[i]['$attributes']['opcion'], iscorrect:L_answerquestions[i]['$attributes']['is_correct']}
          }`
      7.1. No hay criterio para el rol, sera aleatorio al crearse el estudiante inicialmente, entre 1: admin o 2: estudiante. `UserObj.rol_id = Math.floor(Math.random() * (2 - 1) + 1)      //randint(1,2)`.
      7.2. No esta en la creacion del estudiante el atributo password: Se va a agregar.
      7.3. Preguntar sobre como hacer para que a traves de un get me adquiera los datos que pide en el anexo en getUsers: "perPage": 10,"page": 1,"filter": {"name": ""}
      7.4. Para los parametros, estar atento con id_User, se esta expresando en minuscula id_user.
      7.5. 2023-03-16 Guia JWT para el proyecto.
        - npm i jsonwebtoken.
        - npm install bcryptjs para las contraseñas
        - Se encripta la contrasena con bcryptjs: const bcryptjs = require('bcryptjs')
          const salt = bcryptjs.genSaltSync();
          UserObj.password =  bcryptjs.hashSync(data_User.password,salt)
        - Se crea el login con generar token.
          Para generar el token se necesita importar ambas cosas:
            * import Env from '@ioc:Adonis/Core/Env'
            * import jwt from 'jsonwebtoken'
            * Agregar en el archivo .env -> JWT_SECRET_KEY=2080sJwt
            * Me exigio agrega Promise para token token: Promise<String>.
        - Se crea una funcion para verificar el token: `verificarToken(authorizationHeader: string)`
        - Instalar middleware: node ace make:middleware AuthJwt
        - En el archivo kernetl.ts, cambiar () => import('App/Middleware/AuthJwt'), que apunte al middleware.
        - Modificar middleware para hacer actualizacion.
        - Por algunar razon, hay que hacer el json como `token: token`
        - Se prueba la autorizacion con Bearer token. Tenemos el usuario.
        - Para validar que es admin se crea otro middleware: node ace make:middleware VerifyAdmin
        - Se agrega al kernel.ts -> admin: () => import('App/Middleware/VerifyAdmin').
        - Configurar el middleware de forma parecida al user, solo que agregando el condicional de que los id_rol = 1 son administradores.
        - Crear la function getPatload para verificar el administrador.
        - Se puedieron .middleware("admin") en dos rutas gets para realizar pruebas.
        - **(ERROR) Para que tenga mas sentido el problema. Forms se asocia a las preguntas y no a las respuestas. Forms: id. student_id. question_ids int[] (ERROR)**
        - Se deben guardar las respuestas del estudiante, entonces el formulario es con todas las preguntas. Las respuestas corresponden a la answer_id.
      7.6. Deuda técnica no mayor a un día: Cantidad de tiempo para arreglar los bugs menor a un día.
      7.7. Prueba unitaria > 80%
7. Se configuró el prefijo a api/v1
8. Crear pruebas unitarias y sonar.
  - Modificar adonisrc.json para que los archivos .spec(.ts|.js), sean reservados para pruebas.
  - Configurar test.ts
  - PARA CORRER LAS PRUEBAS: node ace test 
  - Se revisa   if (suite.name === 'functional') {
        suite.setup(() => TestUtils.httpServer().start())
      }, para asegurarnos que en la carpeta functional se guarden todas las pruebas.
  - Se edita la carpeta .env.test con los datos del .env para que el framework lo pueda interpretar.
    Se agrega PATH_APP=http://localhost:PORT y se deja el NODE_ENV que está alli.
  - Se crea la primera prueba, funcion por funcion desde AnswersController hasta UsersController
  - NO OLVIDAR INSTALAR AXIOS PARA LOS POST. npm i --save axios
  - Se elimina NODE_ENV = development
  - Para los post, las pruebas se realizan con form: const response = await client.post(endpoint).form(body)

  - Sonar 2023 - 03 - 16
  - npm i nyc, para hacer la cobertura 
  - Para el login se crea una funcion para extraer el token, esta funcion no entra para la prueba, en una carpeta como TestAuth: obtenerTokenAutorizacion().
  - Dado que mi ruta no devuelve el token de authorization se va obtener el payload a partir del desarrollo de user login.
  - Se debe crear los metodos necesarios en la misma carpeta de functional de las pruebas.
  - Para getUser, devuelve un array:   assert.isArray(response.body())
  - npm i nyc -D
  - TABLA DE COBERTURA: npx nyc node ace test
  - DOCUMENTO DE COBERTURA: npx nyc report --reporter=lcov
  - Se van a analizar los archivos y lineas que no tengan cobertura.
  - Prueba en Sonar -> StartSonar -> localhost:9000
  - Dejar sonar-project.propoerties así: `sonar.sourceEncoding=UTF-8
  sonar.typescript.lcov.reportPaths=/coverage/lcov.info
  sonar.exclusions=node_modules/**,**/Infraestructura/**,database/**,coverage/**`, **/app/Models/**
  - Si el modelo tiene funciones NO se puede excluir del test de sonar.
  - En las dos tablas se debe establecer la relacion de hasMany o ManyToMany
  
  * Por cada vez que se tenga listo un crud se hara un node ace migration:run
  * No olvidar que para regresar migraciones se usa. node ace migration:rollback.

9. Swagge: npm i -–save adonis5-swagger
  - node ace invoke adonis5-swagger
  - Los archivos swagger estan en en una carpeta docs y son .yml: 			'docs/swagger/**/*.yml',
    se eliminar swagger de lo anterior
  - Crear el CRUD del anexo en swagger.
  - Se crea modelo (Mismo modelo de models pero con la sintaxis de yml) por entidad.
  - Para generar los swaggers: node ace swagger:generate.
  - Para la autenticación se añade lo siguiente en la carpeta swagger.ts:
        components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT"
          }
        }
      }
  - En security se añade el bearer de autenticacion:
      get:
    tags:
      - Users
    security:
    `- bearerAuth: []`
  - Despliegue en azure: https://pruebasrepositorios.azurewebsites.net/docs/index.html
