import React, { FC } from 'react'
import cl from './MyButton.module.scss'

interface MyButtonProps {
	onClick: (e: React.MouseEvent) => void;
	text: string;
}

const MyButton: FC<MyButtonProps> = ({ text, onClick }) => {
	return (
		<button onClick={onClick} className={cl.btn} >{text}</button>
	)
}

export default MyButton
