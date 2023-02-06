import React, { useEffect, useState } from 'react'
import cl from './Home.module.scss'
import ChooseModal from 'commponents/modals/Choose/ChooseModal'
import LineChart from 'charts/Line/LineChart'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import HomeMain from './HomeMain'
import ProductModal from 'commponents/modals/Product/ProductModal'
import { chartSlice } from 'store/reducers/ChartSlice'
import ChangeValueModal from 'commponents/modals/ChangeValue/ChangeValueModal'

const Home = () => {

	const { dataValue, isLoading, data } = useAppSelector(state => state.chartReducer)
	const [modalActive, setModalActive] = useState<boolean>(isLoading)
	const [typeModal, setTypeModal] = useState<string>('')
	const [innerModalOpen, setInnerModalOpen] = useState<boolean>(true)
	const dispatch = useAppDispatch()

	const showModal = (e: React.MouseEvent, text: string) => {
		setModalActive(true)
		dispatch(typeChange(text))
	}

	const { theme } = useAppSelector(state => state.themeReducer)
	const { typeChange, loadingChange, clearChart } = chartSlice.actions
	const [render, setRender] = useState<boolean>(false)
	const btnCondition = dataValue.length === 2

	const deteleCharts = (e: React.MouseEvent) => {
		setModalActive(false)
		dispatch(loadingChange(false))
		dispatch(clearChart())
	}

	const addChartComparsion = (e: React.MouseEvent) => {
		if (btnCondition) {
			setTypeModal('CHANGE_MODAL')
			setInnerModalOpen(false)
		} else {
			setTypeModal('ADD_MODAL')
			setInnerModalOpen(false)
		}
	}

	const closeModal = (e: React.MouseEvent) => {
		setModalActive(false)
	}

	useEffect(() => {
		if (isLoading) {
			setRender(!render)
		}
		//eslint-disable-next-line
	}, [theme, modalActive])

	const getModal = () => {
		console.log('lox')
		switch (typeModal) {
			case 'ADD_MODAL':
				return <div className={cl.home__add__modal} onClick={() => setInnerModalOpen(true)}>
					<div className={cl.home__add__modal__content}>
						<ProductModal backHandler={setInnerModalOpen} chartData={data} />
					</div>
				</div>
			case 'CHANGE_MODAL':
				return <div className={cl.home__add__modal} onClick={() => setInnerModalOpen(true)}>
					<div className={cl.home__add__modal__content}>
						<ChangeValueModal backHandler={setInnerModalOpen} />
					</div>
				</div>
			default:
				break;
		}
	}

	return (
		<section className={cl.home}>
			<div className={`${cl.home__container} _container`}>
				{modalActive ?
					render ?
						<>
							{!isLoading && <ChooseModal onClick={closeModal} />}
							{isLoading &&
								<div className={cl.home__chart__content}>
									<LineChart />
									<div className={cl.home__chart__btns}>
										<button className={cl.home__chart__btn} onClick={addChartComparsion}>{btnCondition ? 'Change graph' : 'Add graph for comparison'}</button>
										<button className={cl.home__chart__btn} onClick={deteleCharts}>Delete all graph</button>
									</div>
								</div>
							}
							{!innerModalOpen &&
								getModal()
							}
						</>
						:
						<>
							{!innerModalOpen &&
								getModal()
							}
							{!isLoading && <ChooseModal onClick={closeModal} />}
							<div className={cl.home__chart__content}>
								{isLoading && <LineChart />}
								<div className={cl.home__chart__btns}>
									<button className={cl.home__chart__btn} onClick={addChartComparsion}>{btnCondition ? 'Change graph' : 'Add graph for comparison'}</button>
									<button className={cl.home__chart__btn} onClick={deteleCharts}>Delete all graph</button>
								</div>
							</div>
						</>
					:
					<HomeMain onClick={showModal} />
				}
			</div>
		</section >
	)
}

export default Home