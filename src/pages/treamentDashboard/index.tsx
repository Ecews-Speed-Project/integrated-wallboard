import { FunctionComponent, useState, useCallback, useEffect } from 'react';
import Header from '../../components/Header';
import data from '../../demo-data/us-population-density.json';
import osunMap from '../../demo-data/Osun.json';
import { getMap, getMapData, stateMaps } from '../../services/Charts.service';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import BreadCrumb from '../../components/BreadCrumb';

const TreamentDashboard: FunctionComponent = () => {
	const [chartData, setChartData] = useState({});
	const fetchMap = async () => {

		let map = await getMap("Osun")
		let mapData = await getMapData("Osun")
		setChartData(stateMaps(map, mapData, 'Percentage of Unique Clients by LGA', 800))
	}

	useEffect(() => {
		// Define the fetch function
		fetchMap()
		return () => { // cleanup function of type : () => void
			console.log("Cleanup")
		}

	}, [])


	return (<>
		<div>
			<Header></Header>
			<div className="bg-container container-fluid  mt-2">
				<BreadCrumb state={"Osun Sate"} page={"HIV Treatment Dashboard"}></BreadCrumb>
				<div className="row">
					<div className="col-12 col-md-4">
						<div className="border">
							<div className="card mb-2  yellow-card ">
								<div className="card-body">
									<h5 className="card-title font68">22</h5>
									<p className="card-text">Total facilities offering HIV care to patents in Osun state.</p>
								</div>
							</div>
							<div className="card mb-2 green-card ">
								<div className="card-body">
									<h5 className="card-title font68">24,314</h5>
									<p className="card-text">Total patient receiving HIV treatment
										across all facilities in Osun state.</p>
								</div>
							</div>
							<div className="card mb-2 light-green-card ">
								<div className="card-body">
									<h5 className="card-title light-green font68">23,314</h5>
									<p className="card-text light-green">Total patient with Unique Fingerprints
										across all facilities in Osun state.</p>
								</div>
							</div>
							<div className="card mb-3 dark-green-card ">
								<div className="card-body">
									<h5 className="card-title card-title dark-green font68">70%</h5>
									<p className="card-text dark-green">Treatment Saturation.</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-8">
						<HighchartsReact
							constructorType={'mapChart'}
							highcharts={Highcharts}
							options={chartData}
						/>

					</div>
				</div>
			</div>
		</div>
	</>);
};

export default TreamentDashboard;
