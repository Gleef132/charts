import React, { FC, useState } from 'react'
import cl from './SelectList.module.scss'

interface SelectListProps {
	data: any[];
	onClick: (num: number) => void;
	onClickMonth?: (month: string) => void;
	title: string;
	classTitle?: string;
	classList?: string;
	classLink?: string;
	classListOpen?: string;
}

const SelectList: FC<SelectListProps> = ({ data, title, classTitle, classLink, classListOpen, classList, onClick }) => {

	const [value, setValue] = useState<string>(title)

	const clickHandler = (e: React.MouseEvent<HTMLDivElement>, num: number) => {
		setValue(e.currentTarget.textContent as string)
		onClick(num)
	}

	return (
		<>
			<div className={cl.select__list}>
				<div className={cl.select__title}>{value}</div>
				<div className={cl.select__list__open}>
					{data.map((item, index) => {
						return <div key={item} className={cl.select__link} onClick={(e) => clickHandler(e, index + 1)} >{item}</div>
					})}
				</div>
			</div>
		</>
	)
}

export default SelectList
