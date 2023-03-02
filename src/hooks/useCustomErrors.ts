import { useState } from 'react'

const errorMessages: Record<string, string> = {
	required: 'This field is required',
	emailInvalid: 'Invalid email address',
	phoneInvalid: 'Invalid phone number'
}

type Errors = Record<string, string>
type Touches = Record<string, boolean>

export const useCustomErrors = (fields: string[]) => {
	const [errors, setErrors] = useState<Errors>(
		Object.fromEntries(fields.map(x => [x, '']))
	)
	const [touched, setTouched] = useState<Touches>(
		Object.fromEntries(fields.map(x => [x, false]))
	)

	const setFieldError = (field: string, error: string = 'required') => {
		setErrors(prev => ({ ...prev, [field]: errorMessages[error] }))
		setTouched(prev => ({ ...prev, [field]: true }))
	}

	const setFieldErrorOnChange = (
		e: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>,
		field: string
	) => {
		if (!e.target.value) {
			setErrors(prev => ({
				...prev,
				[field]: errorMessages.required
			}))
		} else {
			setErrors(prev => ({
				...prev,
				[field]: e.target.validity.patternMismatch
					? errorMessages[field + 'Invalid']
					: ''
			}))
		}
	}

	return {
		errors,
		touched,
		setFieldErrorOnChange,
		setErrors,
		setTouched,
		setFieldError
	}
}
