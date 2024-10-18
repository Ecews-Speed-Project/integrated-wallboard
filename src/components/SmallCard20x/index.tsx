import {FunctionComponent} from "react";

type SmallCardProps = {

    title?: String;
    value?: String;
    color?:String
    fontColour?:String
    fontColourNumber?:String
};

const SmallCard24x: FunctionComponent<SmallCardProps> = ({
    title,
    value,
    color,
    fontColour,
    fontColourNumber,

}) => {
    return (
        <div 
        className={[color, "col-12 col-md-12 col-sm-12 card mb-4 ms-2 side-card-padding"].join(' ')}>
            <div className="card-body">
                <h5    className={[(fontColour ??  "small-card-title")].join(' ')} >{title}</h5>
                <p    className={[fontColourNumber ?? "small-card-text"].join(' ')} >{value}</p>
            </div>
        </div>
    );
};
export default SmallCard24x;
