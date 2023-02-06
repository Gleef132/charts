import { useAppDispatch, useAppSelector } from 'hooks/redux'
import React, { FC, useEffect } from 'react'
import { themeSlice } from 'store/reducers/ThemeSlice'
import cl from './Header.module.scss'

const Header: FC = () => {

	const { theme } = useAppSelector(state => state.themeReducer)
	const dispatch = useAppDispatch()
	const { themeChange } = themeSlice.actions

	const changeTheme = (e: React.MouseEvent<HTMLInputElement>) => {
		if (theme === 'light') {
			dispatch(themeChange('dark'))
		} else {
			dispatch(themeChange('light'))
		}
	}
	useEffect(() => {
		dispatch(themeChange(theme))
		//eslint-disable-next-line
	}, [])

	return (
		<header className={cl.header}>
			<div className={`${cl.header__container} _container`}>
				<div className={cl.header__body}>
					<div className={cl.header__logo}>LOGO</div>
					<div className={cl.header__menu}>
						<label htmlFor="theme" className={cl.header__theme__switch}>
							{theme === 'dark' ? <input type="checkbox" id="theme" onClick={changeTheme} defaultChecked /> :
								<input type="checkbox" id="theme" onClick={changeTheme} />}
							<div className={cl.header__btn}></div>
						</label>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
