import { FunctionComponent, useState, useCallback, useEffect } from 'react';
import Header from '../../components/Header';
import data from '../../demo-data/us-population-density.json';
import osunMap from '../../demo-data/Osun.json';
import { dualColumn, getMap, getMapData, stateMaps } from '../../services/Charts.service';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highchartsMap from "highcharts/modules/map";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import BreadCrumb from '../../components/BreadCrumb';

const NcdDashboard: FunctionComponent = () => {
	const [chartData, setChartData] = useState({});
	const [columnChartData, setColumnChartData] = useState({});

	const fetchMap = async () => {

		let map = await getMap("Ekiti")
		let mapData = await getMapData("Ekiti")
		setColumnChartData(dualColumn("Elevated BP cascade"))
		setChartData(stateMaps(map, mapData, 'No of Clients  with elevated BP by LGA', 500))
	}

	useEffect(() => {
		fetchMap()
		return () => { console.log("Cleanup") }
	}, [])

	return (<>
		<div>
			<Header></Header>
			<div className="bg-container container-fluid  mt-2">

				<BreadCrumb state={"Osun Sate"} page={"Noncommunicable Diseases Dasboard"}></BreadCrumb>

				<div className="row">
					<div className="col-12 col-md-4">
						<div className="border">
							<div className="card mb-2  yellow-card">
								<div className="card-body">
									<h5 className="medium-card-title">22</h5>
									<p className="medium-card-text">Total facilities offering HIV care to patents in Osun state.</p>
								</div>
							</div>
							<div className="card mb-2 green-card">
								<div className="card-body">
									<h5 className="medium-card-title">24,314</h5>
									<p className="medium-card-text">Total patient receiving HIV treatment
										across all facilities in Osun state.</p>
								</div>
							</div>
							<div className="card mb-3 light-green-card">
								<div className="card-body">
									<h5 className="medium-card-title card-title">70%</h5>
									<p className="medium-card-text card-text">Treatment Saturation.</p>
								</div>
							</div>
							<div className="card mb-3 light-green-card">
								<div className="card-body">
									<h5 className="medium-card-title card-title">70%</h5>
									<p className="medium-card-text card-text">Treatment Saturation.</p>
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
