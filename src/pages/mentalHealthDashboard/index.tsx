import { FunctionComponent, useState, useCallback, useEffect } from 'react';
import Header from '../../components/Header';
import data from '../../demo-data/us-population-density.json';
import osunMap from '../../demo-data/Osun.json';
import { columnChart, stateMaps } from '../../services/Charts.service';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import BreadCrumb from '../../components/BreadCrumb';

const MentalHealthDashboard: FunctionComponent = () => {
	const [chartData, setChartData] = useState({});
	const [columnChartData, setColumnChartData] = useState({});

	const fetchMap = async () => {

		const data =  [59, 83, 65, 228, 184, 80];
		const categories = [
			'Eligible', 'Screened', 'Elevated', 'Previously Known', 'Newly Diagnosed', 'Refrred for DM MG', 'Commenced DM RX'
		]

		setColumnChartData(columnChart("Mental Health Cascade", categories, data))
		setChartData(stateMaps(osunMap, data, "Percentage of Unique Clients by LGA", 400))
	}

	useEffect(() => {
		fetchMap()
		return () => { console.log("Cleanup") }
	}, [])

	return (<>
		<div>
			<Header></Header>
			<div className="bg-container container-fluid  mt-2">
				<BreadCrumb state={"Osun Sate"} page={"NDC Integration Diabetes and Mental Health"}></BreadCrumb>

				<div className="row">
					<div className="col-12 col-md-4">
						<div className="border">
							<div className="card mb-2  yellow-card padding-22">
								<div className="card-body">
									<h5 className="medium-card-title">91%</h5>
									<p className="medium-card-text">of Eligible clients were 
									screen for DM</p>
								</div>
							</div>
							<div className="card mb-2 green-card padding-22">
								<div className="card-body">
									<h5 className="medium-card-title">71%</h5>
									<p className="medium-card-text">of Hyperglycemic Clients</p>
								</div>
							</div>
							<div className="card mb-3 light-green-card padding-22">
								<div className="card-body">
									<h5 className="medium-card-title card-title light-green">92%</h5>
									<p className="medium-card-text card-text light-green">With Elevated BP, Diagnosed </p>
								</div>
							</div>
							<div className="card mb-3 dark-green-card padding-22">
								<div className="card-body">
									<h5 className="medium-card-title card-title dark-green">97%</h5>
									<p className="medium-card-text card-text dark-green">Commenced treatment</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-8">
						<div className='mb-4'><HighchartsReact
							constructorType={'mapChart'}
							highcharts={Highcharts}
							options={columnChartData}
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

export default MentalHealthDashboard;
