import { FunctionComponent } from "react";
import '../../App.css';

type SmallCardProps = {
    state?: String;
    page?: String;
};

const BreadCrumb: FunctionComponent<SmallCardProps> = ({
    state,
    page,
}) => {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><img className='icons5' alt="" src="icons/home.svg" /><b>({(state !== "") ?  state : 'All States'})</b></li>
                <li className="breadcrumb-item">{page}</li>
            </ol>
        </nav>
    );
};
export default BreadCrumb;
