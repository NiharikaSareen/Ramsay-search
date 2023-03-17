//settimeout function- it will race with api call function either APi call will be made in 10 seconds or Error message will be displayed
import {
  TIMEOUT_SEC
} from "./utils.js";
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} seconds.`));
    }, s * 1000)
  })
}

//API call
export const getJSON =
  async function (url) {
    try {
      //loading api
      const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
      const data = await response.json();
      if (!response.ok) throw new Error(`(${response.status})`);
      return data;
    } catch (err) {
      throw err;
    }
  };