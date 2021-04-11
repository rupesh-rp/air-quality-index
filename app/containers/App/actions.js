import { MERGE_AQI_DATA } from './constants';

export function mergeAQIData(payload) {
  return {
    type: MERGE_AQI_DATA,
    payload,
  };
}
