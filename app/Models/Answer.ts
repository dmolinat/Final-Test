import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Answer extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column() public opcion: string
  @column() public is_correct: boolean
  @column() public question_id: Number
  @column() public state: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
