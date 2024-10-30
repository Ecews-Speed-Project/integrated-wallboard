import { FunctionComponent, useEffect } from 'react';

import styles from './Style.module.css';

const Saturation: FunctionComponent = () => {
	const fetchMap = async () => {

	}

	useEffect(() => {
		fetchMap()
		return () => { 
			console.log("Cleanup")
		}

	}, [])



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
			<div className={styles.frameParent1}>
				<div className={styles.iconsWrapper2} >
					<img className={styles.icons5} alt="" src="Icons.svg" />
				</div>
				<div className={styles.iconsWrapper2} >
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
	</>);
};

export default Saturation;
