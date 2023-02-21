import { FC } from 'react'
import styles from './AddOns.module.scss'
import form from './Form.module.scss'
import cn from 'classnames'
import { AddOn } from './AddOn'
import { addOns } from '../addOns'
import { getMoneyPerPeriodString } from '../helpers'

export const AddOns: FC<AddOnsPropsType> = ({
	setStep,
	isMonthly,
	setSelectedAddOns,
	selectedAddOns
}) => {
	const handleFormSubmitted = (e: React.FormEvent) => {
		e.preventDefault()
		setStep(prevStep => prevStep + 1)
	}

	return (
		<form onSubmit={handleFormSubmitted} className={form.form}>
			<div className={form.title}>Pick add-ons</div>
			<p className={form.description}>
				Add-ons help enhance your gaming experience.
			</p>
			<div className={styles.addOns}>
				{addOns.map(addOn => (
					<AddOn
						key={addOn.title}
						title={addOn.title}
						description={addOn.description}
						price={getMoneyPerPeriodString(isMonthly, addOn.price.monthly, addOn.price.yearly)}
						isSelected={selectedAddOns[addOn.title]}
						selectAddOn={() =>
							setSelectedAddOns(prev => ({ ...prev, [addOn.title]: true }))
						}
						unselectAddOn={() =>
							setSelectedAddOns(prev => ({ ...prev, [addOn.title]: false }))
						}
					/>
				))}
			</div>
			<div className={form.navigation}>
				<button
					className={form.goBack}
					type='button'
					onClick={() => setStep(prevStep => prevStep - 1)}
				>
					Go Back
				</button>
				<button className={form.submit} type='submit'>
					Next Step
				</button>
			</div>
		</form>
	)
}

export type AddOnsPropsType = {
  setStep: React.Dispatch<React.SetStateAction<number>>
  isMonthly: boolean
  setSelectedAddOns: React.Dispatch<React.SetStateAction<{}>>
  selectedAddOns: {[key: string]: boolean}
}
