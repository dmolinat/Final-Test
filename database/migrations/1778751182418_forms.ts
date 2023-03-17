import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Forms extends BaseSchema {
  protected tableName = 'forms'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('student_id').notNullable()
      table.integer('answer_id').notNullable()
      table.boolean('state').notNullable()

      table.foreign('student_id').references('id').inTable('users').onDelete('cascade')
      table.foreign('answer_id').references('id').inTable('answers').onDelete('cascade')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
