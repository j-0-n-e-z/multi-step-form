import { FC } from 'react'
import styles from './PersonalInfo.module.scss'
import form from './Form.module.scss'
import cn from 'classnames'
import { FormItems } from './Panel'
import { useCustomErrors } from '../hooks/useCustomErrors'

type PersonalInfoProps = FormItems & {
	updateFormData: (fieldsToUpdate: Partial<FormItems>) => void
}

export const PersonalInfo: FC<PersonalInfoProps> = ({
	name,
	email,
	phone,
	updateFormData
}) => {
	const { errors, touched, setError, setTouched } = useCustomErrors()

	const handleOnChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: string
	) => {
		updateFormData({ [field]: e.target.value })
		setError(e, field)
	}

	const handleOnBlur = (
		e: React.FocusEvent<HTMLInputElement>,
		field: string
	) => {
		setTouched(prev => ({ ...prev, [field]: true }))
		setError(e, field)
	}

	return (
		<>
			<div className={form.title}>Personal Info</div>
			<p className={form.description}>
				Please provide your name, email address, and phone number.
			</p>
			<div className={styles.label}>
				<label htmlFor='name'>Name</label>
				{errors.name && touched.name && (
					<div className={styles.labelError}>{errors.name}</div>
				)}
			</div>
			<input
				className={cn(styles.input, {
					[styles.inputError]: errors.name && touched.name
				})}
				id='name'
				name='name'
				value={name}
				placeholder='e.g. Stephen King'
				onChange={e => handleOnChange(e, 'name')}
				onBlur={e => handleOnBlur(e, 'name')}
				autoComplete='name'
				required
			/>
			<div className={styles.label}>
				<label htmlFor='email'>Email Address</label>
				{errors.email && touched.email && (
					<div className={styles.labelError}>{errors.email}</div>
				)}
			</div>
			<input
				className={cn(styles.input, {
					[styles.inputError]: errors.email && touched.email
				})}
				id='email'
				type='email'
				name='email'
				value={email}
				placeholder='e.g. stephenking@lorem.com'
				onChange={e => handleOnChange(e, 'email')}
				onBlur={e => handleOnBlur(e, 'email')}
				autoComplete='email'
				pattern='[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}'
				required
			/>
			<div className={styles.label}>
				<label htmlFor='phone'>Phone Number</label>
				{errors.phone && touched.phone && (
					<div className={styles.labelError}>{errors.phone}</div>
				)}
			</div>
			<input
				className={cn(styles.input, {
					[styles.inputError]: errors.phone && touched.phone
				})}
				id='phone'
				type='tel'
				name='phone'
				value={phone}
				placeholder='e.g. +1 234 567 890'
				onChange={e => handleOnChange(e, 'phone')}
				onBlur={e => handleOnBlur(e, 'phone')}
				pattern='\+?\d( ?)\d{3}\1\d{3}\1\d{3}'
				required
			/>
		</>
	)
}
