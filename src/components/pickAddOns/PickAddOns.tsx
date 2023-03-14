import { FC } from 'react'
import { AddOn } from './AddOn'
import form from '../Form.module.scss'
import styles from './PickAddOns.module.scss'
import { addOnsData } from '../../data/addOnsData'
import { SelectedAddOn, DefaultProps } from '../../types'

export const PickAddOns: FC<DefaultProps> = ({
	pickedAddOns,
	planDuration,
	updateFormData
}) => {
	return (
		<div className={form.formContent}>
			<div className={form.title}>Pick add-ons</div>
			<p className={form.description}>
				Add-ons help enhance your gaming experience.
			</p>
			<div className={styles.addOns}>
				{(Object.keys(addOnsData) as Array<SelectedAddOn>).map(addOn => (
					<AddOn
						key={addOn}
						addOn={addOn}
						pickedAddOns={pickedAddOns}
						planDuration={planDuration}
						updateFormData={updateFormData}
					/>
				))}
			</div>
		</div>
	)
}
