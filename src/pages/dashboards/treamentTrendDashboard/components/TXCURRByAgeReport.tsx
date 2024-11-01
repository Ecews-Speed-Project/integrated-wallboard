// ** React Imports

// ** Third Party Components
import { Settings, Circle } from 'react-feather'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
//import {buildDonut } from  '../../../api/dashboardService'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Progress,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap'

type ReportProps = {

  title?: String;
  value?: String;
};

const TXCURRByAgeReport: React.FC<ReportProps> = () => {
/* const TXCURRByAgeReport = props => {

const renderTxcurrByAge = () => { 
    return props?.demographyStats?.map((item, index) => {
      const ageGroupVal = Object.values(item)
      return (               
        <div style={{marginBottom: '1.2rem !important'}} className='d-flex justify-content-between mb-1'  key={index}  >
        <div className='d-flex align-items-center'>
          <Circle size={15} className='text-primary' />
          <span className='fw-bold ms-75'>{Object.keys(item)}</span>
        </div>
        <span>{ageGroupVal[0][0]}</span>
        <span>{`${ageGroupVal[0][1]}%`}</span> 
      </div>
         
      )
    })
  }  */

  return (
    <Card className='card-revenue-budget'>
         <CardHeader>
        <CardTitle tag='h4'>TX_CURR by Demography</CardTitle>
        <Settings size={18} className='text-muted cursor-pointer' />
      </CardHeader>
      <CardBody>
      <Row className='mx-0'>
        <Col className='budget-wrapper' md='5' xs='12' style={{padding: '1rem 2rem', textAlign: 'center'}}>
            <p className='' style={{ textAlign:'left' }}>Age disaggregation</p>
            <div className='row'>
                  <div style={{background:"#E1F396", height:'10px', width:'20%'}}></div>   
                  <div style={{background:"#59BA89", height:'10px', width:'40%'}}></div> 
                  <div style={{background:"#01575C", height:'10px', width:'20%'}}></div> 
                  <div style={{background:"#335457", height:'10px', width:'20%'}}></div> 
            </div>
             <div className='pt-258' style={{paddingTop: '1.5rem'}}  >
             {/*    {renderTxcurrByAge()} */}
            </div>
        </Col>
      </Row>
      </CardBody>
    </Card>
  ) 
}
export default TXCURRByAgeReport;
