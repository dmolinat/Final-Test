import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import types_documents from './TypeDocument'
import roles from './Rol'

export default class User extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column() public first_name: string
  @column() public second_name: string
  @column() public surname: string
  @column() public second_sur_name: string
  @column() public type_document: number
  @column() public document_number: string
  @column() public email: string
  @column() public password: string
  @column() public rol_id: number
  @column() public phone: string
  @column() public state: boolean

  @hasOne(()=>types_documents,{
    localKey: 'type_document',
    foreignKey: 'id',
  }) public t_document: HasOne<typeof types_documents>

  @hasMany(()=>roles,{
    localKey: 'rol_id',
    foreignKey: 'id',
  }) public rol: HasMany<typeof roles>

  @column.dateTime({ autoCreate: true }) public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true }) public updatedAt: DateTime
}
