import { prop, Ref } from '@typegoose/typegoose'
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses'

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
	@prop({ unique: true })
	email: string

	@prop()
	password: string

	@prop({ field: 'avatar_path' })
	avatarPath: string
}
