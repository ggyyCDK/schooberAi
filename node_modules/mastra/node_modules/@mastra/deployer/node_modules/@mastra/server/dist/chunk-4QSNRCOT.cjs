'use strict';

var chunk7NADHFD2_cjs = require('./chunk-7NADHFD2.cjs');

// src/server/handlers/utils.ts
function validateBody(body) {
  const errorResponse = Object.entries(body).reduce((acc, [key, value]) => {
    if (!value) {
      acc[key] = `Argument "${key}" is required`;
    }
    return acc;
  }, {});
  if (Object.keys(errorResponse).length > 0) {
    throw new chunk7NADHFD2_cjs.HTTPException(400, { message: Object.values(errorResponse)[0] });
  }
}

exports.validateBody = validateBody;
//# sourceMappingURL=chunk-4QSNRCOT.cjs.map
//# sourceMappingURL=chunk-4QSNRCOT.cjs.map