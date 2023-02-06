import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { FC, useState } from 'react'
import { chartSlice } from 'store/reducers/ChartSlice';
import cl from './ChangeValueModal.module.scss'

interface ChangeValueModalProps {
	backHandler: (arg: boolean) => void;
}

const ChangeValueModal: FC<ChangeValueModalProps> = ({ backHandler }) => {

	const [firstValue, setFirstValue] = useState<string>('')
	const [secondaryValue, setSecondaryValue] = useState<string>('')
	const [isValid, setIsValid] = useState<boolean>(false)
	const { data, dataValue } = useAppSelector(state => state.chartReducer)
	const { chartChange } = chartSlice.actions
	const dispatch = useAppDispatch()

	const changeChartHandler = (e: React.MouseEvent) => {
		const firstData = firstValue.split(',').map(Number)
		const secondaryData = secondaryValue.split(',').map(Number)
		if (firstValue && secondaryValue) {
			if (data.length === firstData.length && data.length === secondaryData.length) {
				backHandler(true)
				dispatch(chartChange([firstData, secondaryData]))
			} else {
				setIsValid(true)
			}
		}
		if (firstValue && !secondaryValue) {
			if (data.length === firstData.length) {
				backHandler(true)
				dispatch(chartChange([firstData, dataValue[1]]))
			} else {
				setIsValid(true)
			}
		}
		if (secondaryValue && !firstValue) {
			if (data.length === secondaryData.length) {
				backHandler(true)
				dispatch(chartChange([dataValue[0], secondaryData]))
			} else {
				setIsValid(true)
			}
		}
	}

	return (
		<div className={cl.modal} onClick={(e) => e.stopPropagation()}>
			{isValid && <div className={cl.modal__error}>Fill in the fields correctly</div>}
			<div className={cl.modal__item}>
				<div className={cl.modal__title}>Change the values of the first graph</div>
				<input type="text" className={cl.modal__input} value={firstValue} onChange={(e) => setFirstValue(e.target.value.replace(/[^0-9,]/g, ''))} />
			</div>
			<div className={cl.modal__item}>
				<div className={cl.modal__title}>Change the values of the secondary graph</div>
				<input type="text" className={cl.modal__input} value={secondaryValue} onChange={(e) => setSecondaryValue(e.target.value.replace(/[^0-9,]/g, ''))} />
			</div>
			<div className={cl.modal__btns}>
				<button className={cl.modal__btn} onClick={() => backHandler(true)}>Back</button>
				<button className={cl.modal__btn} onClick={changeChartHandler}>Next</button>
			</div>
		</div>
	)
}

export default ChangeValueModal
