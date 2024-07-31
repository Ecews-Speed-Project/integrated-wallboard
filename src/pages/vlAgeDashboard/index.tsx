import { FunctionComponent, useState,  useEffect } from 'react';
import { ageAndSexChart, dualColumn } from '../../services/Charts.service';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import BreadCrumb from '../../components/BreadCrumb';
import SmallCard from '../../components/SmallCard';
import { auth } from '../../services/auth.services';


const VlAgeDashboard: FunctionComponent = () => {
	const [chartData, setChartData] = useState({});
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState<{ [key: string]: any }>({});


	const [vlCoverage, setVlCoverage] = useState({});
	const [vlSuppression, setVlSuppression] = useState({});
	const fetchMap = async (user: any) => {
		setLoading(true)
		setVlCoverage(ageAndSexChart("Viralload Coverga by age and sex"))
		setVlSuppression(ageAndSexChart("Viralload suppression by age and sex"))
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
				<BreadCrumb state={"Osun Sate"} page={"Viralload Report By Age and Sex Dashboard"}></BreadCrumb>
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
