import { FunctionComponent, useState, useEffect, useCallback } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import { getMap, getSomaLiveMapData, somasMap, stateMaps } from '../../../services/Charts.service';
import SmallCard from '../../../components/SmallCard';
import Carousel from 'react-bootstrap/Carousel';
import { summaryApiData } from '../../../services/main.service';
import { DiseaseData, LGAData, Totals } from '../../../types/interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import DynamicBreadCrumb from '../../../components/DynamicBreadCrumb';
import { GenericObject } from '../../../types/dseaseData';
import NonHIVTable from '../../../components/NonHIVTable';

highchartsMap(Highcharts);

const SummaryBoard: FunctionComponent = () => {
	const userData = useSelector((state: RootState) => state.auth);

	const [chartData, setChartData] = useState({});
	const [loading, setLoading] = useState(false);
	const [state, setState] = useState({
		user: {},
		loading: false,
		measlesMapChartData: {},
		lassaMapChartData: {},
		yellowMapChartData: {},
		monkeyMapChartData: {},
		covid19MapChartData: {},
		choleraMapChartData: {},
		chart1Data: {},
		chart2Data: {},
		chart3Data: {},
		summaryData: {},
		statsData: {} as GenericObject,
		otherDisease: [] as GenericObject[],
		hivDisease: [] as GenericObject[],
		lgaData: [] as LGAData[],
		diseaseCases: {
			cholera: { suspectedCases: 0, confirmedCases: 0, evaluatedCases: 0, rdtRapidDiagnostictestPositive: 0, cultured: 0 },
			lassa: { suspectedCases: 0, confirmedCases: 0, evaluatedCases: 0, rdtRapidDiagnostictestPositive: 0, cultured: 0 },
			measles: { suspectedCases: 0, confirmedCases: 0, evaluatedCases: 0, rdtRapidDiagnostictestPositive: 0, cultured: 0 },
			yellowFever: { suspectedCases: 0, confirmedCases: 0, evaluatedCases: 0, rdtRapidDiagnostictestPositive: 0, cultured: 0 },
			monkeyPox: { suspectedCases: 0, confirmedCases: 0, evaluatedCases: 0, rdtRapidDiagnostictestPositive: 0, cultured: 0 },
			covid19: { suspectedCases: 0, confirmedCases: 0, evaluatedCases: 0, rdtRapidDiagnostictestPositive: 0, cultured: 0 },
			diphtheria: { suspectedCases: 0, confirmedCases: 0, evaluatedCases: 0, rdtRapidDiagnostictestPositive: 0, cultured: 0 },
		},
	});
	async function getMapData(diseaseCases: any) {
		return await getSomaLiveMapData(Object.entries(diseaseCases).map(([lga, value]) => ({ lgaName: lga, value })));
	}

	const fetchData = useCallback(async () => {
		setLoading(true);
		try {
			const data: { diseaseCascade: LGAData[] } = await summaryApiData(userData.stateId);

			const choleraConfirmedCases: Record<string, number> = {};
			const lassaConfirmedCases: Record<string, number> = {};
			const measlesConfirmedCases: Record<string, number> = {};
			const yellowFeverConfirmedCases: Record<string, number> = {};
			const monkeyPoxConfirmedCases: Record<string, number> = {};
			const covid19ConfirmedCases: Record<string, number> = {};

			let mapSize = 1100
			if (userData.state === 'Delta') {
				mapSize = 970
			} else if (userData.state === 'Osun') {
				mapSize = 1080
			} else {
				mapSize = 800
			}


			const totals: Totals = {
				cholera: { suspectedCases: 0, confirmedCases: 0, evaluatedCases: 0, rdtRapidDiagnostictestPositive: 0, cultured: 0 },
				lassa: { suspectedCases: 0, confirmedCases: 0, evaluatedCases: 0, rdtRapidDiagnostictestPositive: 0, cultured: 0 },
				measles: { suspectedCases: 0, confirmedCases: 0, evaluatedCases: 0, rdtRapidDiagnostictestPositive: 0, cultured: 0 },
				yellowFever: { suspectedCases: 0, confirmedCases: 0, evaluatedCases: 0, rdtRapidDiagnostictestPositive: 0, cultured: 0 },
				monkeyPox: { suspectedCases: 0, confirmedCases: 0, evaluatedCases: 0, rdtRapidDiagnostictestPositive: 0, cultured: 0 },
				covid19: { suspectedCases: 0, confirmedCases: 0, evaluatedCases: 0, rdtRapidDiagnostictestPositive: 0, cultured: 0 },
				diphtheria: { suspectedCases: 0, confirmedCases: 0, evaluatedCases: 0, rdtRapidDiagnostictestPositive: 0, cultured: 0 },
			};

			data.diseaseCascade.forEach((current) => {
				const { measles, yellowFever, choleraCascade, monkeyPox, lassa, covid19, lga } = current;
				totals.measles.suspectedCases += measles.suspectedCases;
				totals.measles.confirmedCases += measles.confirmedCases;
				totals.measles.evaluatedCases += measles.evaluatedCases;
				totals.measles.rdtRapidDiagnostictestPositive += measles.rdtRapidDiagnostictestPositive;
				totals.measles.cultured += measles.cultured;
				choleraConfirmedCases[lga] = (choleraConfirmedCases[lga] || 0) + measles.confirmedCases;

				totals.yellowFever.suspectedCases += yellowFever.suspectedCases;
				totals.yellowFever.confirmedCases += yellowFever.confirmedCases;
				totals.yellowFever.evaluatedCases += yellowFever.evaluatedCases;
				totals.yellowFever.rdtRapidDiagnostictestPositive += yellowFever.rdtRapidDiagnostictestPositive;
				totals.yellowFever.cultured += yellowFever.cultured;
				lassaConfirmedCases[lga] = (lassaConfirmedCases[lga] || 0) + yellowFever.confirmedCases;

				totals.cholera.suspectedCases += choleraCascade.suspectedCases;
				totals.cholera.confirmedCases += choleraCascade.confirmedCases;
				totals.cholera.evaluatedCases += choleraCascade.evaluatedCases;
				totals.cholera.rdtRapidDiagnostictestPositive += choleraCascade.rdtRapidDiagnostictestPositive;
				totals.cholera.cultured += choleraCascade.cultured;
				measlesConfirmedCases[lga] = (measlesConfirmedCases[lga] || 0) + choleraCascade.confirmedCases;

				totals.monkeyPox.suspectedCases += monkeyPox.suspectedCases;
				totals.monkeyPox.confirmedCases += monkeyPox.confirmedCases;
				totals.monkeyPox.evaluatedCases += monkeyPox.evaluatedCases;
				totals.monkeyPox.rdtRapidDiagnostictestPositive += monkeyPox.rdtRapidDiagnostictestPositive;
				totals.monkeyPox.cultured += monkeyPox.cultured;
				yellowFeverConfirmedCases[lga] = (yellowFeverConfirmedCases[lga] || 0) + monkeyPox.confirmedCases;

				totals.lassa.suspectedCases += lassa.suspectedCases;
				totals.lassa.confirmedCases += lassa.confirmedCases;
				totals.lassa.evaluatedCases += lassa.evaluatedCases;
				totals.lassa.rdtRapidDiagnostictestPositive += lassa.rdtRapidDiagnostictestPositive;
				totals.lassa.cultured += lassa.cultured;
				monkeyPoxConfirmedCases[lga] = (monkeyPoxConfirmedCases[lga] || 0) + lassa.confirmedCases;

				totals.covid19.suspectedCases += covid19.suspectedCases;
				totals.covid19.confirmedCases += covid19.confirmedCases;
				totals.covid19.evaluatedCases += covid19.evaluatedCases;
				totals.covid19.rdtRapidDiagnostictestPositive += covid19.rdtRapidDiagnostictestPositive;
				totals.covid19.cultured += covid19.cultured;
				covid19ConfirmedCases[lga] = (covid19ConfirmedCases[lga] || 0) + covid19.confirmedCases;
			});


			const map = await getMap(userData.state);
			const measlesMapData = await getMapData(choleraConfirmedCases);
			const lassaMapData = await getMapData(lassaConfirmedCases);
			const yellowFeverMapData = await getMapData(measlesConfirmedCases);
			const monkeyPoxMapData = await getMapData(yellowFeverConfirmedCases);
			const covid19MapData = await getMapData(monkeyPoxConfirmedCases);
			const choleraMapData = await getMapData(covid19ConfirmedCases);

			setState(prevState => ({
				...prevState,
				diseaseCases: totals,
				lgaData: data.diseaseCascade,
				measlesMapChartData: somasMap(map, measlesMapData, `Confirmed cases of Measles by LGA in ${userData.state} state`, mapSize),
				lassaMapChartData: somasMap(map, lassaMapData, `Confirmed cases of Lassa  Fever by LGA in ${userData.state} state`, mapSize),
				yellowMapChartData: somasMap(map, yellowFeverMapData, `Confirmed cases of Yellow Fever by LGA in ${userData.state} state`, mapSize),
				monkeyMapChartData: somasMap(map, monkeyPoxMapData, `Confirmed cases of Monkey Pox by LGA in ${userData.state} state`, mapSize),
				covid19MapChartData: somasMap(map, covid19MapData, `Confirmed cases of Covid19 by LGA in ${userData.state} state`, mapSize),
				choleraMapChartData: somasMap(map, choleraMapData, `Confirmed cases of Cholera by LGA in ${userData.state} state`, mapSize),
				loading: false,
			}));

		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	}, [userData.state, userData.stateId]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<div className="bg-container container-fluid mt-2">
			<DynamicBreadCrumb page="Summary Dashboard" />
			<div className="row">
				<div className="col-2 col-md-2">
					<SmallCard title="Measles Cases" value={state.diseaseCases.measles.suspectedCases.toString()} />
				</div>
				<div className="col-2 col-md-2">
					<SmallCard title="Yellow Fever Cases" value={state.diseaseCases.yellowFever.suspectedCases.toString()} />
				</div>
				<div className="col-2 col-md-2">
					<SmallCard title="New Cholera Cases" value={state.diseaseCases.cholera.suspectedCases.toString()} />
				</div>
				<div className="col-2 col-md-2">
					<SmallCard title="New Monkey Pox Cases" value={state.diseaseCases.monkeyPox.suspectedCases.toString()} />
				</div>
				<div className="col-2 col-md-2">
					<SmallCard title="Lassa Fever Cases" value={state.diseaseCases.lassa.suspectedCases.toString()} />
				</div>
				<div className="col-2 col-md-2">
					<SmallCard title="Covid19 Cases" value={state.diseaseCases.covid19.suspectedCases.toString()} />
				</div>
				<div className="col-12 col-md-6">
					<NonHIVTable data={state.lgaData} />
				</div>
				<div className="col-12 col-md-6">
					<Carousel>
						{state.diseaseCases.measles.confirmedCases > 0 && <Carousel.Item>
							<HighchartsReact constructorType="mapChart" highcharts={Highcharts} options={state.measlesMapChartData} />
						</Carousel.Item>}
						{state.diseaseCases.yellowFever.confirmedCases > 0 && <Carousel.Item>
							<HighchartsReact constructorType="mapChart" highcharts={Highcharts} options={state.lassaMapChartData} />
						</Carousel.Item>
						}
						{state.diseaseCases.cholera.confirmedCases > 0 && <Carousel.Item>
							<HighchartsReact constructorType="mapChart" highcharts={Highcharts} options={state.yellowMapChartData} />
						</Carousel.Item>
						}
						{state.diseaseCases.monkeyPox.confirmedCases > 0 && <Carousel.Item>
							<HighchartsReact constructorType="mapChart" highcharts={Highcharts} options={state.monkeyMapChartData} />
						</Carousel.Item>
						}
						{state.diseaseCases.lassa.confirmedCases > 0 && <Carousel.Item>
							<HighchartsReact constructorType="mapChart" highcharts={Highcharts} options={state.covid19MapChartData} />
						</Carousel.Item>}
						{state.diseaseCases.covid19.confirmedCases > 0 && <Carousel.Item>
							<HighchartsReact constructorType="mapChart" highcharts={Highcharts} options={state.choleraMapChartData} />
						</Carousel.Item>}
					</Carousel>
				</div>
			</div>
		</div>
	);
};

export default SummaryBoard;
