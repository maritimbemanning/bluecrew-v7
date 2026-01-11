/**
 * Standard API response types for consistent error handling
 */

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  details?: unknown;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Helper to create success responses
 */
export function successResponse<T>(
  data: T,
  message?: string
): ApiSuccessResponse<T> {
  const response: ApiSuccessResponse<T> = {
    success: true,
    data,
  };
  if (message) {
    response.message = message;
  }
  return response;
}

/**
 * Helper to create error responses
 */
export function errorResponse(
  error: string,
  details?: unknown
): ApiErrorResponse {
  const response: ApiErrorResponse = {
    success: false,
    error,
  };
  if (details !== undefined) {
    response.details = details;
  }
  return response;
}

/**
 * Standard HTTP status codes
 */
export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  GONE: 410,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;
