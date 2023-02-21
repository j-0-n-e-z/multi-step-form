import { FC } from 'react'
import styles from './Sidebar.module.scss'
import cn from 'classnames'

export const Sidebar: FC<SidebarPropsType> = ({step: currentStep}) => {
	const stepsDescriptions: { [key: number]: string } = {
		1: 'your info',
		2: 'select plan',
		3: 'add-ons',
		4: 'summary'
	}

	return (
		<div className={styles.sidebar}>
			{[1, 2, 3, 4].map(step => (
				<div key={step} className={styles.step}>
					<button className={cn(styles.stepNum, {[styles.currentStep]: step === currentStep})}>{step}</button>
					<div className={styles.stepInfo}>
						<div className={styles.stepTitle}>step {step}</div>
						<div className={styles.stepDescription}>
							{stepsDescriptions[step]}
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

type SidebarPropsType = {
	step: number
}