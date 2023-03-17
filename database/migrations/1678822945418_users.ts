import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('first_name').notNullable()
      table.string('second_name').notNullable()
      table.string('surname').notNullable()
      table.string('second_sur_name').notNullable()
      table.integer('type_document').notNullable()
      table.string('document_number').notNullable().unique()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.integer('rol_id').notNullable()
      table.string('phone').notNullable().unique()
      table.boolean('state').notNullable()

      table.foreign('type_document').references('id').inTable('types_documents').onDelete('cascade')
      table.foreign('rol_id').references('id').inTable('roles').onDelete('cascade')

      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
