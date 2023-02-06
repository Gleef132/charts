import React, { FC, useState } from 'react'
import { chartSlice } from 'store/reducers/ChartSlice'
import DayWeekModal from '../DayWeek/DayWeekModal'
import MainModal from '../Main/MainModal'
import MonthModal from '../Month/MonthModal'
import YearModal from '../Year/YearModal'
import cl from './ChooseModal.module.scss'

interface ChooseModalProps {
	onClick: (e: React.MouseEvent) => void;
}

const ChooseModal: FC<ChooseModalProps> = ({ onClick }) => {
	const [modalType, setModalType] = useState<string>('main')

	const graphClickHandler = (text: string) => {
		setModalType(text)
	}

	return (
		<div className={cl.modal} onClick={onClick}>
			<div className={cl.modal__content} onClick={(e) => e.stopPropagation()}>
				<div className={cl.modal__close} onClick={onClick}></div>
				{modalType === 'main' &&
					<MainModal onClick={graphClickHandler} />
				}
				{modalType === 'day' &&
					<DayWeekModal onClick={graphClickHandler} day={true} />
				}
				{modalType === 'week' &&
					<DayWeekModal onClick={graphClickHandler} day={false} />
				}
				{modalType === 'month' &&
					<MonthModal onClick={graphClickHandler} />
				}
				{modalType === 'year' &&
					<YearModal onClick={graphClickHandler} />
				}
			</div>
		</div>
	)
}

export default ChooseModal
