import { FC } from 'react'
import styles from './AddOn.module.scss'
import cn from 'classnames'
import { FormItems } from './Panel'
import { addOnsData } from '../data/addOnsData'
import { breakCamelCase, capitalize, getPricePerPeriodString } from '../helpers'

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
				[styles.selected]: selectedAddOns[addOn]
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
			<div className={styles.info}>
				<div className={styles.title}>
					{capitalize(breakCamelCase(addOn))}
				</div>
				<div className={styles.description}>
					{addOnsData[addOn].description}
				</div>
			</div>
			<div className={styles.price}>
				{getPricePerPeriodString(
					isMonthly,
					addOnsData[addOn].monthly,
					addOnsData[addOn].yearly
				)}
			</div>
		</label>
	)
}
