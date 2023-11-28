declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /**
       * Controls the maximum request body size. If this is a number,
       * then the value specifies the number of bytes; if it is a string,
       * the value is passed to the bytes library for parsing. Defaults to '15mb'.
       */
      PAYLOAD_SIZE_LIMIT?: string;
      NODE_ENV?: 'development' | 'production' | string;
      PORT?: string;
      ADMIN_EMAIL: string;
      ADMIN_PASSWORD: string;
      DUMMY_EDITOR_EMAIL: string;
      DUMMY_EDITOR_PASSWORD: string;
      POSTGRES_HOST?: string;
      POSTGRES_PORT?: string;
      POSTGRES_USER?: string;
      POSTGRES_PASSWORD?: string;
      POSTGRES_DATABASE?: string;
    }
  }
}

export {};
