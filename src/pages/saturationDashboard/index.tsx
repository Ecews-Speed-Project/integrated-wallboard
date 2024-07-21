import { FunctionComponent, useState, useCallback, useEffect } from 'react';
import Filter from "../../components/Filter";
import PortalPopup from "../../components/PortalPopup";
import DropdownLight from "../../components/DropdownLight";
import styles from './Style.module.css';
import Header from '../../components/Header';
import data from '../../demo-data/us-population-density.json';
import osunMap from '../../demo-data/Osun.json';
import { stateMaps } from '../../services/Charts.service';

const Saturation: FunctionComponent = () => {
	const [isFilterOpen, setFilterOpen] = useState(false);
	const [isDropdownLightOpen, setDropdownLightOpen] = useState(false);


	const [chartData, setChartData] = useState({});

	const fetchMap = async () => {

		data.forEach(function (p: any) {
			p.code = p.code;
		});

		setChartData(stateMaps(osunMap, data,''))
	}

	useEffect(() => {
		// Define the fetch function
		fetchMap()
		return () => { // cleanup function of type : () => void
			console.log("Cleanup")
		}

	}, [])

	const openFilter = useCallback(() => {
		setFilterOpen(true);
	}, []);

	const closeFilter = useCallback(() => {
		setFilterOpen(false);
	}, []);


	const openDropdownLight = useCallback(() => {
		setDropdownLightOpen(true);
	}, []);

	const closeDropdownLight = useCallback(() => {
		setDropdownLightOpen(false);
	}, []);


	const onFrameContainerClick = useCallback(() => {
		// Add your code here
	}, []);

	return (<>
		<div className={styles.summaryBoard}>
			<div className={styles.summaryBoardInner}>
				<div className={styles.parent}>
					<b className={styles.b}>22</b>
					<b className={styles.totalFacilitiesOfferingContainer}>
						<p className={styles.totalFacilitiesOffering}>{`Total facilities offering HIV care to `}</p>
						<p className={styles.totalFacilitiesOffering}>patents in Osun state</p>
					</b>
				</div>
			</div>
			<Header></Header>
			<div className={styles.frameParent1}>
				<div className={styles.iconsWrapper2} onClick={onFrameContainerClick}>
					<img className={styles.icons5} alt="" src="Icons.svg" />
				</div>
				<div className={styles.iconsWrapper2} onClick={onFrameContainerClick}>
					<img className={styles.icons5} alt="" src="Icons.svg" />
				</div>
			</div>
			<img className={styles.image9Icon} alt="" src="image 9.png" />
			<div className={styles.iconsParent}>
				<img className={styles.icons5} alt="" src="Icons.svg" />
				<b className={styles.treatmentSaturationBy}>Treatment Saturation by Age Band</b>
			</div>
			<div className={styles.summaryBoardChild}>
				<div className={styles.group}>
					<b className={styles.b1}>24,314</b>
					<b className={styles.totalPatientReceivingContainer}>
						<p className={styles.totalFacilitiesOffering}>{`Total patient receiving HIV treatment `}</p>
						<p className={styles.totalFacilitiesOffering}>across all facilities in Osun sate</p>
					</b>
				</div>
			</div>
			<div className={styles.summaryBoardInner1}>
				<div className={styles.group}>
					<b className={styles.b1}>24,314</b>
					<b className={styles.totalPatientReceivingContainer1}>
						<p className={styles.totalFacilitiesOffering}>{`Total patient receiving HIV treatment `}</p>
						<p className={styles.totalFacilitiesOffering}>across all facilities in Osun sate</p>
					</b>
				</div>
			</div>
		</div>
		{isFilterOpen && (
			<PortalPopup
				overlayColor="rgba(113, 113, 113, 0.3)"
				placement="Centered"

				onOutsideClick={closeFilter}
			>
				<Filter /* onClose={closeFilter}  */ />
			</PortalPopup>
		)}
		{isDropdownLightOpen && (
			<PortalPopup
				overlayColor="rgba(113, 113, 113, 0.3)"
				placement="Centered"
				onOutsideClick={closeDropdownLight}
			>
				<DropdownLight /* onClose={closeDropdownLight} */ />
			</PortalPopup>
		)}</>);
};

export default Saturation;
