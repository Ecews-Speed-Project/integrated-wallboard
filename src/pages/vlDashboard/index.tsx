import { FunctionComponent, useState, useEffect } from 'react';
import { getCoverageData, getMap, getSuppressionData, hivMap } from '../../services/Charts.service';
import Highcharts from 'highcharts'
import highchartsMap from "highcharts/modules/map";
import HighchartsReact from 'highcharts-react-official'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import BreadCrumb from '../../components/BreadCrumb';
import SmallCard from '../../components/SmallCard';
import { auth } from '../../services/auth.services';
import { viralloadData } from '../../services/main.service';
highchartsMap(Highcharts);

const VlDashboard: FunctionComponent = () => {

	const userData = JSON.parse(localStorage.getItem('user') || '');

	const [loading, setLoading] = useState(false);
	const [vlCoverage, setVlCoverage] = useState({});

	const [statsData, setStatsData] = useState<{ [key: string]: any }>({});


	const [vlSuppression, setVlSuppression] = useState({});
	const [user, setUser] = useState<{ [key: string]: any }>({});

	const fetchMap = async (user: any) => {
		setLoading(true)
		let state = user.state

		let data = await viralloadData(user.stateId)
		setStatsData(data?.stats)


		let map = await getMap(state)
		let supressionData = await getSuppressionData(data.vl_lga)
		let coverageData = await getCoverageData(data.vl_lga)
		setVlCoverage(hivMap(map, coverageData, 'Viralload Coverage by LGA', 800))
		setVlSuppression(hivMap(map, supressionData, 'Viralload Suppression by LGA', 800))

	}

	
	useEffect(() => {
		fetchMap(userData)
}, [loading])


	return (<>
		<div>
			<div className="bg-container container-fluid  mt-2">
				<BreadCrumb state={user.state + " State"} page={"Viralload Report Dashboard"}></BreadCrumb>

				<div className="row">
					<div className="col-12 col-md-12">
						<div className="row">
							<SmallCard title={"HIV Clients on Treatment"} value={statsData.txCurrent}></SmallCard>
							<SmallCard title={"Eligible for VL"} value={statsData.vlEligible}></SmallCard>
							<SmallCard title={"Sample Collected"} value={statsData.vLtoPCRLab}></SmallCard>
							<SmallCard title={"Result Recieved"} value={statsData.vLenteredEMR}></SmallCard>
							<SmallCard title={"Coverage"} value={Math.round((statsData.vLenteredEMR / statsData.vlEligible) * 100).toString() + "%"}></SmallCard>
							<SmallCard title={"Viral load < 1000 cop /mil"} value={statsData.vlSuppressed}></SmallCard>
						</div>
					</div>
					<div className="col-12 col-md-6">
						<HighchartsReact
							constructorType={'mapChart'}
							highcharts={Highcharts}
							options={vlCoverage}
						/>
					</div>
					<div className="col-12 col-md-6">
						<HighchartsReact
							constructorType={'mapChart'}
							highcharts={Highcharts}
							options={vlSuppression}
						/>
					</div>
				</div>
			</div>
		</div>
	</>);
};

export default VlDashboard;
