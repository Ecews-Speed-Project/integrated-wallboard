import { FunctionComponent, useState, useEffect, useCallback } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import { getMap, getNigeriaMapForSomasData, getSomaLiveMapData, hivStateMap, somasMap } from '../../../services/Charts.service';
import { getReportDatesData, summaryApiData } from '../../../services/main.service';
import { LGAData, Totals } from '../../../types/interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { GenericObject } from '../../../types/dseaseData';
import NonHIVTable from '../../../components/NonHIVTable';
import { getStateById, Shimmer, State } from '../../../utils/helpers';
import PageLayout from '../../../components/Layout/PageLayout';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import StatusBadge from '../../../components/common/StatusBadge';

highchartsMap(Highcharts);

interface DiseaseCard {
	title: string;
	suspectedCases: number;
	confirmedCases: number;
	evaluatedCases: number;
	status: 'active' | 'inactive' | 'scheduled' | 'over' | 'pending';
}

const SummaryBoard: FunctionComponent = () => {
	const userData = useSelector((state: RootState) => state.auth);
	let filteredState = useSelector((state: RootState) => state.menu.value);

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

	const fetchData = useCallback(async (userObject?: any) => {
		setState((prevState) => ({ ...prevState, loading: true }));
		let stateObj: State;
		if (userObject !== undefined) {
			stateObj = getStateById(userObject) as State;
		}

		let stateId = userObject !== undefined ? stateObj!.stateId : userData.stateId;
		let stateName = userObject !== undefined ? stateObj!.StateName : userData.state!;

		try {
			const data: { diseaseCascade: LGAData[] } = await summaryApiData(stateId);

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

			const map = await getMap(stateName);
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
		}
	}, [userData.state, userData.stateId]);

	const fetchMapBysate = useCallback(async (userObject?: any) => {
		setState((prevState) => ({ ...prevState, loading: true }));

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
				const { measles, yellowFever, choleraCascade, monkeyPox, lassa, covid19, state } = current;
				totals.measles.suspectedCases += measles.suspectedCases;
				totals.measles.confirmedCases += measles.confirmedCases;
				totals.measles.evaluatedCases += measles.evaluatedCases;
				totals.measles.rdtRapidDiagnostictestPositive += measles.rdtRapidDiagnostictestPositive;
				totals.measles.cultured += measles.cultured;
				choleraConfirmedCases[state] = (choleraConfirmedCases[state] || 0) + measles.confirmedCases;

				totals.yellowFever.suspectedCases += yellowFever.suspectedCases;
				totals.yellowFever.confirmedCases += yellowFever.confirmedCases;
				totals.yellowFever.evaluatedCases += yellowFever.evaluatedCases;
				totals.yellowFever.rdtRapidDiagnostictestPositive += yellowFever.rdtRapidDiagnostictestPositive;
				totals.yellowFever.cultured += yellowFever.cultured;
				lassaConfirmedCases[state] = (lassaConfirmedCases[state] || 0) + yellowFever.confirmedCases;

				totals.cholera.suspectedCases += choleraCascade.suspectedCases;
				totals.cholera.confirmedCases += choleraCascade.confirmedCases;
				totals.cholera.evaluatedCases += choleraCascade.evaluatedCases;
				totals.cholera.rdtRapidDiagnostictestPositive += choleraCascade.rdtRapidDiagnostictestPositive;
				totals.cholera.cultured += choleraCascade.cultured;
				measlesConfirmedCases[state] = (measlesConfirmedCases[state] || 0) + choleraCascade.confirmedCases;

				totals.monkeyPox.suspectedCases += monkeyPox.suspectedCases;
				totals.monkeyPox.confirmedCases += monkeyPox.confirmedCases;
				totals.monkeyPox.evaluatedCases += monkeyPox.evaluatedCases;
				totals.monkeyPox.rdtRapidDiagnostictestPositive += monkeyPox.rdtRapidDiagnostictestPositive;
				totals.monkeyPox.cultured += monkeyPox.cultured;
				yellowFeverConfirmedCases[state] = (yellowFeverConfirmedCases[state] || 0) + monkeyPox.confirmedCases;

				totals.lassa.suspectedCases += lassa.suspectedCases;
				totals.lassa.confirmedCases += lassa.confirmedCases;
				totals.lassa.evaluatedCases += lassa.evaluatedCases;
				totals.lassa.rdtRapidDiagnostictestPositive += lassa.rdtRapidDiagnostictestPositive;
				totals.lassa.cultured += lassa.cultured;
				monkeyPoxConfirmedCases[state] = (monkeyPoxConfirmedCases[state] || 0) + lassa.confirmedCases;

				totals.covid19.suspectedCases += covid19.suspectedCases;
				totals.covid19.confirmedCases += covid19.confirmedCases;
				totals.covid19.evaluatedCases += covid19.evaluatedCases;
				totals.covid19.rdtRapidDiagnostictestPositive += covid19.rdtRapidDiagnostictestPositive;
				totals.covid19.cultured += covid19.cultured;
				covid19ConfirmedCases[state] = (covid19ConfirmedCases[state] || 0) + covid19.confirmedCases;
			});

			const map = await getMap(userData.state);
			const measlesMapData = await getNigeriaMapForSomasData(choleraConfirmedCases);
			const lassaMapData = await getNigeriaMapForSomasData(lassaConfirmedCases);
			const yellowFeverMapData = await getNigeriaMapForSomasData(measlesConfirmedCases);
			const monkeyPoxMapData = await getNigeriaMapForSomasData(yellowFeverConfirmedCases);
			const covid19MapData = await getNigeriaMapForSomasData(monkeyPoxConfirmedCases);
			const choleraMapData = await getNigeriaMapForSomasData(covid19ConfirmedCases);

			setState(prevState => ({
				...prevState,
				diseaseCases: totals,
				lgaData: data.diseaseCascade,
				measlesMapChartData: hivStateMap(map, measlesMapData, `Confirmed cases of Measles by state`, mapSize),
				lassaMapChartData: hivStateMap(map, lassaMapData, `Confirmed cases of Lassa  Fever by state`, mapSize),
				yellowMapChartData: hivStateMap(map, yellowFeverMapData, `Confirmed cases of Yellow Fever by state`, mapSize),
				monkeyMapChartData: hivStateMap(map, monkeyPoxMapData, `Confirmed cases of Monkey Pox by state`, mapSize),
				covid19MapChartData: hivStateMap(map, covid19MapData, `Confirmed cases of Covid19 by LGA state`, mapSize),
				choleraMapChartData: hivStateMap(map, choleraMapData, `Confirmed cases of Cholera by LGA in state`, mapSize),
				loading: false,
			}));

		} catch (error) {
			console.error('Error fetching data:', error);
			setState((prevState) => ({ ...prevState, loading: true }));
		}
	}, [userData.state, userData.stateId]);

	const handleValueChange = (newValue: string) => {
		if (newValue != "") {
			fetchData(newValue);
		} else {
			fetchMapBysate()
		}
	};

	useEffect(() => {
		if (filteredState) {
			handleValueChange(filteredState);
		} else {
			if (userData.stateId != 0) {
				fetchData();
			} else {
				fetchMapBysate()
			}
		}

	}, [fetchData, filteredState]);

	const DiseaseStatCard: React.FC<DiseaseCard> = ({ title, suspectedCases, confirmedCases, evaluatedCases, status }) => (
	<Card className="h-full">
		<CardContent>
			<Box className="flex justify-between items-start mb-4">
				<Typography variant="h6" className="font-semibold">
					{title}
				</Typography>
				<StatusBadge status={status} />
			</Box>
			<Grid container spacing={2}>
				<Grid item xs={4}>
					<Typography variant="body2" color="textSecondary">Suspected</Typography>
					<Typography variant="h5" className="font-semibold">{suspectedCases}</Typography>
				</Grid>
				<Grid item xs={4}>
					<Typography variant="body2" color="textSecondary">Confirmed</Typography>
					<Typography variant="h5" className="font-semibold">{confirmedCases}</Typography>
				</Grid>
				<Grid item xs={4}>
					<Typography variant="body2" color="textSecondary">Evaluated</Typography>
					<Typography variant="h5" className="font-semibold">{evaluatedCases}</Typography>
				</Grid>
			</Grid>
		</CardContent>
	</Card>
	);

	return (
		<PageLayout 
			title="Disease Summary Dashboard" 
			breadcrumbs={[{ label: 'Dashboards' }, { label: 'Disease Summary' }]}
		>
			{state.loading ? (
				<Shimmer />
			) : (
				<Box>
					<Grid container spacing={3} className="mb-6">
						<Grid item xs={12} md={4}>
							<DiseaseStatCard
								title="Measles"
								suspectedCases={state.diseaseCases.measles.suspectedCases}
								confirmedCases={state.diseaseCases.measles.confirmedCases}
								evaluatedCases={state.diseaseCases.measles.evaluatedCases}
								status="active"
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<DiseaseStatCard
								title="Lassa Fever"
								suspectedCases={state.diseaseCases.lassa.suspectedCases}
								confirmedCases={state.diseaseCases.lassa.confirmedCases}
								evaluatedCases={state.diseaseCases.lassa.evaluatedCases}
								status="active"
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<DiseaseStatCard
								title="Yellow Fever"
								suspectedCases={state.diseaseCases.yellowFever.suspectedCases}
								confirmedCases={state.diseaseCases.yellowFever.confirmedCases}
								evaluatedCases={state.diseaseCases.yellowFever.evaluatedCases}
								status="scheduled"
							/>
						</Grid>
					</Grid>

					<Grid container spacing={3} className="mb-6">
						<Grid item xs={12} md={4}>
							<DiseaseStatCard
								title="Monkey Pox"
								suspectedCases={state.diseaseCases.monkeyPox.suspectedCases}
								confirmedCases={state.diseaseCases.monkeyPox.confirmedCases}
								evaluatedCases={state.diseaseCases.monkeyPox.evaluatedCases}
								status="active"
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<DiseaseStatCard
								title="COVID-19"
								suspectedCases={state.diseaseCases.covid19.suspectedCases}
								confirmedCases={state.diseaseCases.covid19.confirmedCases}
								evaluatedCases={state.diseaseCases.covid19.evaluatedCases}
								status="over"
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<DiseaseStatCard
								title="Cholera"
								suspectedCases={state.diseaseCases.cholera.suspectedCases}
								confirmedCases={state.diseaseCases.cholera.confirmedCases}
								evaluatedCases={state.diseaseCases.cholera.evaluatedCases}
								status="active"
							/>
						</Grid>
					</Grid>

					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<Card>
								<CardContent>
									<Typography variant="h6" className="mb-4">Measles Distribution</Typography>
									<HighchartsReact
										highcharts={Highcharts}
										options={state.measlesMapChartData}
										constructorType={'mapChart'}
									/>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} md={6}>
							<Card>
								<CardContent>
									<Typography variant="h6" className="mb-4">Lassa Fever Distribution</Typography>
									<HighchartsReact
										highcharts={Highcharts}
										options={state.lassaMapChartData}
										constructorType={'mapChart'}
									/>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} md={6}>
							<Card>
								<CardContent>
									<Typography variant="h6" className="mb-4">Yellow Fever Distribution</Typography>
									<HighchartsReact
										highcharts={Highcharts}
										options={state.yellowMapChartData}
										constructorType={'mapChart'}
									/>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} md={6}>
							<Card>
								<CardContent>
									<Typography variant="h6" className="mb-4">Monkey Pox Distribution</Typography>
									<HighchartsReact
										highcharts={Highcharts}
										options={state.monkeyMapChartData}
										constructorType={'mapChart'}
									/>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} md={6}>
							<Card>
								<CardContent>
									<Typography variant="h6" className="mb-4">COVID-19 Distribution</Typography>
									<HighchartsReact
										highcharts={Highcharts}
										options={state.covid19MapChartData}
										constructorType={'mapChart'}
									/>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} md={6}>
							<Card>
								<CardContent>
									<Typography variant="h6" className="mb-4">Cholera Distribution</Typography>
									<HighchartsReact
										highcharts={Highcharts}
										options={state.choleraMapChartData}
										constructorType={'mapChart'}
									/>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</Box>
			)}
		</PageLayout>
	);
};

export default SummaryBoard;
