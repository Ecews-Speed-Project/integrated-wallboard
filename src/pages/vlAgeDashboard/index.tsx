import { FunctionComponent, useState,  useEffect } from 'react';
import { ageAndSexChart, dualColumn } from '../../services/Charts.service';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import BreadCrumb from '../../components/BreadCrumb';
import SmallCard from '../../components/SmallCard';
import { auth } from '../../services/auth.services';
import { viralloadAgeData } from '../../services/main.service';


const VlAgeDashboard: FunctionComponent = () => {
	const userData = JSON.parse(localStorage.getItem('user') || '');

	const [chartData, setChartData] = useState({});
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState<{ [key: string]: any }>({});
	const [statsData, setStatsData] = useState<{ [key: string]: any }>({});


	const [vlCoverage, setVlCoverage] = useState({});
	const [vlSuppression, setVlSuppression] = useState({});
	const fetchMap = async (user: any) => {
		setLoading(true)
		
		let data = await viralloadAgeData(user.stateId)
		setStatsData(data.vl_stats[0])

	//	console.log(statsData);
		
		setVlCoverage(ageAndSexChart("Viralload Coverga by age and sex"))
		setVlSuppression(ageAndSexChart("Viralload suppression by age and sex"))
	}

	useEffect(() => {
			fetchMap(userData)
	}, [loading])

	return (<>
		<div>
			<div className="bg-container container-fluid  mt-2">
				<BreadCrumb state={"Osun Sate"} page={"Viralload Report By Age and Sex Dashboard"}></BreadCrumb>
				<div className="row">
					<div className="col-12 col-md-12">
						<div className="row">
							<SmallCard title={"HIV Clients on Treatment"} value={statsData?.txCurr}></SmallCard>
							<SmallCard title={"Eligible for VL"} value={statsData?.eligible}></SmallCard>
							<SmallCard title={"Sample Collected"} value={statsData?.sampleCollect}></SmallCard>
							<SmallCard title={"Result Recieved"} value={statsData?.result}></SmallCard>
							<SmallCard title={"Viral load < 1000 cop /mil"} value={statsData?.suppression}></SmallCard>
							<SmallCard title={"Viralload > 1000 cop / mi"} value={'4000'}></SmallCard>
						</div>
					</div>
					<div className="col-12 col-md-6">
						<HighchartsReact
							highcharts={Highcharts}
							options={vlCoverage}
						/>
					</div>
					<div className="col-12 col-md-6">
						<HighchartsReact
							highcharts={Highcharts}
							options={vlSuppression}
						/>
					</div>
				</div>
			</div>
		</div>
	</>);
};

export default VlAgeDashboard;
