import { FunctionComponent, useState, useCallback, useEffect } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highchartsMap from "highcharts/modules/map";
import { getMap, getMapData, stateMaps } from '../../services/Charts.service';
import NonHIVTable from '../../components/NonHIVTable';
import SmallCard from '../../components/SmallCard';
import BreadCrumb from '../../components/BreadCrumb';
import { auth } from '../../services/auth.services';
import Carousel from 'react-bootstrap/Carousel';
import { GenericObject } from '../../types/dseaseData';
import { summaryDashboard } from '../../services/mock/summaryDashboard';
import HIVTable from '../../components/hivTable';
import { handleSearch, handleSearchArray } from '../../utils/helpers';
highchartsMap(Highcharts);

const SummaryBoard: FunctionComponent = () => {

	const [user, setUser] = useState<{ [key: string]: any }>({});
	const [loading, setLoading] = useState(false);
	const [chartData, setChartData] = useState({});
	const [chart1Data, setChart1Data] = useState({});
	const [chart2Data, setChart2Data] = useState({});
	const [chart3Data, setChart3Data] = useState({});
	const [summaryData, setSummaryData] = useState({});
	const [statsData, setStatsData] = useState<GenericObject>({});
	const [otherDisease, setOtherDisease] = useState<GenericObject[]>([]);
	const [hivDisease, setHivDisease] = useState<GenericObject[]>([]);

	const fetchMap = async (user: any) => {
		setLoading(true)
		let state = user.state
		let map = await getMap(state)
		let mapData = await getMapData(state)

		//set Desease table
		setSummaryData(summaryDashboard)

		let stats = handleSearch(summaryDashboard.stats, user.stateId)
		setStatsData(stats)

		let otherDiseaseData = handleSearchArray(summaryDashboard.otherDisease, user.stateId)
		setOtherDisease(otherDiseaseData)
		console.log(otherDisease)

		let hivDiseaseData = handleSearchArray(summaryDashboard.hivDisease, user.stateId)
		setHivDisease(hivDiseaseData)


		setChartData(stateMaps(map, mapData, 'New Case of Monkey Pox in ' + state + " state by lga", 760))
		setChart1Data(stateMaps(map, mapData, 'New Case of Cholera in ' + state + " state by lga", 760))
		setChart2Data(stateMaps(map, mapData, 'New Case of Laser Fever in ' + state + " state by lga", 760))
		setChart3Data(stateMaps(map, mapData, 'Maternal-Newborn in ' + state + " state by lga", 760))
	}

	useEffect(() => {
		setUser(auth);
		if (user.state !== null) {
			fetchMap(user)
		}
		return () => { console.log("Cleanup") }

	}, [loading])

	return (<>
		<div>
			<div className="bg-container container-fluid  mt-2">
				<BreadCrumb state={user.state + " State"} page={"Summary Page"}></BreadCrumb>
				<div className="row">
					<SmallCard title={"Maternal-Newborn Cases"} value={statsData.maternalNewborn}></SmallCard>
					<SmallCard title={"New Lasa Fever Cases"} value={statsData.lasaFever}></SmallCard>
					<SmallCard title={"New Cholera Cases"} value={statsData.Colera}></SmallCard>
					<SmallCard title={"New Monkey Pox Cases"} value={statsData.Mpox}></SmallCard>
					<SmallCard title={"Screen for TB"} value={statsData.screenforTB}></SmallCard>
					<SmallCard title={"Recent HIV infections"} value={statsData.recentHIVInfections}></SmallCard>
					<div className="col-12 col-md-6">
						<div className="card-body table-card-bg mb-2">
							<h1 className='small-card-title '>Top 7 LGAs  Data sheet for non HIV Disease </h1>
							<NonHIVTable data={otherDisease} />
						</div>

						<div className="card-body table-card-bg">
							<h1 className='small-card-title '>Top 7 LGAs  Data sheet for HIV Disease and NCDs</h1>
							<HIVTable data={hivDisease} />
						</div>


					</div>

					<div className="col-12 col-md-6">
						<Carousel>
							<Carousel.Item>
								<HighchartsReact
									constructorType={'mapChart'}
									highcharts={Highcharts}
									options={chartData}
								/>
							</Carousel.Item>
							<Carousel.Item>
								<HighchartsReact
									constructorType={'mapChart'}
									highcharts={Highcharts}
									options={chart1Data}
								/>
							</Carousel.Item>
							<Carousel.Item>
								<HighchartsReact
									constructorType={'mapChart'}
									highcharts={Highcharts}
									options={chart2Data}
								/>
							</Carousel.Item>
							<Carousel.Item>
								<HighchartsReact
									constructorType={'mapChart'}
									highcharts={Highcharts}
									options={chart3Data}
								/>
							</Carousel.Item>
						</Carousel>
					</div>
				</div>
			</div>
		</div >
	</>);
};

export default SummaryBoard;
