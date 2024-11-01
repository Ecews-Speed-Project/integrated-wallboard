
import { Settings } from 'react-feather'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Alert } from 'reactstrap'

type ReportProps = {

  categories?: any;
  stats?: [];
  lineChatSeries?: [];
};

const TXCurrLineChart: React.FC<ReportProps> = ({stats, categories, lineChatSeries }) => {


  const colorsCodes = ["#E1F396", "#59BA89", "#01575C"]
  const textColorCodes = ["#383F1C", "#FFFFFF", "#FFFFFF"]

  const renderStats = () => {  
    return  stats?.map((item:any, index:any) => {
        return (               
          <div className='me-2' key={index} 
          style={{
            width: '120px',
            background: colorsCodes[index],
            padding: '15px',
            marginBottom:'10px',
            borderRadius:'5px',
            boxShadow: '0 3px 10px rgb(0 0 0 / 20%)'
          }}
         
         >
          <CardText className='mb-50'  style={{color: textColorCodes[index]}}>{item.key}</CardText>
          <h3 className='fw-bolder'>
            <span style={{color: textColorCodes[index]}}>{item.value}</span>
          </h3>
        </div>           
        )
      })
  }

  const options = {
    chart: {
        type: 'line'
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: categories
    },
    yAxis: {
        title: {
            text: 'Active Patients'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    colors:colorsCodes,
    series: lineChatSeries
}

  return stats !== null ? (
    
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>TX_CURR Performance Trend</CardTitle>
        <Settings size={18} className='text-muted cursor-pointer' />
      </CardHeader>
      <CardBody>  
        <div className='row'> 
         
        <div className='col-md-10'>
            {lineChatSeries && <HighchartsReact  highcharts={Highcharts}  options={options} />}
         </div>
         <div className='col-md-2'>
          {renderStats()}     
         </div>
      
       </div>
      </CardBody>
    </Card>
  ) : null
}
export default TXCurrLineChart
