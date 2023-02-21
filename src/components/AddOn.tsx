import { FC } from 'react'
import styles from './AddOn.module.scss'
import cn from 'classnames'

export const AddOn: FC<AddOnPropsType> = ({
	title,
	description,
	price,
	isSelected,
	selectAddOn,
	unselectAddOn
}) => {
	const handleAddOnSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			selectAddOn()
		} else {
			unselectAddOn()
		}
	}

	return (
		<label
			htmlFor={title}
			className={cn(styles.addOn, {
				[styles.addOnSelected]: isSelected
			})}
		>
      <input
        className={styles.checkbox}
				id={title}
				type='checkbox'
				onChange={handleAddOnSelected}
				checked={isSelected}
			/>
			<div className={styles.addOnInfo}>
				<div className={styles.addOnTitle}>{title.split('_').join(' ')}</div>
				<div className={styles.addOnDescription}>{description}</div>
			</div>
			<div className={styles.addOnPrice}>{price}</div>
		</label>
	)
}

type AddOnPropsType = {
	title: string
	description: string
	price: string
	isSelected: boolean
	selectAddOn: any
	unselectAddOn: any
}
