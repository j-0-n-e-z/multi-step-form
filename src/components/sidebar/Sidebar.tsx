import { FC } from 'react'
import styles from './Sidebar.module.scss'
import cn from 'classnames'

type SidebarProps = {
	steps: string[]
	currentStepIndex: number
}

export const Sidebar: FC<SidebarProps> = ({ steps, currentStepIndex }) => {
	return (
		<div className={styles.sidebar}>
			{steps.map((step, stepIndex) => (
				<div key={step} className={styles.step}>
					<div
						className={cn(styles.stepNum, {
							[styles.currentStep]: stepIndex === currentStepIndex
						})}
					>
						{stepIndex + 1}
					</div>
					<div className={styles.info}>
						<div className={styles.title}>step {stepIndex + 1}</div>
						<div className={styles.description}>
							{step}
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
