import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as svgCaptcha from 'svg-captcha';
import * as svgBase64 from 'mini-svg-data-uri';
import { nanoid } from 'nanoid';

import { CAPTCHA_MERGED_OPTIONS, letters, numbers } from './captcha.constant';
import { CaptchaOptions, FormulaCaptchaOptions, ImageCaptchaOptions, TextCaptchaOptions } from './captcha.interface';

@Injectable()
export class CaptchaService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    @Inject(CAPTCHA_MERGED_OPTIONS)
    private options: CaptchaOptions,
  ) {}

  async image(options?: ImageCaptchaOptions): Promise<{
    id: string;
    imageBase64: string;
  }> {
    const { width, height, type, size, noise } = Object.assign(
      {},
      this.options,
      this.options.default,
      this.options.image,
      options,
    );
    let ignoreChars = '';
    switch (type) {
      case 'letter':
        ignoreChars = numbers;
        break;
      case 'number':
        ignoreChars = letters;
        break;
    }
    const { data, text } = svgCaptcha.create({
      ignoreChars,
      width,
      height,
      size,
      noise,
    });
    console.log('text: ', text);
    const id = await this.set(text);
    const imageBase64 = svgBase64(data);
    return { id, imageBase64 };
  }

  async formula(options?: FormulaCaptchaOptions) {
    const { width, height, noise } = Object.assign(
      {},
      this.options,
      this.options.default,
      this.options.formula,
      options,
    );
    const { data, text } = svgCaptcha.createMathExpr({
      width,
      height,
      noise,
    });
    const id = await this.set(text);
    const imageBase64 = svgBase64(data);
    return { id, imageBase64 };
  }

  async text(options?: TextCaptchaOptions): Promise<{
    id: string;
    text: string;
  }> {
    const textOptions = Object.assign({}, this.options, this.options.default, this.options.text, options);
    let chars = '';
    switch (textOptions.type) {
      case 'letter':
        chars = letters;
        break;
      case 'number':
        chars = numbers;
        break;
      default:
        chars = letters + numbers;
        break;
    }
    let text = '';
    while (textOptions.size--) {
      text += chars[Math.floor(Math.random() * chars.length)];
    }
    const id = await this.set(text);
    return { id, text };
  }

  async set(text: string): Promise<string> {
    const id = nanoid();
    await this.cacheManager.set(this.getStoreId(id), (text || '').toLowerCase(), this.options.expirationTime);
    return id;
  }

  async check(id: string, value: string): Promise<boolean> {
    if (!id || !value) {
      return false;
    }
    const storeId = this.getStoreId(id);
    const storedValue = await this.cacheManager.get(storeId);
    if (value.toLowerCase() !== storedValue) {
      return false;
    }
    this.cacheManager.del(storeId);
    return true;
  }

  private getStoreId(id: string): string {
    if (!this.options.idPrefix) {
      return id;
    }
    return `${this.options.idPrefix}:${id}`;
  }
}
