import { FunctionComponent, useState, useCallback, useEffect } from 'react';
import Filter from "../../components/Filter";
import PortalPopup from "../../components/PortalPopup";
import DropdownLight from "../../components/DropdownLight";
import styles from './Style.module.css';
import Header from '../../components/Header';
import data from '../../demo-data/us-population-density.json';
import osunMap from '../../demo-data/Osun.json';
import { stateMaps } from '../../services/Charts.service';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highchartsMap from "highcharts/modules/map";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import BreadCrumb from '../../components/BreadCrumb';

const TreamentDashboard: FunctionComponent = () => {
	const [isFilterOpen, setFilterOpen] = useState(false);
	const [isDropdownLightOpen, setDropdownLightOpen] = useState(false);


	const [chartData, setChartData] = useState({});

	const fetchMap = async () => {

		data.forEach(function (p: any) {
			p.code = p.code;
		});

		setChartData(stateMaps(osunMap, data, "Percentage of Unique Clients by LGA"))
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
							<div className="card mb-2  yellow-card">
								<div className="card-body">
									<h5 className="card-title">22</h5>
									<p className="card-text">Total facilities offering HIV care to patents in Osun state.</p>
								</div>
							</div>
							<div className="card mb-2 green-card">
								<div className="card-body">
									<h5 className="card-title">24,314</h5>
									<p className="card-text">Total patient receiving HIV treatment
										across all facilities in Osun state.</p>
								</div>
							</div>
							<div className="card mb-3 light-green-card">
								<div className="card-body">
									<h5 className="light-green-card-title card-title">70%</h5>
									<p className="light-green-card-text card-text">Treatment Saturation.</p>
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
