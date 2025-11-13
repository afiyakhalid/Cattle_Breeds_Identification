interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  // add other VITE_ variables here as needed:
  // readonly VITE_OTHER_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}