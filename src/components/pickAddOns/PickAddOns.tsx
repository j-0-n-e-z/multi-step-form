import { FC } from 'react'
import styles from './PickAddOns.module.scss'
import form from '../Form.module.scss'
import { AddOn } from './AddOn'
import { addOnsData } from '../../data/addOnsData'
import { FormItems, AddOn as AddOnType } from '../Panel'

export type PickAddOnsProps = FormItems & {
	updateFormData: (fieldsToUpdate: Partial<FormItems>) => void
}

export const PickAddOns: FC<PickAddOnsProps> = ({
	pickedAddOns,
	planDuration,
	updateFormData
}) => {
	return (
		<>
			<div className={form.title}>Pick add-ons</div>
			<p className={form.description}>
				Add-ons help enhance your gaming experience.
			</p>
			<div className={styles.addOns}>
				{(Object.keys(addOnsData) as AddOnType[]).map(addOn => (
					<AddOn
						key={addOn}
						addOn={addOn}
						pickedAddOns={pickedAddOns}
						planDuration={planDuration}
						updateFormData={updateFormData}
					/>
				))}
			</div>
		</>
	)
}
