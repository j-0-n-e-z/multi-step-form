import { FC } from 'react'
import { Sidebar } from "./Sidebar"
import styles from './Panel.module.scss'
import { PersonalInfo } from './PersonalInfo'

export const Panel: FC = () => {
  return (
		<div className={styles.panel}>
			<Sidebar />
			<div className={styles.stepForm}>
				<PersonalInfo />
			</div>
		</div>
	)
}