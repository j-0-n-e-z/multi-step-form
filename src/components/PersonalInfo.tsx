import { Field, Form, Formik } from 'formik'
import { FC } from 'react'
import styles from './PersonalInfo.module.scss'
import cn from 'classnames'

export const PersonalInfo: FC = () => {
	return (
		<div className={styles.formWrapper}>
			<div className={styles.stepTitle}>Personal Info</div>
			<p className={styles.stepDescription}>
				Please provide your name, email address, and phone number.
			</p>
			<Formik
				initialValues={{ name: '', email: '', phone: '' }}
				onSubmit={(values, { setSubmitting }) => {}}
			>
				{({ errors, touched }) => (
					<Form className={styles.form}>
						<div className={styles.label}>
							<label>Name</label>
							{errors.name && touched.name && (
								<div className={styles.labelError}>{errors.name}</div>
							)}
						</div>
						<Field
							className={cn(styles.input, {
								[styles.inputError]: errors.name && touched.name
							})}
							name='name'
							validate={validateName}
							placeholder='e.g. Stephen King'
						/>
						<div className={styles.label}>
							<label>Email Address</label>
							{errors.email && touched.email && (
								<div className={styles.labelError}>{errors.email}</div>
							)}
						</div>
						<Field
							className={cn(styles.input, {
								[styles.inputError]: errors.email && touched.email
							})}
							type='email'
							name='email'
							validate={validateEmail}
							placeholder='e.g. stephenking@lorem.com'
						/>
						<div className={styles.label}>
							<label>Phone Number</label>
							{errors.phone && touched.phone && (
								<div className={styles.labelError}>{errors.phone}</div>
							)}
						</div>
						<Field
							className={cn(styles.input, {
								[styles.inputError]: errors.phone && touched.phone
							})}
							type='tel'
							name='phone'
							validate={validatePhone}
							placeholder='e.g. +1 234 567 890'
						/>
						<button className={styles.submit} type='submit'>
							Next Step
						</button>
					</Form>
				)}
			</Formik>
		</div>
	)
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
  } else if (!/\+?\d \d{3} \d{3} \d{3}/.test(phone)) {
    return 'Follow the pattern +1 234 567 890'
  }
}
