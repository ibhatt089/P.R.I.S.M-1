/**
 * @class ErrorMessages
 * @description A collection of common error messages to ensure consistency across services.
 */
export class ErrorMessages {
  static readonly INVALID_CREDENTIALS_ERROR_MSG = 'Invalid credentials provided.';
  static readonly UNAUTHORIZED_ACCESS_ERROR_MSG = 'Unauthorized access. You do not have permission to perform this action.';
  static readonly FORBIDDEN_ACCESS_ERROR_MSG = 'Access Forbidden';
  static readonly RESOURCE_NOT_FOUND_ERROR_MSG = 'The requested resource could not be found.';
  static readonly INTERNAL_SERVER_ERROR_MSG = 'An internal server error occurred.';
  static readonly EXPIRED_SESSION_TOKEN_ERROR_MSG = 'The token has expired or is invalid.';
}