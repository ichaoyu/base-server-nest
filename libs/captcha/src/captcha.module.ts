import { DynamicModule, Module } from '@nestjs/common';

import { CAPTCHA_SERVICE } from './captcha.constant';
import { CaptchaModuleOptions } from './captcha.interface';
import {
	createCaptchaMergedOptions,
	createCaptchaOptions,
} from './captcha.providers';
import { CaptchaService } from './captcha.service';

export class CaptchaModule {
	static registerAsync(params: CaptchaModuleOptions) {
		const { global, optionsProvider } = params;

		@Module({})
		class CaptchaCoreModule {
			static create(): DynamicModule {
				return {
					global,
					module: CaptchaCoreModule,
					providers: [
						createCaptchaOptions(optionsProvider),
						createCaptchaMergedOptions(),
						{
							provide: CAPTCHA_SERVICE,
							useClass: CaptchaService,
						},
					],
					exports: [CAPTCHA_SERVICE],
				};
			}
		}

		return CaptchaCoreModule.create();
	}
}
