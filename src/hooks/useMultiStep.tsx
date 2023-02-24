import { useState } from 'react'

export const useMultiStep = (stepsCount: number) => {
	const [currentStepIndex, setCurrentStepIndex] = useState(0)

	const goNext = () => {
		if (currentStepIndex === stepsCount - 1) return
		setCurrentStepIndex(prev => prev + 1)
	}

	const goBack = () => {
		if (currentStepIndex === 0) return
		setCurrentStepIndex(prev => prev - 1)
	}

	const goToStep = (stepIndex: number) => {
		setCurrentStepIndex(stepIndex)
	}

  return {
    currentStepIndex,
		goNext,
		goBack,
		goToStep,
		isFirstStep: currentStepIndex === 0,
		isLastStep: currentStepIndex === stepsCount - 1
	}
}
