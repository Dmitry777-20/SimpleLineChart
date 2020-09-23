const {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = Recharts;
const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];
let pv = data.map(function(data){
  return data.pv;
});
let sumPv = 0,
    avgPv = 0,
    stddevPv = 0;
for (let i = 0; i < pv.length; i++) {
  sumPv += pv[i];
};
avgPv = sumPv / (pv.length + 1);
for (let i = 0; i < pv.length; i++) {
    stddevPv += Math.pow((pv[i] - avgPv), 2);
};
stddevPv = Math.sqrt(stddevPv / 8);



let xPv = 237-((avgPv - stddevPv)/ 10000 * 237);

let yPv = 237 - ((avgPv + stddevPv)/ 10000 * 237);




let uv = data.map(function(data){
  return data.uv;
});
let sumUv = 0,
    avgUv = 0,
    stddevUv = 0;
for (let i = 0; i < uv.length; i++) {
  sumUv += uv[i];
};
avgUv = sumUv / (uv.length + 1);
for (let i = 0; i < uv.length; i++) {
    stddevUv += Math.pow((uv[i] - avgUv), 2);
};
stddevUv = Math.sqrt(stddevUv / 8);

let xUv = 100 - ((avgUv - stddevUv)/ 4000 * 100);

let yUv =  100 - ((avgUv + stddevUv)/ 4000 * 100);

const SimpleLineChart = React.createClass({
  render () {
    return (
      <LineChart width={600} height={300} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />       
       <pattern id="patternPv"
          width="100%" height="100%">            
              <rect x="0" y="0" width="100%" height="100%" fill="red"/>
              <rect x="00" y={yPv} width="100%" height={xPv} fill="#8884d8"/>
       </pattern>
       
       
       <pattern id="patternUv"
          width="100%" height="100%">            
              <rect x="0" y="0" width="100%" height="100%" fill="red"/>
              <rect x="00" y={yUv} width="100%" height={xUv} fill="#82ca9d"/>             
       </pattern>       

       <Line type="monotone" dataKey="pv" stroke="url(#patternPv)"  activeDot={{r: 8}}/>
       <Line type="monotone" dataKey="uv" stroke="url(#patternUv)" />
      </LineChart>
    );
  }
})

ReactDOM.render(
  <SimpleLineChart />,
  document.getElementById('container')
);

/*http://recharts.org/en-US/examples/SimpleLineChart*/