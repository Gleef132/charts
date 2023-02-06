import { useAppDispatch } from 'hooks/redux';
import React, { ChangeEvent, FC, useState } from 'react'
import { chartSlice } from 'store/reducers/ChartSlice';
import cl from './ProductModal.module.scss'

interface ProductModalProps {
	backHandler: (arg: boolean) => void;
	chartData?: string[];
}

const ProductModal: FC<ProductModalProps> = ({ backHandler, chartData }) => {

	const [value, setValue] = useState<string>('')
	const [isValid, setIsValid] = useState<boolean>(false)
	const dispatch = useAppDispatch()
	const { loadingChange, dataAdd, dataValueAdd } = chartSlice.actions

	const validationHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value.replace(/[^0-9,]/g, ''))
	}

	const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		let data = value.split(',').map(Number)
		if (chartData?.length === data.length) {
			dispatch(dataValueAdd(data as number[]))
			dispatch(dataAdd(chartData))
			dispatch(loadingChange(true))
			backHandler(true)
		} else {
			setIsValid(true)
		}
	}

	return (
		<div className={cl.modal} onClick={(e) => e.stopPropagation()}>
			{isValid && <div className={cl.modal__error}>Fill in the fields correctly</div>}
			<h1 className={cl.modal__title}>Write the number of products sold</h1>
			<div className={cl.modal__text}>Write the number of products sold separated by commas, for example: 150,320,405</div>
			<input type="text" className={cl.modal__input} placeholder="Example: 150,320,405" value={value} onChange={validationHandler} />
			<div className={cl.modal__btns}>
				<button className={cl.modal__btn} onClick={() => backHandler(true)}>Back</button>
				<button className={cl.modal__btn} onClick={clickHandler}>Next</button>
			</div>
		</div>
	)
}

export default ProductModal
