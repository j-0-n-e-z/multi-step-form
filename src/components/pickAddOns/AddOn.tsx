import { FC } from 'react'
import styles from './AddOn.module.scss'
import cn from 'classnames'
import { addOnsData } from '../../data/addOnsData'
import { capitalize } from '../../utils/capitalize'
import { breakCamelCase } from '../../utils/breakCamelCase'
import { formatPrice } from '../../utils/formatPrice'
import { AddOn as TAddOn, DefaultProps } from '../../types'

type AddOnProps = Pick<
	DefaultProps,
	'planDuration' | 'pickedAddOns' | 'updateFormData'
> & {
	addOn: TAddOn
}

export const AddOn: FC<AddOnProps> = ({
	addOn,
	planDuration,
	pickedAddOns,
	updateFormData
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
				{formatPrice(addOnsData[addOn][planDuration], planDuration)}
			</div>
		</label>
	)
}
