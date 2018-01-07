import { ApplicationRequestHandler } from 'express-serve-static-core';

declare module 'cors' {
  export default function(): ApplicationRequestHandler<any>;
}
