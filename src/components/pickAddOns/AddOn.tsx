import { FC } from 'react'
import styles from './AddOn.module.scss'
import cn from 'classnames'
import { AddOn as AddOnType, FormItems } from '../Panel'
import { addOnsData } from '../../data/addOnsData'
import { breakCamelCase, capitalize, getPricePerPeriodString } from '../../helpers'

type AddOnProps = Pick<FormItems, 'planDuration' | 'pickedAddOns'> & {
	addOn: AddOnType
	updateFormData: (fieldsToUpdate: Partial<FormItems>) => void
}

export const AddOn: FC<AddOnProps> = ({
	addOn,
	pickedAddOns,
	updateFormData,
	planDuration
}) => {
	return (
		<label
			htmlFor={addOn}
			className={cn(styles.addOn, {
				[styles.selected]: pickedAddOns[addOn]
			})}
		>
			<input
				className={styles.checkbox}
				id={addOn}
				type='checkbox'
				onChange={() =>
					updateFormData({
						pickedAddOns: {
							...pickedAddOns,
							[addOn]: !pickedAddOns[addOn]
						}
					})
				}
				checked={pickedAddOns[addOn]}
			/>
			<div className={styles.info}>
				<div className={styles.title}>{capitalize(breakCamelCase(addOn))}</div>
				<div className={styles.description}>
					{addOnsData[addOn].description}
				</div>
			</div>
			<div className={styles.price}>
				{getPricePerPeriodString(planDuration, addOnsData[addOn][planDuration])}
			</div>
		</label>
	)
}