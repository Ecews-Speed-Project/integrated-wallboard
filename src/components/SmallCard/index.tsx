import {FunctionComponent} from "react";

type SmallCardProps = {

    title?: String;
    value?: String;
};

const SmallCard: FunctionComponent<SmallCardProps> = ({
    title,
    value,
}) => {
    return (
        <div className="col-12 col-md-12 col-sm-12 card mb-4 ms-2 small-card">
            <div className="card-body">
                <h5 className="small-card-title">{title}</h5>
                <p className="small-card-text">{value}</p>
            </div>
        </div>
    );
};
export default SmallCard;
