export class BaseError extends Error {
	public readonly name: string
	public readonly statusCode: number
	public readonly description: string
	public readonly isOperational: boolean
	constructor(
		name: string,
		statusCode: number,
		isOperational: boolean,
		description: string
	) {
		super(description)
		this.name = name
		this.statusCode = statusCode
		this.description = description
		this.isOperational = isOperational
		Error.captureStackTrace(this)
	}
}

export class HttpError extends BaseError {
	constructor(
		name: string,
		statusCode: number = HttpStatusCode.INTERNAL_SERVER,
		isOperational: boolean = true,
		description: string = "Internal Server Error"
	) {
		super(name, statusCode, isOperational, description)
	}
}

export enum HttpStatusCode {
	OK = 200,
	CREATED = 201,
	ACCEPTED = 202,
	NO_CONTENT = 204,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	METHOD_NOT_ALLOWED = 405,
	INTERNAL_SERVER = 500,
}
