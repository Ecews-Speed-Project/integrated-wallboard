import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@mui/material';
import { Check, Bookmark, Lightbulb } from 'lucide-react';
import DynamicBreadCrumb from '../../../components/DynamicBreadCrumb';
import { StatCard } from '../../../components/StatCard';
import PopulationPyramid from '../../../components/PopulationPyramid';
import { buildLineChat, seriesDataObj } from '../../../utils/chatUtils/lineChart';
import { butterFly } from '../../../utils/chatUtils/butterflyChart';
import Highcharts, { color } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { treamenTtrend } from '../../../services/main.service';



interface DataItem {
	month: string;
	year: number;
	value: number;
}


const Dashboard: React.FC = () => {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const userData = useSelector((state: RootState) => state.auth);
	const hasFetched = useRef(false);


	const [state, setState] = useState({
		chartData: {},
		ageAndSex: {},
	});
	useEffect(() => {


	}, [userData.stateId]);


	useEffect(() => {
		setIsVisible(true);

		const fetchMap = async () => {
			try {
				const data = await treamenTtrend(userData.stateId);

				let categoriesData: string[] = [];
				let seriesData: any = [];
				if (data.dhis_data.tX_CURR != null) {
					data.dhis_data.tX_CURR.trends.forEach((item: DataItem) => {
						categoriesData.push(`${item.month} ${item.year}`);
						seriesData.push(item.value);
					});
				}

				setState((prevState) => ({
					chartData: buildLineChat('Percentage of Unique Clients', categoriesData, seriesDataObj(userData.state, seriesData), 600),
					ageAndSex: butterFly('TX_CURR by age and sex', 'Percentage of Unique Clients', categoriesData),
				}));
			} catch (error) {
				console.error('Error fetching map data:', error);
			}
		};

		if (!hasFetched.current) {
			fetchMap();
			hasFetched.current = true;
		}


	}, [userData.stateId]);

	// Calculate progress circle parameters
	const calculateCircleOffset = (percent: number): number => {
		const circumference = 2 * Math.PI * 70;
		return circumference - (circumference * percent) / 100;
	};

	return (
		<div className={`max-w-12xl mx-auto p-6 space-y-6  transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
			<DynamicBreadCrumb page="HIV Treatment Dashboard" />
			{/* Top Banner */}
			<Card className="bg-emerald-400 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 banner" >
				<CardContent className="p-8 flex justify-between items-center">
					<div className="space-y-3 max-w-lg">
						<h1 className="banner-text text-3xl font-bold  tracking-tight" style={{color:'#000 !importent'}}>Quarter ends in 117 days</h1>
						<h2 className="banner-text text-2xl font-bold  tracking-tight">TX_CURR on the NDR today is 87,327</h2>
						<p className=" banner-text text-white/90 text-sm leading-relaxed">
							95 Reporting Facilities  have upload (100%)
						</p>
					</div>
					<div className="relative">
						<img
							src="/icons/hiv.svg"
							alt="Student"
							style={{width:'150px'}}
							className="rounded-lg shadow-2xl transition-transform duration-300 hover:scale-105"
						/>
					</div>
				</CardContent>
			</Card>

			{/* Stats Cards */}
			<div className="grid grid-cols-3 gap-6">
				<StatCard
					icon={Check}
					count={1500}
					label="Active HIV patients"
					bgColor="main-card1"
					highlightColor="bg-emerald-500/20"
				/>
				<StatCard
					icon={Lightbulb}
					count={903}
					label="New Patients Enrolled into care"
					bgColor="main-card2"
					highlightColor="bg-amber-500/20"
				/>
				<StatCard
					icon={Bookmark}
					count={1112}
					label="Total Unique Patients"
					bgColor="main-card1"
					highlightColor="bg-slate-700/50"
				/>
			</div>

			<div className="flex gap-6">
				{/* Learning Activity Chart */}
				<Card className="col-md-8 flex-grow rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
					<HighchartsReact
						highcharts={Highcharts}
						options={state.chartData}
					/>
				</Card>

				{/* Progress Card */}
				<Card className="col-md-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
					<PopulationPyramid />
				</Card>
			</div>
		</div>
	);
};

export default Dashboard;

// utils.ts
export const formatNumber = (num: number): string => {
	return new Intl.NumberFormat('en-US').format(num);
};

export const calculatePercentageChange = (current: number, previous: number): number => {
	return ((current - previous) / previous) * 100;
};