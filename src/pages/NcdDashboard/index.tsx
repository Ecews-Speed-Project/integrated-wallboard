import { FunctionComponent, useState, useCallback, useEffect } from 'react';
import { dualColumn, getMap, getMapData, stateMaps } from '../../services/Charts.service';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highchartsMap from "highcharts/modules/map";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import BreadCrumb from '../../components/BreadCrumb';
import { auth } from '../../services/auth.services';
highchartsMap(Highcharts);

const NcdDashboard: FunctionComponent = () => {
	const [user, setUser] = useState<{ [key: string]: any }>({});

	const [chartData, setChartData] = useState({});
	const [columnChartData, setColumnChartData] = useState({});
	const [loading, setLoading] = useState(false);


	const fetchMap = async (user:any) => {
		setLoading(true)
		let state = user.state
		let map = await getMap(state)
		let mapData = await getMapData(state)
		setColumnChartData(dualColumn("Elevated BP cascade"))
		setChartData(stateMaps(map, mapData, 'No of Clients  with elevated BP by LGA', 500))
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

				<BreadCrumb state={"Osun Sate"} page={"Noncommunicable Diseases Dasboard"}></BreadCrumb>

				<div className="row">
					<div className="col-12 col-md-4">
						<div className="border">
							<div className="card mb-2  yellow-card">
								<div className="card-body">
									<h5 className="medium-card-title">89%</h5>
									<p className="medium-card-text">of ART clinic attendees
									screened for BP</p>
								</div>
							</div>
							<div className="card mb-2 green-card">
								<div className="card-body">
									<h5 className="medium-card-title">21%</h5>
									<p className="medium-card-text">Had elevated BP</p>
								</div>
							</div>
							<div className="card mb-3 light-green-card">
								<div className="card-body">
									<h5 className="medium-card-title card-title light-green">70%</h5>
									<p className="medium-card-text card-text light-green">With Elevated BP, Diagnosed</p>
								</div>
							</div>
							<div className="card mb-3 dark-green-card">
								<div className="card-body">
									<h5 className="medium-card-title card-title dark-green">70%</h5>
									<p className="medium-card-text card-text dark-green">Commenced treatment</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-8">
						<div className='mb-4'>
							<HighchartsReact

								constructorType={'mapChart'}
								highcharts={Highcharts}
								options={chartData}
							/>
						</div>
						<HighchartsReact
							constructorType={'mapChart'}
							highcharts={Highcharts}
							options={columnChartData}
						/>

					</div>

				</div>
			</div>
		</div>
	</>);
};

export default NcdDashboard;
