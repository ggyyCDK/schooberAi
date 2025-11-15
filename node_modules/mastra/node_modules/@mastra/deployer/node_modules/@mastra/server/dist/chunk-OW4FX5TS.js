import { HTTPException } from './chunk-MMROOK5J.js';

// src/server/handlers/utils.ts
function validateBody(body) {
  const errorResponse = Object.entries(body).reduce((acc, [key, value]) => {
    if (!value) {
      acc[key] = `Argument "${key}" is required`;
    }
    return acc;
  }, {});
  if (Object.keys(errorResponse).length > 0) {
    throw new HTTPException(400, { message: Object.values(errorResponse)[0] });
  }
}

export { validateBody };
//# sourceMappingURL=chunk-OW4FX5TS.js.map
//# sourceMappingURL=chunk-OW4FX5TS.js.map