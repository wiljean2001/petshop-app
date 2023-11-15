import { NextResponse } from 'next/server'

const ErrorTypes = {
  BAD_USER_INPUT: {
    errorCode: 'BAD_USER_INPUT',
    errorStatus: 400,
  },
  BAD_REQUEST: {
    errorCode: 'BAD_REQUEST',
    errorStatus: 400,
  },
  NOT_FOUND: {
    errorCode: 'NOT_FOUND',
    errorStatus: 404,
  },
  FORBIDDEN: {
    errorCode: 'FORBIDDEN',
    errorStatus: 403,
  },
  UNAUTHENTICATED: {
    errorCode: 'UNAUTHENTICATED',
    errorStatus: 401,
  },
  ALREADY_EXISTS: {
    errorCode: 'ALREADY_EXISTS',
    errorStatus: 400,
  },
  INTERNAL_SERVER_ERROR: {
    errorCode: 'INTERNAL_SERVER_ERROR',
    errorStatus: 500,
  },
}
type ErrorTypeKeys = keyof typeof ErrorTypes

type Headers = {
  [key: string]: string
}

/**
 *
 * @param data - Allowed data
 * @param status - Response status
 * @param headers - Allowed headers
 * @returns Response object
 *
 * Uso:
 * const headers = { 'Access-Control-Allow-Origin': '*' };
 * return ErrorResponse('Some error occurred', 500, headers);
 *
 */
export const ErrorResponse = (
  status: ErrorTypeKeys,
  error?: string,
  headers: Headers = {}
) => {
  const errorType = ErrorTypes[status]
  return NextResponse.json(
    { error: error && errorType.errorCode },
    {
      status: errorType.errorStatus,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    }
  )
}

/**
 *
 * @param data - Allowed data
 * @param status - Response status
 * @param headers - Allowed headers
 * @returns Response object
 *
 * Uso:
 * const headers = { 'Access-Control-Allow-Origin': '*' };
 * return ErrorResponse('Some error occurred', 500, headers);
 *
 */
export const SuccessResponse = <T>(
  data: T,
  status: number,
  headers: Headers = {}
) => {
  return NextResponse.json(data, {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  })
}

// Uso:
// const headers = { 'Access-Control-Allow-Origin': '*' };
// return ErrorResponse('Some error occurred', 500, headers);
