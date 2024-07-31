import { FunctionComponent, useState, useCallback, useEffect } from 'react';
import Header from '../../components/Header';
import data from '../../demo-data/us-population-density.json';
import osunMap from '../../demo-data/Osun.json';
import { columnChart, stateMaps } from '../../services/Charts.service';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import BreadCrumb from '../../components/BreadCrumb';
import { Carousel } from 'react-bootstrap';
import SummaryBoard from '../summaryDashboard';
import TreamentDashboard from '../treamentDashboard';
import Saturation from '../saturationDashboard';
import NcdDashboard from '../NcdDashboard';
import MentalHealthDashboard from '../mentalHealthDashboard';
import VlAgeDashboard from '../vlAgeDashboard';
import VlDashboard from '../vlDashboard';
import LassaDashboard from '../lassaDashboard';
import MonkeyPoxDashboard from '../monkeyPoxDashboard';
import YellowFeverDashboard from '../yellowFeverDashboard';
import CholeraDashboard from '../coleraDashboard';
import MeaslesDashboard from '../measlesDashboard';

const SlideShow: FunctionComponent = () => {

	return (<>
		<div>
			<Carousel>
				<Carousel.Item>
					<SummaryBoard/>
				</Carousel.Item>
				<Carousel.Item>
					<TreamentDashboard/>
				</Carousel.Item>
				<Carousel.Item>
					<Saturation/>
				</Carousel.Item>
				<Carousel.Item>
					<NcdDashboard/>
				</Carousel.Item>
				<Carousel.Item>
					<MentalHealthDashboard/>
				</Carousel.Item>
				<Carousel.Item>
					<VlAgeDashboard/>
				</Carousel.Item>
				<Carousel.Item>
					<VlDashboard/>
				</Carousel.Item>
				
				<Carousel.Item>
					<CholeraDashboard/>
				</Carousel.Item>
				<Carousel.Item>
					<LassaDashboard/>
				</Carousel.Item>
				<Carousel.Item>
					<MonkeyPoxDashboard/>
				</Carousel.Item>
				<Carousel.Item>
					<YellowFeverDashboard/>
				</Carousel.Item>
				<Carousel.Item>
					<MeaslesDashboard/>
				</Carousel.Item>
			</Carousel>
		</div>
	</>);
};

export default SlideShow;
