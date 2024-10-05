import { FunctionComponent, useState, useCallback, useEffect } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highchartsMap from "highcharts/modules/map";
import { getMap, getMapData, stateMaps } from '../../../services/Charts.service';
import NonHIVTable from '../../../components/NonHIVTable';
import SmallCard from '../../../components/SmallCard';
import BreadCrumb from '../../../components/BreadCrumb';
import { auth } from '../../../services/auth.services';
import Carousel from 'react-bootstrap/Carousel';
import { GenericObject } from '../../../types/dseaseData';
import { summaryDashboard } from '../../../services/mock/summaryDashboard';
import HIVTable from '../../../components/hivTable';
import { handleSearch, handleSearchArray } from '../../../utils/helpers';
import { summaryApiData } from '../../../services/main.service';
import { DiseaseData, LGAData, Totals } from '../../../types/interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

highchartsMap(Highcharts);


const SummaryBoard: FunctionComponent = () => {

	const userData = useSelector((state: RootState) => state.auth);

	const [user, setUser] = useState<{ [key: string]: any }>({});
	const [loading, setLoading] = useState(false);
	const [chartData, setChartData] = useState({});
	const [chart1Data, setChart1Data] = useState({});
	const [chart2Data, setChart2Data] = useState({});
	const [chart3Data, setChart3Data] = useState({});
	const [summaryData, setSummaryData] = useState({});
	const [statsData, setStatsData] = useState<GenericObject>({});
	const [otherDisease, setOtherDisease] = useState<GenericObject[]>([]);
	const [hivDisease, setHivDisease] = useState<GenericObject[]>([]);



	const [choleraCases, setCholeraCases] = useState<DiseaseData>({
		suspectedCases: 0,
		confirmedCases: 0,
		evaluatedCases: 0,
		rdtRapidDiagnostictestPositive: 0,
		cultured: 0,
	});
	const [lassaCases, setLassaCases] = useState<DiseaseData>({
		suspectedCases: 0,
		confirmedCases: 0,
		evaluatedCases: 0,
		rdtRapidDiagnostictestPositive: 0,
		cultured: 0,
	});
	const [measlesCases, setMeaslesCases] = useState<DiseaseData>({
		suspectedCases: 0,
		confirmedCases: 0,
		evaluatedCases: 0,
		rdtRapidDiagnostictestPositive: 0,
		cultured: 0,
	});
	const [yellowFeverCases, setYellowFeverCases] = useState<DiseaseData>({
		suspectedCases: 0,
		confirmedCases: 0,
		evaluatedCases: 0,
		rdtRapidDiagnostictestPositive: 0,
		cultured: 0,
	});
	const [monkeyPoxCases, setMonkeyPoxCases] = useState<DiseaseData>({
		suspectedCases: 0,
		confirmedCases: 0,
		evaluatedCases: 0,
		rdtRapidDiagnostictestPositive: 0,
		cultured: 0,
	});
	const [covid19Cases, setCovid19Cases] = useState<DiseaseData>({
		suspectedCases: 0,
		confirmedCases: 0,
		evaluatedCases: 0,
		rdtRapidDiagnostictestPositive: 0,
		cultured: 0,
	});
	const [diphtheriaCases, setDiphtheriaCases] = useState<DiseaseData>({
		suspectedCases: 0,
		confirmedCases: 0,
		evaluatedCases: 0,
		rdtRapidDiagnostictestPositive: 0,
		cultured: 0,
	});

	useEffect(() => {
		const fetchData= async () => {
				
			setLoading(true)
			setUser(userData);
			let map = await getMap(userData.state)
			let mapData = await getMapData(userData.state)
			
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
				totals.cholera.suspectedCases += current.choleraCascade.suspectedCases;
				totals.cholera.confirmedCases += current.choleraCascade.confirmedCases;
				totals.cholera.evaluatedCases += current.choleraCascade.evaluatedCases; // Sum evaluated cases
				totals.cholera.rdtRapidDiagnostictestPositive += current.choleraCascade.rdtRapidDiagnostictestPositive; // Sum RDT positives
				totals.cholera.cultured += current.choleraCascade.cultured; // Sum cultured

				totals.lassa.suspectedCases += current.lassa.suspectedCases;
				totals.lassa.confirmedCases += current.lassa.confirmedCases;
				totals.lassa.evaluatedCases += current.lassa.evaluatedCases; // Sum evaluated cases
				totals.lassa.rdtRapidDiagnostictestPositive += current.lassa.rdtRapidDiagnostictestPositive; // Sum RDT positives
				totals.lassa.cultured += current.lassa.cultured; // Sum cultured

				totals.measles.suspectedCases += current.measles.suspectedCases;
				totals.measles.confirmedCases += current.measles.confirmedCases;
				totals.measles.evaluatedCases += current.measles.evaluatedCases; // Sum evaluated cases
				totals.measles.rdtRapidDiagnostictestPositive += current.measles.rdtRapidDiagnostictestPositive; // Sum RDT positives
				totals.measles.cultured += current.measles.cultured; // Sum cultured

				totals.yellowFever.suspectedCases += current.yellowFever.suspectedCases;
				totals.yellowFever.confirmedCases += current.yellowFever.confirmedCases;
				totals.yellowFever.evaluatedCases += current.yellowFever.evaluatedCases; // Sum evaluated cases
				totals.yellowFever.rdtRapidDiagnostictestPositive += current.yellowFever.rdtRapidDiagnostictestPositive; // Sum RDT positives
				totals.yellowFever.cultured += current.yellowFever.cultured; // Sum cultured

				totals.monkeyPox.suspectedCases += current.monkeyPox.suspectedCases;
				totals.monkeyPox.confirmedCases += current.monkeyPox.confirmedCases;
				totals.monkeyPox.evaluatedCases += current.monkeyPox.evaluatedCases; // Sum evaluated cases
				totals.monkeyPox.rdtRapidDiagnostictestPositive += current.monkeyPox.rdtRapidDiagnostictestPositive; // Sum RDT positives
				totals.monkeyPox.cultured += current.monkeyPox.cultured; // Sum cultured

				totals.covid19.suspectedCases += current.covid19.suspectedCases;
				totals.covid19.confirmedCases += current.covid19.confirmedCases;
				totals.covid19.evaluatedCases += current.covid19.evaluatedCases; // Sum evaluated cases
				totals.covid19.rdtRapidDiagnostictestPositive += current.covid19.rdtRapidDiagnostictestPositive; // Sum RDT positives
				totals.covid19.cultured += current.covid19.cultured; // Sum cultured

				totals.diphtheria.suspectedCases += current.diphtheria.suspectedCases;
				totals.diphtheria.confirmedCases += current.diphtheria.confirmedCases;
				totals.diphtheria.evaluatedCases += current.diphtheria.evaluatedCases; // Sum evaluated cases
				totals.diphtheria.rdtRapidDiagnostictestPositive += current.diphtheria.rdtRapidDiagnostictestPositive; // Sum RDT positives
				totals.diphtheria.cultured += current.diphtheria.cultured; // Sum cultured
			});

			// Setting the summed data to the state
			setCholeraCases(totals.cholera);
			setLassaCases(totals.lassa);
			setMeaslesCases(totals.measles);
			setYellowFeverCases(totals.yellowFever);
			setMonkeyPoxCases(totals.monkeyPox);
			setCovid19Cases(totals.covid19);
			setDiphtheriaCases(totals.diphtheria);







			//set Desease table
			setSummaryData(summaryDashboard)

			let stats = handleSearch(summaryDashboard.stats, user.stateId)
			setStatsData(stats)

			let otherDiseaseData = handleSearchArray(summaryDashboard.otherDisease, user.stateId)
			setOtherDisease(otherDiseaseData)
			console.log(otherDisease)

			let hivDiseaseData = handleSearchArray(summaryDashboard.hivDisease, user.stateId)
			setHivDisease(hivDiseaseData)


			setChartData(stateMaps(map, mapData, 'New Case of Monkey Pox in ' + userData.state + " state by lga", 760))
			setChart1Data(stateMaps(map, mapData, 'New Case of Cholera in ' + userData.state + " state by lga", 760))
			setChart2Data(stateMaps(map, mapData, 'New Case of Laser Fever in ' + userData.state + " state by lga", 760))
			setChart3Data(stateMaps(map, mapData, 'Maternal-Newborn in ' + userData.state + " state by lga", 760))
	 	}

		fetchData();
	}, [userData.stateId])


	return (<>
		<div>
			<div className="bg-container container-fluid  mt-2">
				<BreadCrumb state={user!.fullName} page={"Summary Page"}></BreadCrumb>
				<div className="row">
					<SmallCard title={"Measles Cases"} value={measlesCases.suspectedCases.toString()}></SmallCard>
					<SmallCard title={"Yellow Fever Cases"} value={yellowFeverCases.suspectedCases.toString()}></SmallCard>
					<SmallCard title={"New Cholera Cases"} value={choleraCases.suspectedCases.toString()}></SmallCard>
					<SmallCard title={"New Monkey Pox Cases"} value={monkeyPoxCases.suspectedCases.toString()}></SmallCard>
					<SmallCard title={"Lassa Fever Cases "} value={lassaCases.suspectedCases.toString()}></SmallCard>
					<SmallCard title={"Covid19 Cases"} value={covid19Cases.suspectedCases.toString()}></SmallCard>
					<div className="col-12 col-md-6">
						<div className="card-body table-card-bg mb-2">
							<h1 className='small-card-title '>Top 7 LGAs  Data sheet for non HIV Disease </h1>
							<NonHIVTable data={otherDisease} />
						</div>

						<div className="card-body table-card-bg">
							<h1 className='small-card-title '>Top 7 LGAs  Data sheet for HIV Disease and NCDs</h1>
							<HIVTable data={hivDisease} />
						</div>


					</div>

					<div className="col-12 col-md-6">
						<Carousel>
							<Carousel.Item>
								<HighchartsReact
									constructorType={'mapChart'}
									highcharts={Highcharts}
									options={chartData}
								/>
							</Carousel.Item>
							<Carousel.Item>
								<HighchartsReact
									constructorType={'mapChart'}
									highcharts={Highcharts}
									options={chart1Data}
								/>
							</Carousel.Item>
							<Carousel.Item>
								<HighchartsReact
									constructorType={'mapChart'}
									highcharts={Highcharts}
									options={chart2Data}
								/>
							</Carousel.Item>
							<Carousel.Item>
								<HighchartsReact
									constructorType={'mapChart'}
									highcharts={Highcharts}
									options={chart3Data}
								/>
							</Carousel.Item>
						</Carousel>
					</div>
				</div>
			</div>
		</div >
	</>);
};

export default SummaryBoard;
