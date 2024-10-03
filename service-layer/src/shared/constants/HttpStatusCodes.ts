/**
 * @class HttpStatusErrors
 * @description A collection of HTTP status codes to ensure consistency throughout the application.
 */
export class HttpStatusCodes {
    static readonly OK = 200;
    static readonly CREATED = 201;
    static readonly NO_CONTENT = 204;
    static readonly BAD_REQUEST = 400;
    static readonly UNAUTHORIZED = 401;
    static readonly FORBIDDEN = 403;
    static readonly NOT_FOUND = 404;
    static readonly CONFLICT = 409;
    static readonly INTERNAL_SERVER_ERROR = 500;
    static readonly SERVICE_UNAVAILABLE = 503;
  }