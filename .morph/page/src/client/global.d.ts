// global.d.ts
export {};

declare global {
  interface Window {
    useVariable: typeof import('@use-morph/page').useVariableNano;
  }
}
