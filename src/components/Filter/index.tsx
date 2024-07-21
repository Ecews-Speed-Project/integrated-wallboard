import { FunctionComponent } from 'react';
import styles from './Filter.module.css';

export type FilterType = {
  	className?: string;
}



const Filter:FunctionComponent<FilterType> = ({ className="",}) => {
  	return (
    		<div className={[styles.filter, className].join(' ')}>
      			<div className={styles.filterWrapper}>
        				<b className={styles.inputText}>Filter</b>
      			</div>
      			<div className={styles.textField}>
        				<div className={styles.textPrimaryIcon}>
          					<div className={styles.inputText}>Select state</div>
        				</div>
        				<img className={styles.icons} alt="" src="Icons.svg" />
        				<div className={styles.label}>
          					<b className={styles.label1}>By State</b>
        				</div>
      			</div>
      			<div className={styles.textField}>
        				<div className={styles.textPrimaryIcon}>
          					<div className={styles.inputText}>Select LGA</div>
        				</div>
        				<img className={styles.icons} alt="" src="Icons.svg" />
        				<div className={styles.label}>
          					<b className={styles.label1}>By LGA</b>
        				</div>
      			</div>
    		</div>);
};

export default Filter;
