import React, { FC } from 'react'
import cl from './Home.module.scss'
import { ReactComponent as BarGraph } from 'assets/images/barGraph.svg'
import { ReactComponent as LineGraph } from 'assets/images/lineGraph.svg'

interface HomeMainProps {
	onClick: (e: React.MouseEvent, text: string) => void;
}

const HomeMain: FC<HomeMainProps> = ({ onClick }) => {
	return (
		<div className={cl.home__content}>
			<div className={cl.home__item}>
				<div className={cl.home__card}>
					<div className={cl.home__title}>Сreate a quick chart</div>
					<div className={cl.home__text}>You can create not only one chart, but compare several charts.</div>
					<button className={cl.home__btn}>Click bar or line chart</button>
				</div>
			</div>
			<div className={cl.home__item}>
				<div className={cl.home__card} onClick={(e) => onClick(e, 'bar')}>
					{/* <div className={cl.home__title}>Сreate a bar chart</div> */}
					<BarGraph />
					{/* <button className={cl.home__btn}>Create</button> */}
				</div>
				<div className={cl.home__card} onClick={(e) => onClick(e, 'line')}>
					{/* <div className={cl.home__title}>Сreate a line chart</div> */}
					<LineGraph />
					{/* <button className={cl.home__btn}>Create</button> */}
				</div>
			</div>
		</div>
	)
}

export default HomeMain