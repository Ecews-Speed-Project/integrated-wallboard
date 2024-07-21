import { FunctionComponent, useState, useCallback, useEffect } from 'react';
import Header from '../../components/Header';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highchartsMap from "highcharts/modules/map";
import data from '../../demo-data/us-population-density.json';
import { getMap, getMapData, stateMaps } from '../../services/Charts.service';
import NonHIVTable from '../../components/NonHIVTable';
import SmallCard from '../../components/SmallCard';
import BreadCrumb from '../../components/BreadCrumb';

highchartsMap(Highcharts);

interface DiseaseData {
	lga: string;
	anc4: number;
	penta: number;
	breastfed: number
	tb: number,
	malaria: number
}

const SummaryBoard: FunctionComponent = () => {
	const [chartData, setChartData] = useState({});



	const initialData: DiseaseData[] = [
		{
			lga: 'Atakumosa East',
			anc4: 200,
			penta: 10,
			breastfed: -7,
			tb: 80,
			malaria: 300

		},
		{
			lga: 'Atakumosa East',
			anc4: 150,
			penta: 3000,
			breastfed: 30,
			tb: 120,
			malaria: 7

		},
		{
			lga: 'Atakumosa East',
			anc4: 3000,
			penta: 50,
			breastfed: 75,
			tb: -10,
			malaria: 80

		},
		{
			lga: 'Atakumosa East',
			anc4: 60,
			penta: 20,
			breastfed: 5000,
			tb: 30,
			malaria: 5000

		},
		{
			lga: 'Atakumosa East',
			anc4: 70,
			penta: 40,
			breastfed: 5000,
			tb: 20,
			malaria: 5000

		},
		{
			lga: 'Atakumosa East',
			anc4: 80,
			penta: 5,
			breastfed: 70,
			tb: 7,
			malaria: 5000
		}, {
			lga: 'Atakumosa East',
			anc4: 70,
			penta: 40,
			breastfed: 5000,
			tb: 20,
			malaria: 5000

		},
		{
			lga: 'Atakumosa East',
			anc4: 80,
			penta: 5,
			breastfed: 70,
			tb: 7,
			malaria: 5000

		}
	];

	const [data2, setData2] = useState<DiseaseData[]>(initialData);
	const fetchMap = async () => {

		let map = await getMap("Ekiti")
		let mapData = await getMapData("Ekiti")
		setChartData(stateMaps(map, mapData, '', 800))
	}

	useEffect(() => {
		fetchMap()
		return () => { console.log("Cleanup") }

	}, [])

	return (<>
		<div>
			<Header></Header>
			<div className="bg-container container-fluid  mt-2">
				<BreadCrumb state={"Osun Sate"} page={"Summary Page"}></BreadCrumb>
				<div className="row">
					<div className="col-12 col-md-12">
						<div className="row">
							<SmallCard title={"Maternal-Newborn"} value={"24,900"}></SmallCard>
							<SmallCard title={"Lasa Fever"} value={"2,900"}></SmallCard>
							<SmallCard title={"Colera"} value={"900"}></SmallCard>
							<SmallCard title={"Mpox"} value={"1,900"}></SmallCard>
							<SmallCard title={"Screen for TB"} value={"4,900"}></SmallCard>
							<SmallCard title={"Recent HIV infections"} value={"900"}></SmallCard>
						</div>
					</div>
					<div className="col-12 col-md-6">
						<div className="card-body table-card-bg mb-2">
							<h1 className='small-card-title '>Top 7 LGAs  Data sheet for non HIV Disease </h1>
							<NonHIVTable data={data2} />
						</div>

						<div className="card-body table-card-bg">
							<h1 className='small-card-title '>Top 7 LGAs  Data sheet for HIV Disease and NCDs</h1>
							<NonHIVTable data={data2} />
						</div>


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
		</div >
	</>);
};

export default SummaryBoard;
