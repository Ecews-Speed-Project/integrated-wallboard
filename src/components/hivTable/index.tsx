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
    if (value > 100) {
      return 'green';
    } else if (value > 50 && value <= 80) {
      return 'yellow';
    } else if (value <= 50) {
      return 'red';
    }
    return '';
  };
const HIVTable: React.FC<GenericObject> = ({ data }) => {
   // console.log(data)

    return (
        <div className="table-responsive">
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>LGA</th>
                        <th>Treatment Staturation</th>
                        <th>Unique Patients</th>
                        <th>Suppressed Viralload</th>
                        <th>Patient with BP {'>'} 40</th>
                        <th>Diabetics</th>

                    </tr>
                </thead>
                <tbody>
                    {data.map((item: any, index: any) => (
                        <tr key={index}>
                            <td >{item.lga}</td>
                            <td className={getClassName(item.staturation)}>{item.staturation}</td>
                            <td className={getClassName(item.uniquePatients)}>{item.uniquePatients}</td>
                            <td className={getClassName(item.suppressedViralload)}>{item.suppressedViralload}</td>
                            <td className={getClassName(item.highBp)}>{item.highBp}</td>
                            <td  className={getClassName(item.diabetics)}>{item.diabetics}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HIVTable;
