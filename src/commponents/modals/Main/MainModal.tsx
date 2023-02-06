
import React, { FC } from 'react'
import cl from './MainModal.module.scss'

interface MainModalProps {
	onClick: (text: string) => void;
}

const MainModal: FC<MainModalProps> = ({ onClick }) => {



	const clickHandler = (e: React.MouseEvent, text: string) => {
		onClick(text)
	}

	return (
		<div className={cl.modal}>
			<h1 className={cl.modal__title}>Select graph mode</h1>
			<button className={cl.modal__btn} onClick={(e) => clickHandler(e, 'day')}>Graph by days</button>
			<button className={cl.modal__btn} onClick={(e) => clickHandler(e, 'week')}>Graph by weeks</button>
			<button className={cl.modal__btn} onClick={(e) => clickHandler(e, 'month')}>Graph by months</button>
			<button className={cl.modal__btn} onClick={(e) => clickHandler(e, 'year')}>Graph by years</button>
		</div>
	)
}

export default MainModal
