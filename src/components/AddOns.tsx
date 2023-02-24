import { FC } from 'react'
import styles from './AddOns.module.scss'
import form from './Form.module.scss'
import { AddOn } from './AddOn'
import { addOnsData } from '../data/addOnsData'
import { FormItems } from './Panel'

export type AddOnsProps = FormItems & {
	updateFormData: (fieldsToUpdate: Partial<FormItems>) => void
}

export const AddOns: FC<AddOnsProps> = ({
	selectedAddOns,
	isMonthly,
	updateFormData
}) => {
	return (
		<div>
			<div className={form.title}>Pick add-ons</div>
			<p className={form.description}>
				Add-ons help enhance your gaming experience.
			</p>
			<div className={styles.addOns}>
				{Object.keys(addOnsData).map(addOn => (
					<AddOn
						key={addOn}
						addOn={addOn}
						selectedAddOns={selectedAddOns}
						isMonthly={isMonthly}
						updateFormData={updateFormData}
					/>
				))}
			</div>
		</div>
	)
}
