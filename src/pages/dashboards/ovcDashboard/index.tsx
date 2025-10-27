import { FunctionComponent, useState, useEffect, useCallback } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import { getMap, getNigeriaMapForSomasData, getSomaLiveMapData, hivStateMap, somasMap } from '../../../services/Charts.service';
import SmallCard from '../../../components/SmallCard';
import Carousel from 'react-bootstrap/Carousel';
import { getReportDatesData, summaryApiData } from '../../../services/main.service';
import { LGAData, Totals } from '../../../types/interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import DynamicBreadCrumb from '../../../components/DynamicBreadCrumb';
import { GenericObject } from '../../../types/dseaseData';
import NonHIVTable from '../../../components/NonHIVTable';
import { getStateById, Shimmer, State } from '../../../utils/helpers';

highchartsMap(Highcharts);

const OvcBoard: FunctionComponent = () => {


	return (
		<div className="bg-container container-fluid mt-2">
			<iframe title="OVC PROGRAM DASHBOARD" width="100%" height="850"
			 src="https://app.powerbi.com/view?r=eyJrIjoiMzJjZjdiZjYtNzVhOC00YzZhLWE2ZmYtMGY0MzFjM2U4NDY2IiwidCI6Ijk5ZTIxMzhhLWRiNGYtNDNmNy04NzgzLTczZGM3MzBhZWMyOCJ9" 
		></iframe>
		</div>
	);
};

export default OvcBoard;
