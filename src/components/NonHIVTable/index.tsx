import React, { useState } from 'react';
import './style.css'; // Optional, for styling
import ReactPaginate from 'react-paginate';

interface DiseaseData {
    lga: string;
    measles: { suspectedCases: number; confirmedCases: number };
    yellowFever: { suspectedCases: number; confirmedCases: number };
    choleraCascade: { suspectedCases: number; confirmedCases: number };
    monkeyPox: { suspectedCases: number; confirmedCases: number };
    lassa: { suspectedCases: number; confirmedCases: number };
}

interface DiseaseTableProps {
    data: DiseaseData[];
}

const getClassName = (value: any) => {
    if (value === 0) {
        return 'green';
    } else if (value >= 1 && value <= 2) {
        return 'yellow';
    } else if (value > 2 && value <= 1000) {
        return 'red';
    }
    return '';
};

const NonHIVTable: React.FC<DiseaseTableProps> = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 20;

    // Logic for displaying current page data
    const offset = currentPage * itemsPerPage;
    const currentPageData = data.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(data.length / itemsPerPage);

    const handlePageClick = (event: { selected: number }) => {
        setCurrentPage(event.selected);
    };

    return (
        <div>
             {/* Pagination */}
             <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={'pagination-container'}
                previousClassName={'pagination-previous'}
                nextClassName={'pagination-next'}
                pageClassName={'pagination-page'}
                pageLinkClassName={'pagination-link'}
                activeClassName={'active'}
                disabledClassName={'disabled'}
                breakLabel={'...'}
                breakClassName={'pagination-break'}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
            />
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>LGA</th>
                            <th>Measles Suspected Cases</th>
                            <th>Yellow Fever Suspected Cases</th>
                            <th>Cholera Suspected Cases</th>
                            <th>Monkey Pox Suspected Cases</th>
                            <th>Lassa Fever Suspected Cases</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPageData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.lga}</td>
                                <td className={getClassName(item.measles.confirmedCases)}>
                                    {item.measles.suspectedCases}/ (C:{item.measles.confirmedCases})
                                </td>
                                <td className={getClassName(item.yellowFever.confirmedCases)}>
                                    {item.yellowFever.suspectedCases} (C:{item.yellowFever.confirmedCases})
                                </td>
                                <td className={getClassName(item.choleraCascade.confirmedCases)}>
                                    {item.choleraCascade.suspectedCases} (C:{item.choleraCascade.confirmedCases})
                                </td>
                                <td className={getClassName(item.monkeyPox.confirmedCases)}>
                                    {item.monkeyPox.suspectedCases} (C:{item.monkeyPox.confirmedCases})
                                </td>
                                <td className={getClassName(item.lassa.confirmedCases)}>
                                    {item.lassa.suspectedCases} (C:{item.lassa.confirmedCases})
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

           
        </div>
    );
};

export default NonHIVTable;
