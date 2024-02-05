import { BarChart } from '@mui/x-charts/BarChart';

function dataNames (choice, props) {
    console.log(props)
    let arrayDataNames = [];
    
    for (let i=0; i<props.transactionsData.length; i++) {
        if (choice) {
            if( props.transactionsData[i].date == 0) {
                arrayDataNames.push("")
            } else {
                arrayDataNames.push(props.transactionsData[i].date)
            }
        
        } else {
            arrayDataNames.push(props.transactionsData[i].amount)
        }
    }
    console.log(arrayDataNames)
    return arrayDataNames
}

export default function BasicBars(props) {
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: dataNames(true, props) }]}
      series={[{ data: dataNames(false, props) }]}
      width={1000}
      height={400}
    />
  );
}