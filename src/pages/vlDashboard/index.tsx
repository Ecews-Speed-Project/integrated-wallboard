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
import BreadCrumb from '../../components/BreadCrumb';
import SmallCard from '../../components/SmallCard';

const VlDashboard: FunctionComponent = () => {
	const [chartData, setChartData] = useState({});
	const fetchMap = async () => {
		data.forEach(function (p: any) {
			p.code = p.code;
		});
		setChartData(stateMaps(osunMap, data, "Treatment Saturation by LGA"))
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
				<BreadCrumb state={"Osun Sate"} page={"Viralload Report Dashboard"}></BreadCrumb>

				<div className="row">
					<div className="col-12 col-md-12">
						<div className="row">
							<SmallCard title={"HIV Clients on Treatment"} value={"24,900"}></SmallCard>
							<SmallCard title={"Eligible for VL"} value={"2,900"}></SmallCard>
							<SmallCard title={"Sample Collected"} value={"900"}></SmallCard>
							<SmallCard title={"Result Recieved"} value={"1,900"}></SmallCard>
							<SmallCard title={"Viral load < 1000 cop /mil"} value={"4,900"}></SmallCard>
							<SmallCard title={"Viralload > 1000 cop / mi"} value={"900"}></SmallCard>
						</div>
					</div>
					<div className="col-12 col-md-6">
						<HighchartsReact
							constructorType={'mapChart'}
							highcharts={Highcharts}
							options={chartData}
						/>
					</div>
					<div className="col-12 col-md-6">
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

export default VlDashboard;
