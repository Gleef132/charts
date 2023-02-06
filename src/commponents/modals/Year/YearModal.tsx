
import MyButton from 'commponents/button/MyButton';
import React, { FC, useState } from 'react'
import cl from './YearModal.module.scss'
import ProductModal from '../Product/ProductModal';
import { chartSlice } from 'store/reducers/ChartSlice';


interface YearModalProps {
	onClick: (text: string) => void;
}

const YearModal: FC<YearModalProps> = ({ onClick }) => {

	const [firstValue, setFirstValue] = useState<string>('')
	const [lastValue, setLastValue] = useState<string>('')
	const [isValid, setIsValid] = useState<boolean>(false)
	const [productModalActive, setProductModalActive] = useState<boolean>(true)
	const [data, setData] = useState<string[]>()


	const backHandler = () => {
		onClick('main')
	}

	const nextHandler = () => {
		if (firstValue && lastValue) {
			setProductModalActive(false)
			let result = []
			let firstNum = Number(firstValue)
			let lastNum = Number(lastValue)

			for (let i = firstNum; i <= lastNum; i++) {
				result.push(`${i}`)
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
						<input type="number" value={firstValue} onChange={(e) => setFirstValue(e.target.value)} className={cl.modal__input} placeholder="Example from: 2019" />
						<input type="number" value={lastValue} onChange={(e) => setLastValue(e.target.value)} className={cl.modal__input} placeholder="Example to: 2022" />
					</div>
					<div className={cl.modal__item}>
						<MyButton onClick={backHandler} text='Back' />
						<MyButton onClick={nextHandler} text='Next' />
					</div>
				</div>
				:
				<ProductModal chartData={data} backHandler={setProductModalActive} />
			}
		</>
	)
}

export default YearModal
