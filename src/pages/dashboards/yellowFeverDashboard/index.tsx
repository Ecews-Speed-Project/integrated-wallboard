import { FunctionComponent, useState, useEffect } from 'react';
import { getLiveMapData, getMap, getNigeriaMapForSomasData, getSomaLiveMapData, hivStateMap, mapChat, somasMap, stateMaps } from '../../../services/Charts.service';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highchartsMap from "highcharts/modules/map";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import BreadCrumb from '../../../components/BreadCrumb';
import { auth } from '../../../services/auth.services';
import { retentionData, summaryApiData } from '../../../services/main.service';
import { handleSearch } from '../../../utils/helpers';
import { GenericObject } from '../../../types/dseaseData';
import { ConfirmedCasesByLGA, DiseaseData, LGAData, Totals } from '../../../types/interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import DynamicBreadCrumb from '../../../components/DynamicBreadCrumb';
import SmallCard from '../../../components/SmallCard';
import SmallCard20x from '../../../components/SmallCard20x';
highchartsMap(Highcharts);

const YellowFeverDashboard: FunctionComponent = () => {
	const userData = useSelector((state: RootState) => state.auth);

	const [chartData, setChartData] = useState({});
	const [chart1Data, setChart1Data] = useState({});

	const [loading, setLoading] = useState(false);
	const [statsData, setStatsData] = useState<{ [key: string]: any }>({});
	const [retentionD, setRetentionD] = useState<GenericObject>({});
	const [user, setUser] = useState<{ [key: string]: any }>({});

	const [yellowFeverCases, setYellowFeverCases] = useState<DiseaseData>({
		suspectedCases: 0,
		confirmedCases: 0,
		evaluatedCases: 0,
		rdtRapidDiagnostictestPositive: 0,
		cultured: 0,
	});

	const fetchMap = async () => {
		setLoading(true)
		let state = userData.state
		const confirmedCases: ConfirmedCasesByLGA = {};
		const data: { diseaseCascade: LGAData[] } = await summaryApiData(userData.stateId);

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
		data.diseaseCascade.forEach((current: any) => {
			totals.yellowFever.suspectedCases += current.yellowFever.suspectedCases;
			totals.yellowFever.confirmedCases += current.yellowFever.confirmedCases;
			totals.yellowFever.evaluatedCases += current.yellowFever.evaluatedCases; // Sum evaluated cases
			totals.yellowFever.rdtRapidDiagnostictestPositive += current.yellowFever.rdtRapidDiagnostictestPositive; // Sum RDT positives
			totals.yellowFever.cultured += current.yellowFever.cultured; // Sum cultured

		});

		data.diseaseCascade.forEach((current) => {
			const { monkeyPox, lga } = current;
			totals.monkeyPox.suspectedCases += monkeyPox.suspectedCases;
			totals.monkeyPox.confirmedCases += monkeyPox.confirmedCases;
			totals.monkeyPox.evaluatedCases += monkeyPox.evaluatedCases;
			totals.monkeyPox.rdtRapidDiagnostictestPositive += monkeyPox.rdtRapidDiagnostictestPositive;
			totals.monkeyPox.cultured += monkeyPox.cultured;
			confirmedCases[lga] = (confirmedCases[lga] || 0) + monkeyPox.confirmedCases;
		});

		setYellowFeverCases(totals.yellowFever);
		const map = await getMap(userData.state);
		const mapData = await getSomaLiveMapData(Object.entries(confirmedCases).map(([lga, value]) => ({ lgaName: lga, value })));
		setChartData(somasMap(map, mapData, `Confirmed cases of Yellow Fever Pox by LGA in ${userData.state} state`, 800));
		setChart1Data(mapChat(map, mapData, `Yellow Fever in ${userData.state} state`, 800));
	}

	const fetchMapBysate = async () => {
		setLoading(true)
		let state = userData.state
		const confirmedCases: ConfirmedCasesByLGA = {};
		const data: { diseaseCascade: LGAData[] } = await summaryApiData(userData.stateId);

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
		data.diseaseCascade.forEach((current: any) => {
			totals.yellowFever.suspectedCases += current.yellowFever.suspectedCases;
			totals.yellowFever.confirmedCases += current.yellowFever.confirmedCases;
			totals.yellowFever.evaluatedCases += current.yellowFever.evaluatedCases; // Sum evaluated cases
			totals.yellowFever.rdtRapidDiagnostictestPositive += current.yellowFever.rdtRapidDiagnostictestPositive; // Sum RDT positives
			totals.yellowFever.cultured += current.yellowFever.cultured; // Sum cultured

		});

		data.diseaseCascade.forEach((current) => {
			const { yellowFever, state } = current;
			totals.yellowFever.suspectedCases += yellowFever.suspectedCases;
			totals.yellowFever.confirmedCases += yellowFever.confirmedCases;
			totals.yellowFever.evaluatedCases += yellowFever.evaluatedCases;
			totals.yellowFever.rdtRapidDiagnostictestPositive += yellowFever.rdtRapidDiagnostictestPositive;
			totals.yellowFever.cultured += yellowFever.cultured;
			confirmedCases[state] = (confirmedCases[state] || 0) + yellowFever.confirmedCases;
		});

		setYellowFeverCases(totals.yellowFever);
		const map = await getMap(userData.state);
		const mapData = await getNigeriaMapForSomasData(confirmedCases);
		console.log(mapData)

		setChartData(hivStateMap(map, mapData, `Confirmed cases of Yellow Fever by states`, 800));
		setChart1Data(mapChat(map, mapData, `Yellow Fever cases trend  by state`, 800))
	}

	useEffect(() => {
		if (userData.state !== '') {
			fetchMap();
		} else {
			fetchMapBysate()
		}
	}, [loading])


	return (<>
		<div>
			<div className="bg-container container-fluid  mt-2">
				<DynamicBreadCrumb page="Yellow Fever dashboard" />
				<div className="row">
					<div className="col-6 col-md-6">
						<div className="col-12 col-md-12 row">
							<div className="col-6 col-md-6">
								<SmallCard20x title="Total Suspected Cases of Cholera" color={"green1"} value={yellowFeverCases.suspectedCases.toString()} />
							</div>
							<div className="col-6 col-md-6">
								<SmallCard20x title="Total Patients with Rapid Diagnosis Test" color={"green1"} value={yellowFeverCases.evaluatedCases.toString()} />
							</div>

							<div className="col-12 col-md-12">
								<SmallCard20x title="Total Patients Cultured" color={"green3"} fontColourNumber={"white-color-number"} fontColour={"white-color"} value={yellowFeverCases.confirmedCases.toString()} />
							</div>
						</div>

						<div className="col-12 col-md-12">
							<HighchartsReact
								highcharts={Highcharts}
								options={chart1Data}
							/>
						</div>
					</div>

					<div className="col-6 col-md-6">
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

export default YellowFeverDashboard;
