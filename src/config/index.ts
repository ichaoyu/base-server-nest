import development from './config.development';
import production from './config.production';

const env: string = process.env.NODE_ENV ?? 'development';
const CONFIG_MAP = { development, production };

export default CONFIG_MAP[env];
