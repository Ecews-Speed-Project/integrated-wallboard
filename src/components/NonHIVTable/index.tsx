import React from 'react';
import './style.css'; // optional, for styling
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
const NonHIVTable: React.FC<DiseaseTableProps> = ({ data }) => {
   

    return (
        <div className="table-responsive">
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>LGA</th>
                        <th>ANC4/ ANC1</th>
                        <th>Penta 3</th>
                        <th>Exclusively Breastfed</th>
                        <th>Screen for TB</th>
                        <th>Tested for malaria</th>

                    </tr>
                </thead>
                <tbody>
                    {data.map((item: any, index: any) => (
                        <tr key={index}>
                            <td >{item.lga}</td>
                            <td className={getClassName(item.anc4)}>{item.anc4}</td>
                            <td className={getClassName(item.penta)}>{item.penta}</td>
                            <td className={getClassName(item.breastfed)}>{item.breastfed}</td>
                            <td className={getClassName(item.breastfed)}>{item.breastfed}</td>
                            <td  className={getClassName(item.breastfed)}>{item.breastfed}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NonHIVTable;
