import { useState } from 'react'

const errorsMessages: { [key: string]: string } = {
	required: 'This field is required',
	email: 'Invalid email address',
	phone: 'Invalid phone number'
}

export const useCustomErrors = () => {
	const [errors, setErrors] = useState({ name: '', email: '', phone: '' })
	const [touched, setTouched] = useState({
		name: false,
		email: false,
		phone: false
	})

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
