import { FunctionComponent, useState, useEffect } from 'react';
import { getLiveMapData, getMap, getSomaLiveMapData, stateMaps } from '../../services/Charts.service';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highchartsMap from "highcharts/modules/map";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import BreadCrumb from '../../components/BreadCrumb';
import { auth } from '../../services/auth.services';
import { retentionData, summaryApiData } from '../../services/main.service';
import { handleSearch } from '../../utils/helpers';
import { GenericObject } from '../../types/dseaseData';
import { ConfirmedCasesByLGA, DiseaseData, LGAData, Totals } from '../../types/interfaces';
highchartsMap(Highcharts);

const MonkeyPoxDashboard: FunctionComponent = () => {
	const userData = JSON.parse(localStorage.getItem('user') || '');

	const [chartData, setChartData] = useState({});
	const [loading, setLoading] = useState(false);
	const [statsData, setStatsData] = useState<{ [key: string]: any }>({});
	const [retentionD, setRetentionD] = useState<GenericObject>({});
	const [user, setUser] = useState<{ [key: string]: any }>({});

	const [monkeyPoxCases, setMonkeyPoxCases] = useState<DiseaseData>({
		suspectedCases: 0,
		confirmedCases: 0,
		evaluatedCases: 0,
		rdtRapidDiagnostictestPositive: 0,
		cultured: 0,
	  });

	const fetchMap = async (user: any) => {
		setLoading(true)
		let state = user.state

		
		const data: { diseaseCascade: LGAData[] }  = await summaryApiData(user.stateId);

        // Summing up cases for each disease type
        const totals: Totals = {
          cholera: { suspectedCases: 0, confirmedCases: 0, evaluatedCases: 0, rdtRapidDiagnostictestPositive: 0, cultured: 0 },
          lassa: { suspectedCases: 0, confirmedCases: 0, evaluatedCases: 0, rdtRapidDiagnostictestPositive: 0, cultured: 0 },
          measles: { suspectedCases: 0, confirmedCases: 0, evaluatedCases: 0, rdtRapidDiagnostictestPositive: 0, cultured: 0 },
          yellowFever: { suspectedCases: 0, confirmedCases: 0, evaluatedCases: 0, rdtRapidDiagnostictestPositive: 0, cultured: 0 },
          monkeyPox: { suspectedCases: 0, confirmedCases: 0, evaluatedCases: 0, rdtRapidDiagnostictestPositive: 0, cultured: 0 },
          covid19: { suspectedCases: 0, confirmedCases: 0, evaluatedCases: 0, rdtRapidDiagnostictestPositive: 0, cultured: 0 },
          diphtheria: { suspectedCases: 0, confirmedCases: 0, evaluatedCases: 0, rdtRapidDiagnostictestPositive: 0, cultured: 0 },
        };

        data.diseaseCascade.forEach((current:any) => {
          totals.monkeyPox.suspectedCases += current.monkeyPox.suspectedCases;
          totals.monkeyPox.confirmedCases += current.monkeyPox.confirmedCases;
          totals.monkeyPox.evaluatedCases += current.monkeyPox.evaluatedCases; // Sum evaluated cases
          totals.monkeyPox.rdtRapidDiagnostictestPositive += current.monkeyPox.rdtRapidDiagnostictestPositive; // Sum RDT positives
          totals.monkeyPox.cultured += current.monkeyPox.cultured; // Sum cultured

         
        });

        // Setting the summed data to the state
       
        setMonkeyPoxCases(totals.monkeyPox);
		const mapRw: [{}] = [{}];
		const confirmedCases: ConfirmedCasesByLGA = {};

		data.diseaseCascade.forEach((current) => {
			const lga = current.lga;

			// Sum all confirmed cases for each disease in the LGA
			const totalConfirmedCases =
				current.choleraCascade.confirmedCases

			if (confirmedCases[lga]) {
				confirmedCases[lga] += totalConfirmedCases; // Add to existing total for LGA
			} else {
				confirmedCases[lga] = totalConfirmedCases; // Initialize confirmed cases for LGA
				confirmedCases['code'] = totalConfirmedCases;

				mapRw.push(
					{
						"lgaName": lga,
						"value": totalConfirmedCases,
						"code": ""
					},
				)

			}
		});

		// Set the confirmed cases grouped by LGA in state

		let map = await getMap(state)
		let mapData = await getSomaLiveMapData(mapRw)
		console.log(mapData)
		setChartData(stateMaps(map, mapData, 'Confirmed cases of Monkey Pox by LGA in '+ state + " state" , 800))

	}

	useEffect(() => {
		fetchMap(userData)
	}, [loading])



	return (<>
	<div>
			<div className="bg-container container-fluid  mt-2">
				<BreadCrumb state={user.state + " State"} page={"Monkey Pox dashboard"}></BreadCrumb>
				<div className="row">
					<div className="col-12 col-md-4">
						<div className="border">
							<div className="card mb-2  yellow-card px45">
								<div className="card-body">
									<h5 className="card-title font68">{monkeyPoxCases.suspectedCases}</h5>
									<p className="card-text">Total Suspected Cases of Monkey Pox in {user.state}  state.</p>
								</div>
							</div>
							<div className="card mb-2 green-card px45">
								<div className="card-body">
									<h5 className="card-title font68">0</h5>
									<p className="card-text">Total patients Evaluated </p>
								</div>
							</div>
							<div className="card mb-3 dark-green-card px45">
								<div className="card-body">
									<h5 className="card-title card-title dark-green font68">{monkeyPoxCases.confirmedCases}</h5>
									<p className="card-text dark-green">Confirmed Cases.</p>
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

export default MonkeyPoxDashboard;
