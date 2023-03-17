import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Answer from './Answer'

export default class Form extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column() public student_id: number
  @column() public answer_id: number
  @column() public state: boolean

  @hasMany(()=>User,{
    localKey: 'student_id',
    foreignKey: 'id',
  }) public user: HasMany<typeof User>

  @hasMany(()=>Answer,{
    localKey: 'answer_id',
    foreignKey: 'id',
  }) public answer: HasMany<typeof Answer>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
