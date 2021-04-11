/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { MERGE_AQI_DATA } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  airQualityStats: {},
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case MERGE_AQI_DATA:
        const timestamp = Date.now();
        action.payload.forEach(data => {
          if (!draft.airQualityStats[data.city]) {
            draft.airQualityStats[data.city] = [];
          }

          draft.airQualityStats[data.city].push({
            ...data,
            timestamp,
          });
        });
        break;
    }
  });

export default appReducer;
