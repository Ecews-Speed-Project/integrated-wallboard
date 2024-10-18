import React from 'react';
import './style.css'; // optional, for styling
import { GenericObject } from '../../types/dseaseData';
interface DiseaseData {
    lga: string;
    anc4: number;
    penta: number;
    breastfed: number
    tb: number,
    malaria: number
}

interface DiseaseTableProps {
    data: DiseaseData[];
}

const getClassName = (value:any) => {
    if (value === 0) {
      return 'green';
    } else if (value >= 1 && value <= 2) {
      return 'yellow';
    } else if (value > 2 && value <= 1000) {
      return 'red';
    }
    return '';
  };
const NonHIVTable: React.FC<GenericObject> = ({ data }) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>LGA</th>
                        <th>Measles Suspected Cases</th>
                        <th>CellowFever Suspected Cases</th>
                        <th>Cholera Suspected Cases</th>
                        <th>Monkey Pox Suspected Cases</th>
                        <th>lassa Fever suspected Cases</th>


                    </tr>
                </thead>
                <tbody>
                    {data.map((item: any, index: any) => (
                        <tr key={index}>
                            <td >{item.lga}</td>
                            <td className={getClassName(item.measles.confirmedCases)}>{item.measles.suspectedCases}/ (C:{item.measles.confirmedCases})</td>
                            <td className={getClassName(item.yellowFever.confirmedCases)}>{item.yellowFever.suspectedCases} (C:{item.yellowFever.confirmedCases})</td>
                            <td className={getClassName(item.choleraCascade.confirmedCases)}>{item.choleraCascade.suspectedCases} (C:{item.choleraCascade.confirmedCases})</td>
                            <td  className={getClassName(item.monkeyPox.confirmedCases)}>{item.monkeyPox.suspectedCases} (C:{item.monkeyPox.confirmedCases})</td>
                            <td className={getClassName(item.lassa.confirmedCases)}>{item.lassa.suspectedCases} (C:{item.lassa.confirmedCases})</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NonHIVTable;
