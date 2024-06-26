import { logger } from "../helpers/Logger"
import { BaseError } from "../helpers/BaseError"

class ErrorHandler {
	public async handleError(err: Error): Promise<void> {
		logger.error(
			"Error message from the centralized error-handling component",
			err
		)
		// await sendMailToAdminIfCritical()
		// await sendEventsToSentry()
	}

	public isTrustedError(error: Error) {
		if (error instanceof BaseError) {
			return error.isOperational
		}
		return false
	}
}
export const errorHandler = new ErrorHandler()
