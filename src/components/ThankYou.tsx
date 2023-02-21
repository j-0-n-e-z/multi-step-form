import styles from './ThankYou.module.scss'

export const ThankYou = () => {
	return (
		<div className={styles.wrapper}>
			<div>
				<img src='./images/icon-thank-you.svg' alt='thank you' />
			</div>
			<div className={styles.title}>Thank you!</div>
			<div className={styles.text}>
				Thanks for confirming your subscription! We hope you have fun using our
				platform. If you ever need support, please feel free to email us at
				support@loremgaming.com
			</div>
		</div>
	)
}
