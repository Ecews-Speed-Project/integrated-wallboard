// ** Third Party Components
import classnames from 'classnames'
import { Calendar, User, Box, DollarSign, Home } from 'react-feather'
import FeatherIcon from 'feather-icons-react'
// ** Custom Components

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'

type ReportProps = {

  cols?: any;
  dataSet?: [];
  lineChatSeries?: [];
};

const NotificationCard: React.FC<ReportProps> = ({cols, dataSet }) => {


  const renderData = () => {
    return dataSet!.map((item: any, index: any) => {
      const colMargin = Object.keys(cols)
      const margin = index === 2 ? 'sm' : colMargin[0]
      return (
        <Col
          key= { index }
      {...cols}
  className = {
    classnames({
      [`mb-2 mb-${margin}-0`]: index !== dataSet!.length - 1
})}
        >
  <div className='d-flex align-items-center' >
   {/*  <Avatar color={ item.color } icon = { item.icon } className = 'me-2' /> */}
      <div className='my-auto' >
        <h4 className='fw-bolder mb-0 annoucement-title' > { item.title } </h4>
          < CardText className = 'font-small-3 mb-0 annoucement-subtitle' > { item.subtitle } </CardText>
            </div>
            </div>
            </Col>
      )
    })
  }

return (
  <Card className= 'card-statistics' style = {{
  backgroundColor: 'rgb(234 235 232)',
  //  borderRradius: "10px"
}}>
  <CardHeader className='custom-card-header' >
    <CardTitle tag='h4' > Notifications </CardTitle>
      </CardHeader>
      < CardBody className = 'statistics-body' >
        <Row>{ renderData() } </Row>
        </CardBody>
        </Card>
  )
}

export default NotificationCard
