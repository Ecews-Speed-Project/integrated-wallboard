import { FunctionComponent } from 'react';
import styles from './DropdownLight.module.css';

export type DropdownLightType = {
  	className?: string;
}




const DropdownLight:FunctionComponent<DropdownLightType> = ({ className="" }) => {
  	return (
    		<div className={[styles.dropdownLight, className].join(' ')}>
      			<div className={styles.dropdownList}>
        				<div className={styles.item}>
          					<div className={styles.page}>Summary</div>
        				</div>
      			</div>
      			<div className={styles.dropdownList}>
        				<div className={styles.item}>
          					<div className={styles.page}>Treatment Saturation</div>
        				</div>
      			</div>
      			<div className={styles.dropdownList}>
        				<div className={styles.item}>
          					<div className={styles.page}>TS by Age Band</div>
        				</div>
      			</div>
      			<div className={styles.dropdownList}>
        				<div className={styles.item}>
          					<div className={styles.page}>VL Coverage and Suppression</div>
        				</div>
      			</div>
      			<div className={styles.dropdownList}>
        				<div className={styles.item}>
          					<div className={styles.page}>VL Coverage and Suppression by Age Band</div>
        				</div>
      			</div>
      			<div className={styles.dropdownList}>
        				<div className={styles.item}>
          					<div className={styles.page}>NCD Integration Hypertension</div>
        				</div>
      			</div>
      			<div className={styles.dropdownList6}>
        				<div className={styles.item}>
          					<div className={styles.page}>NCD Integration Diabetes and Mental Health</div>
        				</div>
      			</div>
      			<div className={styles.dropdownList}>
        				<div className={styles.item}>
          					<div className={styles.page}>Reports</div>
        				</div>
      			</div>
      			<div className={styles.dropdownList}>
        				<div className={styles.item}>
          					<div className={styles.page}>Logout</div>
        				</div>
      			</div>
    		</div>);
};

export default DropdownLight;
