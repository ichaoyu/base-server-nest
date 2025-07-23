import { SysUserEntity } from '@/entities';
import { IPayload } from '@/interfaces';

declare module 'fastify' {
	interface FastifyRequest {
		payload: IPayload;
		user: SysUserEntity;
	}
}
