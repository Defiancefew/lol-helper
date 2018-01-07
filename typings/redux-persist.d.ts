declare module 'redux-persist' {
  export function persistStore(store: any): any;
  export function persistCombineReducers(): any;
  export function persistReducer(...args: any[]): any;
}

declare module 'redux-persist/lib/storage' {
  const content: any;
  export default content;
}

declare module 'redux-persist/lib/integration/react' {
  export const PersistGate: any;
}
