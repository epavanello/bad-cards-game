import { Middleware, MiddlewareAPI, Dispatch } from 'redux';

export default function loggerMiddleware() {
  const middleware: Middleware = ({ getState }: MiddlewareAPI) => (next: Dispatch) => (action) => {
    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action);
    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue;
  };

  return middleware;
}
