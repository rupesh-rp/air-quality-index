/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import TableContainer from '@material-ui/core/TableContainer';
import styled from 'styled-components';

import dayjs from 'dayjs';
import messages from './messages';
import {
  makeSelectAirQualityStats,
  makeSelectAirQualityStatsRecent,
} from '../App/selectors';
import Table from '../../components/Table';
import Chart from '../../components/Chart';

const MainContainer = styled.div`
  padding: 0 20px 20px 20px;
`;

const ChartContainer = styled.div`
  @media (min-width: 960px) {
    width: 50%;
    min-width: 480px;
    margin: auto;
  }
`;

const Content = styled.div`
  display: flex;
  @media (max-width: 960px) {
    display: block;
  }
`;

const PromptText = styled.div`
  text-align: center;
  @media (max-width: 960px) {
    padding-top: 20px;
    text-align: left
  }
`;

const getCellProps = (cellInfo, selectedRow) => {
  let backgroundColor;
  if (cellInfo.column.id === 'city' && cellInfo.value === selectedRow) {
    return {
      style: {
        textDecoration: 'underline',
      },
    };
  }
  if (cellInfo.column.id !== 'aqiFormatted') {
    return {};
  }

  if (cellInfo.value <= 50) {
    backgroundColor = '#54a84e';
  } else if (cellInfo.value <= 100) {
    backgroundColor = '#a3c853';
  } else if (cellInfo.value <= 200) {
    backgroundColor = '#fff832';
  } else if (cellInfo.value <= 300) {
    backgroundColor = '#f29c32';
  } else if (cellInfo.value <= 400) {
    backgroundColor = '#e93f33';
  } else if (cellInfo.value <= 500) {
    backgroundColor = '#af2d24';
  }
  return {
    style: {
      backgroundColor,
    },
  };
};

const getRowProps = () => ({
  style: {
    cursor: 'pointer',
  },
});

const getToggleRowSelectedProps = selectRow => row => ({
  onClick: () => {
    selectRow(row.original.city);
  },
});

const preProcessChartData = measurements =>
  measurements.map(({ aqi, timestamp }) => ({
    aqi: Number(aqi.toFixed(2)),
    timestamp,
    time: dayjs(timestamp).format('hh:mm:ss A'),
  }));

const HomePage = ({ airQualityStats, recentAirQualityStats }) => {
  const columns = React.useMemo(() => [
    {
      Header: 'City',
      accessor: 'city',
      className: 'user',
      sortType: 'basic',
      style: {
        fontWeight: 'bolder',
      },
    },
    {
      Header: 'AQI',
      accessor: 'aqiFormatted',
      className: 'user',
      sortType: 'basic',
      style: {
        fontWeight: 'bolder',
      },
    },
    {
      Header: 'Last Updated at',
      accessor: 'lastUpdatedAt',
      className: 'user',
      disableSortBy: true,
    },
  ]);

  const [selectedRow, selectRow] = React.useState(null);

  return (
    <MainContainer>
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
      <CssBaseline />
      <Content>
        <Paper style={{ width: '50%', minWidth: '480px' }}>
          <TableContainer style={{ maxHeight: 'calc(85vh - 20px)' }}>
            <Table
              columns={columns}
              data={recentAirQualityStats}
              getCellProps={getCellProps}
              getRowProps={getRowProps}
              getToggleRowSelectedProps={getToggleRowSelectedProps(selectRow)}
              selectedRow={selectedRow}
            />
          </TableContainer>
        </Paper>
        <ChartContainer>
          {selectedRow ? (
            <Chart data={preProcessChartData(airQualityStats[selectedRow])} />
          ) : (
            <PromptText>Click on any city to view its graph</PromptText>
          )}
        </ChartContainer>
      </Content>
    </MainContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  airQualityStats: makeSelectAirQualityStats(),
  recentAirQualityStats: makeSelectAirQualityStatsRecent(),
});

const withConnect = connect(
  mapStateToProps,
  () => ({}),
);

export default withConnect(HomePage);
