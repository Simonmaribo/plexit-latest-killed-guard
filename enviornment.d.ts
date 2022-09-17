declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            REDIS_URL: string;
            SECRET: string;
        }
    }
}

export {}