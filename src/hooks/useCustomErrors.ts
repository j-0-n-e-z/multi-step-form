import { useState } from 'react'

const errorMessages = {
	required: 'This field is required',
	emailInvalid: 'Invalid email address',
	phoneInvalid: 'Invalid phone number'
} as const

type Errors = Record<string, string>
type Touches = Record<string, boolean>

export const useCustomErrors = (fields: Array<string>) => {
	const [errors, setErrors] = useState<Errors>(
		Object.fromEntries(fields.map(field => [field, '']))
	)
	const [touched, setTouched] = useState<Touches>(
		Object.fromEntries(fields.map(field => [field, false]))
	)

	const setFieldRequiredError = (field: string) => {
		setErrors(prev => ({ ...prev, [field]: errorMessages.required }))
		setTouched(prev => ({ ...prev, [field]: true }))
	}

	const setFieldErrorOnChange = (
		e: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>,
		field: string
	) => {
		if (!e.target.value) {
			setFieldRequiredError(field)
		} else if (e.target.validity.patternMismatch) {
			setErrors(prev => ({
				...prev,
				[field]: Object.values(errorMessages).find(message => message.includes(field))!
			}))
		} else {
			clearFieldError(field)
		}
	}

	const clearFieldError = (field: string) => {
		setErrors(prev => ({ ...prev, [field]: '' }))
	}

	return {
		errors,
		touched,
		setFieldErrorOnChange,
		setErrors,
		setTouched,
		setFieldRequiredError
	}
}
