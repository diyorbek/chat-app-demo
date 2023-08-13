/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_MODE: 'development' | 'staging' | 'production';
  readonly VITE_PRODUCTION_API_URL: string;
  readonly VITE_STAGING_API_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
