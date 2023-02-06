import { amountMonths } from 'charts/Line/Months';
import SelectList from 'commponents/select/SelectList';
import React, { FC, useState } from 'react';
import ProductModal from '../Product/ProductModal';
import cl from './DayWeekModal.module.scss';
import MyButton from 'commponents/button/MyButton'

interface DayModalProps {
	day: boolean;
	onClick: (text: string) => void;
}

const DayWeekModal: FC<DayModalProps> = ({ onClick, day }) => {

	const [firstCount, setFirstCount] = useState<number>()
	const [lastCount, setLastCount] = useState<number>()
	const [firstMonth, setFirstMonth] = useState<number>()
	const [productModalActive, setProductModalActive] = useState<boolean>(true)
	const [isValid, setIsValid] = useState<boolean>(false)
	const [data, setData] = useState<string[]>()

	const months = amountMonths(1, 12)
	const numArray = day ? Array.from(Array(32).keys()).slice(1) : [1, 2, 3, 4]

	const clickHandler = (e: React.MouseEvent) => {
		let valid = false;
		if (firstCount && lastCount && firstMonth) {
			setProductModalActive(false)
			valid = true;
		} else {
			setIsValid(true)
			valid = false;
		}
		if (valid) {
			if (lastCount && firstCount) {
				let result = []
				let condition = day ? lastCount <= firstCount : firstCount === lastCount;
				let firstMonthStr = firstMonth && amountMonths(firstMonth, firstMonth)
				let lastMonthStr = firstMonth && amountMonths(firstMonth + 1, firstMonth + 1)
				if (condition) {
					let num = day ? 31 - (31 - lastCount) : 5 - (5 - lastCount)
					let condition = day ? 31 - firstCount + 1 : 5 - firstCount;
					for (let i = 0; i < condition; i++) {
						result.push(`${firstCount + i} ${firstMonthStr}`)
					}
					for (let i = 1; i <= num; i++) {
						result.push(`${i} ${lastMonthStr}`)
					}
				} else {
					for (let i = firstCount; i <= lastCount; i++) {
						result.push(`${i} ${firstMonthStr}`)
					}
				}
				setData(result)
			}
		}
	}

	const backHandler = () => {
		onClick('main')
	}

	return (
		<>
			{productModalActive ?
				<div className={cl.modal}>
					{isValid && <div className={cl.modal__error}>Fill in the fields correctly</div>}
					<div className={cl.modal__item}>
						<h1 className={cl.modal__main__title}>Start</h1>
						<h1 className={cl.modal__main__title}>End</h1>
					</div>
					<div className={cl.modal__item}>
						<SelectList data={numArray} title={day ? 'Choose day' : 'Choose week'} onClick={setFirstCount} classList={cl.modal__list} classListOpen={cl.modal__list__open} classLink={cl.modal__link} classTitle={cl.modal__title} />
						<SelectList data={numArray} title={day ? 'Choose day' : 'Choose week'} onClick={setLastCount} classList={cl.modal__list} classListOpen={cl.modal__list__open} classLink={cl.modal__link} classTitle={cl.modal__title} />
					</div>
					<div className={cl.modal__item}>
						<SelectList data={months} title="Choose month" onClick={setFirstMonth} classList={cl.modal__list} classListOpen={cl.modal__list__open} classLink={cl.modal__link} classTitle={cl.modal__title} />
						<div className={cl.modal__list}></div>
					</div>
					<div className={cl.modal__item}>
						{/* <button className={cl.modal__btn} onClick={(e) => onClick(e, 'main')}>Back</button> */}
						<MyButton text='Back' onClick={backHandler} />
						<MyButton text='Next' onClick={clickHandler} />
					</div>
				</div>
				:
				<ProductModal backHandler={setProductModalActive} chartData={data} />
			}
		</>
	)
}

export default DayWeekModal
