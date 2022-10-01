import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'

export const getJWTConfig = async (
	configService: ConfigService
): Promise<JwtModuleOptions> => ({
	secret: configService.get('JWT_SECRET'),
})

// функция для того что бы вытащит из фаила env JWT_SECRET