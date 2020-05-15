import React from 'react';
import { Factors } from 'src/types/factors-types';
import Chart from 'react-google-charts';

interface FactorsGraphProps {
  factors: Factors[];
}

export const FactorsGraph = (props: FactorsGraphProps) => {
  const { factors } = props;
  const graphData = [];
  const lastFactors = factors.slice(Math.max(factors.length - 10, 0));

  graphData.push(['Día', '', { role: 'interval' }, { role: 'interval' }, { role: 'style' }]);

  lastFactors.map(dayFactor => {
    graphData.push([
      dayFactor.date,
      dayFactor.factor,
      dayFactor.high,
      dayFactor.low,
      dayFactor.factor < 1 ? '#8bc34a' : '#e06c75',
    ]);
  });

  return (
    <section className="graph">
      <Chart
        width={'100%'}
        height={'250px'}
        chartType="LineChart"
        loader={<div className="chart-box center animation animatedBox"></div>}
        data={graphData}
        options={{
          chartArea: { width: '80%', height: '90%' },
          hAxis: { title: 'Estados', textStyle: { color: '#abb2bf' } },
          vAxis: {
            title: 'R0',
            baseline: 1,
            minValue: 0,
            maxValue: 2,
            textStyle: { color: '#abb2bf' },
            baselineColor: 'yellow',
          },
          pointSize: 0,
          intervals: {
            style: 'area',
            fillOpacity: 0.3,
            color: '#c678dd',
          },
          crosshair: { orientation: 'both', trigger: 'both' },
          backgroundColor: '#21252b',
          curveType: 'function',
          legend: 'none',
          animation: {
            duration: 200,
            easing: 'inAndOut',
          },
        }}
      />
    </section>
  );
};
