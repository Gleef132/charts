import React, { FC, useState } from 'react'
import cl from './MonthModal.module.scss'
import SelectList from 'commponents/select/SelectList'
import MyButton from 'commponents/button/MyButton';
import { amountMonths } from 'charts/Line/Months';
import ProductModal from '../Product/ProductModal';
import { chartSlice } from 'store/reducers/ChartSlice';

interface MonthModalProps {
	onClick: (text: string) => void;
}


const MonthModal: FC<MonthModalProps> = ({ onClick }) => {

	const [firstMonth, setFirstMonth] = useState<number>()
	const [lastMonth, setLastMonth] = useState<number>()
	const [isValid, setIsValid] = useState<boolean>(false)
	const [productModalActive, setProductModalActive] = useState<boolean>(true)
	const [data, setData] = useState<string[]>()

	const months = amountMonths(1, 12)

	const backHandler = () => {
		onClick('main')
	}

	const nextHandler = () => {
		if (firstMonth && lastMonth) {
			setProductModalActive(false)
			let result = []
			for (let i = firstMonth; i <= lastMonth; i++) {
				result.push(`${amountMonths(i, i)}`)
			}
			setData(result)
		} else {
			setIsValid(true)
		}
	}

	return (
		<>
			{productModalActive ?
				<div className={cl.modal}>
					{isValid && <div className={cl.modal__error}>Fill in the fields correctly</div>}
					<div className={cl.modal__item}>
						<h1 className={cl.modal__title}>Start</h1>
						<h1 className={cl.modal__title}>End</h1>
					</div>
					<div className={cl.modal__item}>
						<SelectList title='Choose month' data={months} onClick={setFirstMonth} />
						<SelectList title='Choose month' data={months} onClick={setLastMonth} />
					</div>
					<div className={cl.modal__item}>
						<MyButton text='Back' onClick={backHandler} />
						<MyButton text='Next' onClick={nextHandler} />
					</div>
				</div>
				:
				<ProductModal backHandler={setProductModalActive} chartData={data} />
			}
		</>
	)
}

export default MonthModal