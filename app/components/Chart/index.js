import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  Line,
} from 'recharts';

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={400}>
    <LineChart
      data={data}
      margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
    >
      <CartesianGrid />
      <XAxis dataKey="time" domain={['dataMin', 'dataMax']}>
        <Label
          value="Time"
          position="bottom"
          style={{ textAnchor: 'middle' }}
        />
      </XAxis>
      <YAxis>
        <Label
          value="Aiq Quality Index"
          position="left"
          angle={-90}
          style={{ textAnchor: 'middle' }}
        />
      </YAxis>
      <Tooltip />
      <Line
        dataKey="aqi"
        name="Air Quality Index"
        unit=" units"
        dot={false}
        type="natural"
      />
    </LineChart>
  </ResponsiveContainer>
);

export default Chart;
