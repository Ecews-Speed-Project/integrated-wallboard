import { FunctionComponent, useState, useEffect } from 'react';
import styles from '../SummaryBoard.module.css';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highchartsMap from "highcharts/modules/map";
highchartsMap(Highcharts);

const Somas: FunctionComponent = () => {
	const [chartData, setChartData] = useState({});
	const fetchMap = async () => {

	}

	useEffect(() => {
		// Define the fetch function
		fetchMap()
		return () => { // cleanup function of type : () => void
			console.log("Cleanup")
		}

	}, [])


	return (<>
		<div className={styles.summaryBoard}>
			<div className={styles.summary}>
				<div className={styles.maternalNewborn}>
					<b className={styles.penta3Drop}>Maternal-Newborn</b>
					<b className={styles.cases}>30 CASES</b>
				</div>
				<div className={styles.maternalNewborn}>
					<b className={styles.penta3Drop}>Malaria and IMCI</b>
					<b className={styles.cases1}>20 CASES</b>
				</div>
				<div className={styles.maternalNewborn}>
					<b className={styles.penta3Drop}>Penta 3 drop out rate</b>
					<b className={styles.cases}>20 CASES</b>
				</div>
				<div className={styles.maternalNewborn}>
					<b className={styles.penta3Drop}>Exclusively Breastfed</b>
					<b className={styles.cases1}>20 CASES</b>
				</div>
				<div className={styles.maternalNewborn}>
					<b className={styles.penta3Drop}>Screen for TB</b>
					<b className={styles.cases}>20 CASES</b>
				</div>
				<div className={styles.maternalNewborn}>
					<b className={styles.currentOnHiv1}>CURRENT  ON HIV</b>
					<b className={styles.cases}>24,234 CASES</b>
				</div>
			</div>
			<div className={styles.top5LgasDataSheetForNonParent}>
				<b className={styles.top5Lgas}>{`Top 5 LGAs  Data sheet for non HIV Disease `}</b>
				<div className={styles.lgaWrapper}>
					<b className={styles.lga}>LGA</b>
				</div>
				<div className={styles.frameParent1}>
					<div className={styles.anc4Anc1Wrapper}>
						<b className={styles.anc4Anc1}>ANC4/ ANC1</b>
					</div>
					<div className={styles.penta3Wrapper}>
						<b className={styles.penta3}> Penta 3</b>
					</div>
					<div className={styles.exclusivelyBreastfedWrapper}>
						<b className={styles.exclusivelyBreastfed2}>
							<p className={styles.exclusively}>Exclusively</p>
							<p className={styles.exclusively}>Breastfed</p>
						</b>
					</div>
					<div className={styles.screenForTbWrapper}>
						<b className={styles.screenForTb2}>Screen for TB</b>
					</div>
					<div className={styles.testedForMalariaWrapper}>
						<b className={styles.testedForMalaria}>Tested for malaria</b>
					</div>
				</div>
				<div className={styles.atakumosaEastWrapper}>
					<div className={styles.atakumosaEast}>Atakumosa East</div>
				</div>
				<div className={styles.wrapper}>
					<b className={styles.b}>100</b>
				</div>
				<div className={styles.container}>
					<b className={styles.b1}>100</b>
				</div>
				<div className={styles.frame}>
					<b className={styles.b1}>100</b>
				</div>
				<div className={styles.wrapper1}>
					<b className={styles.b1}>100</b>
				</div>
				<div className={styles.wrapper2}>
					<b className={styles.b}>100</b>
				</div>
				<div className={styles.atakumosaWestWrapper}>
					<div className={styles.atakumosaWest}>Atakumosa West</div>
				</div>
				<div className={styles.wrapper3}>
					<b className={styles.b5}>200</b>
				</div>
				<div className={styles.wrapper4}>
					<b className={styles.b6}>200</b>
				</div>
				<div className={styles.wrapper5}>
					<b className={styles.b6}>200</b>
				</div>
				<div className={styles.wrapper6}>
					<b className={styles.b6}>200</b>
				</div>
				<div className={styles.wrapper7}>
					<b className={styles.b5}>200</b>
				</div>
				<div className={styles.ayedaadeWrapper}>
					<div className={styles.atakumosaWest}>Ayedaade</div>
				</div>
				<div className={styles.wrapper8}>
					<b className={styles.b5}>500</b>
				</div>
				<div className={styles.wrapper9}>
					<b className={styles.b11}>500</b>
				</div>
				<div className={styles.wrapper10}>
					<b className={styles.b11}>500</b>
				</div>
				<div className={styles.wrapper11}>
					<b className={styles.b11}>500</b>
				</div>
				<div className={styles.wrapper12}>
					<b className={styles.b5}>500</b>
				</div>
				<div className={styles.ayedireWrapper}>
					<div className={styles.atakumosaWest}>Ayedire</div>
				</div>
				<div className={styles.wrapper13}>
					<b className={styles.b15}>1000</b>
				</div>
				<div className={styles.wrapper14}>
					<b className={styles.b16}>1000</b>
				</div>
				<div className={styles.wrapper15}>
					<b className={styles.b16}>1000</b>
				</div>
				<div className={styles.wrapper16}>
					<b className={styles.b16}>1000</b>
				</div>
				<div className={styles.wrapper17}>
					<b className={styles.b15}>1000</b>
				</div>
				<div className={styles.boluwaduroWrapper}>
					<div className={styles.atakumosaEast}>Boluwaduro</div>
				</div>
				<div className={styles.wrapper18}>
					<b className={styles.b20}>700</b>
				</div>
				<div className={styles.wrapper19}>
					<b className={styles.b21}>700</b>
				</div>
				<div className={styles.wrapper20}>
					<b className={styles.b21}>700</b>
				</div>
				<div className={styles.wrapper21}>
					<b className={styles.b21}>700</b>
				</div>
				<div className={styles.wrapper22}>
					<b className={styles.b20}>700</b>
				</div>
				<div className={styles.boluwaduroContainer}>
					<div className={styles.atakumosaWest}>Boluwaduro</div>
				</div>
				<div className={styles.wrapper23}>
					<b className={styles.b25}>700</b>
				</div>
				<div className={styles.wrapper24}>
					<b className={styles.b6}>700</b>
				</div>
				<div className={styles.wrapper25}>
					<b className={styles.b6}>700</b>
				</div>
				<div className={styles.wrapper26}>
					<b className={styles.b6}>700</b>
				</div>
				<div className={styles.wrapper27}>
					<b className={styles.b25}>700</b>
				</div>
			</div>
			<div className={styles.top5LgasDataSheetForHivParent}>
				<b className={styles.top5Lgas}>{`Top 5 LGAs  Data sheet for HIV Disease and NCDS `}</b>
				<div className={styles.lgaWrapper}>
					<b className={styles.lga}>LGA</b>
				</div>
				<div className={styles.frameParent1}>
					<div className={styles.testedForMalariaWrapper}>
						<b className={styles.treatmentSaturation}>
							<p className={styles.exclusively}>Treatment</p>
							<p className={styles.exclusively}>Saturation</p>
						</b>
					</div>
					<div className={styles.screenForTbWrapper}>
						<b className={styles.uniquePatients}>Unique Patients</b>
					</div>
					<div className={styles.exclusivelyBreastfedWrapper}>
						<b className={styles.suppressedViralload}>
							<p className={styles.exclusively}>Suppressed</p>
							<p className={styles.exclusively}>VIralload</p>
						</b>
					</div>
					<div className={styles.screenForTbWrapper}>
						<b className={styles.patientsWithBpContainer}>
							<p className={styles.exclusively}>Patients with</p>
							<p className={styles.exclusively}>{`BP > 40`}</p>
						</b>
					</div>
					<div className={styles.testedForMalariaWrapper}>
						<b className={styles.diabetics}>Diabetics</b>
					</div>
				</div>
				<div className={styles.atakumosaEastWrapper}>
					<div className={styles.atakumosaEast}>Atakumosa East</div>
				</div>
				<div className={styles.wrapper}>
					<b className={styles.b}>100</b>
				</div>
				<div className={styles.container}>
					<b className={styles.b1}>100</b>
				</div>
				<div className={styles.frame}>
					<b className={styles.b1}>100</b>
				</div>
				<div className={styles.wrapper1}>
					<b className={styles.b1}>100</b>
				</div>
				<div className={styles.wrapper2}>
					<b className={styles.b}>100</b>
				</div>
				<div className={styles.atakumosaWestWrapper}>
					<div className={styles.atakumosaWest}>Atakumosa West</div>
				</div>
				<div className={styles.wrapper3}>
					<b className={styles.b5}>200</b>
				</div>
				<div className={styles.wrapper4}>
					<b className={styles.b6}>200</b>
				</div>
				<div className={styles.wrapper35}>
					<b className={styles.b6}>200</b>
				</div>
				<div className={styles.wrapper6}>
					<b className={styles.b6}>200</b>
				</div>
				<div className={styles.wrapper7}>
					<b className={styles.b5}>200</b>
				</div>
				<div className={styles.ayedaadeWrapper}>
					<div className={styles.atakumosaWest}>Ayedaade</div>
				</div>
				<div className={styles.wrapper8}>
					<b className={styles.b5}>500</b>
				</div>
				<div className={styles.wrapper9}>
					<b className={styles.b11}>500</b>
				</div>
				<div className={styles.wrapper40}>
					<b className={styles.b11}>500</b>
				</div>
				<div className={styles.wrapper11}>
					<b className={styles.b11}>500</b>
				</div>
				<div className={styles.wrapper12}>
					<b className={styles.b5}>500</b>
				</div>
				<div className={styles.ayedireWrapper}>
					<div className={styles.atakumosaWest}>Ayedire</div>
				</div>
				<div className={styles.wrapper13}>
					<b className={styles.b15}>1000</b>
				</div>
				<div className={styles.wrapper14}>
					<b className={styles.b16}>1000</b>
				</div>
				<div className={styles.wrapper15}>
					<b className={styles.b16}>1000</b>
				</div>
				<div className={styles.wrapper16}>
					<b className={styles.b16}>1000</b>
				</div>
				<div className={styles.wrapper17}>
					<b className={styles.b15}>1000</b>
				</div>
				<div className={styles.boluwaduroWrapper}>
					<div className={styles.atakumosaEast}>Boluwaduro</div>
				</div>
				<div className={styles.wrapper48}>
					<b className={styles.b20}>700</b>
				</div>
				<div className={styles.wrapper49}>
					<b className={styles.b21}>700</b>
				</div>
				<div className={styles.wrapper50}>
					<b className={styles.b21}>700</b>
				</div>
				<div className={styles.wrapper51}>
					<b className={styles.b21}>700</b>
				</div>
				<div className={styles.wrapper52}>
					<b className={styles.b20}>700</b>
				</div>
				<div className={styles.boluwaduroContainer}>
					<div className={styles.atakumosaWest}>Boluwaduro</div>
				</div>
				<div className={styles.wrapper23}>
					<b className={styles.b25}>700</b>
				</div>
				<div className={styles.wrapper24}>
					<b className={styles.b6}>700</b>
				</div>
				<div className={styles.wrapper25}>
					<b className={styles.b6}>700</b>
				</div>
				<div className={styles.wrapper26}>
					<b className={styles.b6}>700</b>
				</div>
				<div className={styles.wrapper27}>
					<b className={styles.b25}>700</b>
				</div>
			</div>
			<div className={styles.slider}>
				<b className={styles.newCasesOf}>New Cases of Maternal New born in Osun Sates</b>
				<div className={styles.map}>
					<HighchartsReact
						constructorType={'mapChart'}
						highcharts={Highcharts}
						options={chartData}
					/>
				</div>
			</div>

		</div>
	</>);
};

export default Somas;
