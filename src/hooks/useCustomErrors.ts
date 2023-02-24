import { useState } from 'react'

const errorsMessages: { [key: string]: string } = {
	required: 'This field is required',
	email: 'Invalid email address',
	phone: 'Invalid phone number'
}

type Errors = { [key: string]: string }
type Touches = { [key: string]: boolean }

export const useCustomErrors = (fields: string[]) => {
	const [errors, setErrors] = useState<Errors>(
		Object.fromEntries(fields.map(x => [x, '']))
	)
	const [touched, setTouched] = useState<Touches>(
		Object.fromEntries(fields.map(x => [x, false]))
	)

	const setError = (
		e: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>,
		field: string
	) => {
		if (!e.target.value) {
			setErrors(prev => ({
				...prev,
				[field]: errorsMessages.required
			}))
		} else {
			setErrors(prev => ({
				...prev,
				[field]: e.target.validity.patternMismatch ? errorsMessages[field] : ''
			}))
		}
	}

	return { errors, setErrors, setError, touched, setTouched }
}
