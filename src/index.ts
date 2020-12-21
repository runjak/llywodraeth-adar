import { main as chromeMain } from './chrome';
import { startFfmpegServer } from './ffmpeg';

const second = 1000;
const minute = 60 * second;

const url = process.env['START_URL'];

(async () => {
  console.log('starting ffmpegServer');
  const stopFfmpegServer = startFfmpegServer();
  console.log('testing chromeMain.');
  await chromeMain(url, minute);
  console.log('stopping ffmpegServer');
  await stopFfmpegServer();
  console.log('done.')
  process.exit(0);
})();
