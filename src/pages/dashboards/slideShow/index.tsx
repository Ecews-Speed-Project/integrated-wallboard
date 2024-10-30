import { FunctionComponent, useState, useCallback, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { Carousel } from 'react-bootstrap';
import SummaryBoard from '../summaryDashboard';
import TreamentDashboard from '../treamentDashboard';
import VlAgeDashboard from '../vlAgeDashboard';
import VlDashboard from '../vlDashboard';
import LassaDashboard from '../lassaDashboard';
import MonkeyPoxDashboard from '../monkeyPoxDashboard';
import YellowFeverDashboard from '../yellowFeverDashboard';
import CholeraDashboard from '../coleraDashboard';
import MeaslesDashboard from '../measlesDashboard';
import Dashboard from '../treamentTrendDashboard';

const SlideShow: FunctionComponent = () => {

	return (<>
		<div>
			<Carousel>
				<Carousel.Item>
					<SummaryBoard/>
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
				<Carousel.Item>
					<TreamentDashboard/>
				</Carousel.Item>
				<Carousel.Item>
					<Dashboard/>
				</Carousel.Item>
				<Carousel.Item>
					<VlAgeDashboard/>
				</Carousel.Item>
				<Carousel.Item>
					<VlDashboard/>
				</Carousel.Item>
				
			</Carousel>
		</div>
	</>);
};

export default SlideShow;
