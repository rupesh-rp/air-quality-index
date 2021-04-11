import { createSelector } from 'reselect';
import dayJs from 'dayjs';

const selectRouter = state => state.router;
const selectApp = state => state.app;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectAirQualityStats = () =>
  createSelector(
    selectApp,
    appState => appState.airQualityStats,
  );

const makeSelectAirQualityStatsRecent = () =>
  createSelector(
    selectApp,
    appState =>
      Object.values(appState.airQualityStats).map(stats => {
        const recentStat = stats[stats.length - 1];
        const timestamp = dayJs(recentStat.timestamp);
        const minutesAgo = dayJs().diff(timestamp, 'minute');
        let lastUpdatedAt = `At ${timestamp.format('hh:mm A')}`;
        if (minutesAgo <= 1) {
          lastUpdatedAt = `A few seconds ago`;
        } else if (minutesAgo < 60) {
          lastUpdatedAt = `${minutesAgo} minutes ago`;
        }
        return {
          ...recentStat,
          aqiFormatted: Number(recentStat.aqi.toFixed(2)),
          lastUpdatedAt,
        };
      }),
  );

export {
  makeSelectAirQualityStats,
  makeSelectAirQualityStatsRecent,
  makeSelectLocation,
};
