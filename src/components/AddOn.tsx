import { FC } from 'react'
import styles from './AddOn.module.scss'
import cn from 'classnames'
import { FormItems } from './Panel'
import { addOnsData } from '../data/addOns'
import { capitalize, getPriceString } from '../helpers'

type AddOnProps = Pick<FormItems, 'isMonthly' | 'selectedAddOns'> & {
	addOn: string
	updateFormData: (fieldsToUpdate: Partial<FormItems>) => void
}

export const AddOn: FC<AddOnProps> = ({
	addOn,
	selectedAddOns,
	updateFormData,
	isMonthly
}) => {
	return (
		<label
			htmlFor={addOn}
			className={cn(styles.addOn, {
				[styles.addOnSelected]: selectedAddOns[addOn]
			})}
		>
			<input
				className={styles.checkbox}
				id={addOn}
				type='checkbox'
				onChange={() =>
					updateFormData({
						selectedAddOns: {
							...selectedAddOns,
							[addOn]: !selectedAddOns[addOn]
						}
					})
				}
				checked={selectedAddOns[addOn]}
			/>
			<div className={styles.addOnInfo}>
				<div className={styles.addOnTitle}>
					{capitalize(addOn.replace(/([A-Z])/, x => ` ${x.toLowerCase()}`))}
				</div>
				<div className={styles.addOnDescription}>
					{addOnsData[addOn].description}
				</div>
			</div>
			<div className={styles.addOnPrice}>
				{getPriceString(
					isMonthly,
					addOnsData[addOn].monthly,
					addOnsData[addOn].yearly
				)}
			</div>
		</label>
	)
}
