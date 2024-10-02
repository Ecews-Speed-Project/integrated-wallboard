import { FunctionComponent, useState, useEffect } from 'react';
import { getLiveMapData, getMap, hivMap } from '../../services/Charts.service';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highchartsMap from "highcharts/modules/map";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import BreadCrumb from '../../components/BreadCrumb';
import { auth } from '../../services/auth.services';
import { retentionData } from '../../services/main.service';
import { handleSearch } from '../../utils/helpers';
import { GenericObject } from '../../types/dseaseData';
highchartsMap(Highcharts);

const TreamentDashboard: FunctionComponent = () => {
	const userData = JSON.parse(localStorage.getItem('user') || '');

	const [userId, setUserId] = useState(0);
	const [chartData, setChartData] = useState({});
	const [loading, setLoading] = useState(false);
	const [statsData, setStatsData] = useState<{ [key: string]: any }>({});
	const [retentionD, setRetentionD] = useState<GenericObject>({});
	const [user, setUser] = useState<{ [key: string]: any }>({});

	const fetchMap = async (user: any) => {
		setLoading(true)

		let state = user.state

		let data = await retentionData(user.stateId)
		setStatsData(data?.stats)

		let stats = handleSearch(data?.stats?.saturation, user.stateId)
		setRetentionD(stats)

		let map = await getMap(state)
		let mapData = await getLiveMapData(data.tx_curr_lga)
		setChartData(hivMap(map, mapData, 'Percentage of Unique Clients by LGA', 800))
	}

	useEffect(() => {
			fetchMap(userData)
	}, [loading])


	return (<>
		<div>
			<div className="bg-container container-fluid  mt-2">
				<BreadCrumb state={user.state + " State"} page={"HIV Treatment Dashboard"}></BreadCrumb>
				<div className="row">
					<div className="col-12 col-md-4">
						<div className="border">
							<div className="card mb-2  yellow-card ">
								<div className="card-body">
									<h5 className="card-title font68">{retentionD ? retentionD.facilities : ''}</h5>
									<p className="card-text">Total facilities offering HIV care to patents in {user.state}  state.</p>
								</div>
							</div>
							<div className="card mb-2 green-card ">
								<div className="card-body">
									<h5 className="card-title font68">{statsData?.tx_curr}</h5>
									<p className="card-text">Total patient receiving HIV treatment
										across all facilities in {user.state} state.</p>
								</div>
							</div>
							<div className="card mb-2 light-green-card ">
								<div className="card-body">
									<h5 className="card-title light-green font68">{statsData?.uniqueFingerprints}</h5>
									<p className="card-text light-green">Total patient with Unique Fingerprints
										across all facilities in {user.state}  state.</p>
								</div>
							</div>
							<div className="card mb-3 dark-green-card ">
								<div className="card-body">
									<h5 className="card-title card-title dark-green font68">{retentionD ? retentionD.saturation1 : ''}%</h5>
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
