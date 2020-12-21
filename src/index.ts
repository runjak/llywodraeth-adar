import { main as chromeMain } from './chrome';

const second = 1000;
const minute = 60 * second;

(async () => {
  console.log('testing chromeMain.');
  await chromeMain('https://chaotikum.org/', minute);
  console.log('test done.');
})();
