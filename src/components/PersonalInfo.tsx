import { Field, Form, Formik } from 'formik'
import { FC, useState } from 'react'
import styles from './PersonalInfo.module.scss'
import form from './Form.module.scss'
import cn from 'classnames'
import { IPersonalInfo } from './Panel'

export const PersonalInfo: FC<PersonalInfoPropsType> = ({
	personalInfo,
	setPersonalInfo,
	setStep
}) => {
	const handleFormSubmitted = (values: IPersonalInfo) => {
		setPersonalInfo(values)
		setStep(prevStep => prevStep + 1)
	}

	return (
		<Formik<IPersonalInfo>
			initialValues={{
				name: personalInfo.name,
				email: personalInfo.email,
				phone: personalInfo.phone
			}}
			onSubmit={values => handleFormSubmitted(values)}
		>
			{({ errors, touched }) => (
				<Form className={form.form}>
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
					<Field
						className={cn(styles.input, {
							[styles.inputError]: errors.name && touched.name
						})}
						id='name'
						name='name'
						validate={validateName}
						placeholder='e.g. Stephen King'
					/>
					<div className={styles.label}>
						<label htmlFor='email'>Email Address</label>
						{errors.email && touched.email && (
							<div className={styles.labelError}>{errors.email}</div>
						)}
					</div>
					<Field
						className={cn(styles.input, {
							[styles.inputError]: errors.email && touched.email
						})}
						id='email'
						type='email'
						name='email'
						validate={validateEmail}
						placeholder='e.g. stephenking@lorem.com'
					/>
					<div className={styles.label}>
						<label htmlFor='phone'>Phone Number</label>
						{errors.phone && touched.phone && (
							<div className={styles.labelError}>{errors.phone}</div>
						)}
					</div>
					<Field
						className={cn(styles.input, {
							[styles.inputError]: errors.phone && touched.phone
						})}
						id='phone'
						type='tel'
						name='phone'
						validate={validatePhone}
						placeholder='e.g. +1 234 567 890'
					/>
					<div className={form.navigation}>
						<div></div>
						<button className={form.submit} type='submit'>
							Next Step
						</button>
					</div>
				</Form>
			)}
		</Formik>
	)
}

type PersonalInfoPropsType = {
	personalInfo: IPersonalInfo
	setPersonalInfo: (personalInfo: IPersonalInfo) => void
	setStep: React.Dispatch<React.SetStateAction<number>>
}

function validateName(name: string) {
	if (!name) {
		return 'This field is required'
	}
}

function validateEmail(email: string) {
	if (!email) {
		return 'This field is required'
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
		return 'Invalid email address'
	}
}

function validatePhone(phone: string) {
	if (!phone) {
		return 'This field is required'
	} else if (!/\+?\d( ?)\d{3}\1\d{3}\1\d{3}/.test(phone)) {
		return 'Follow the pattern +1 234 567 890'
	}
}
