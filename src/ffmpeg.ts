import { spawn } from 'child_process';

/*
  Heavily inspired by https://github.com/jibon57/bbb-recorder/blob/master/ffmpegServer.js
*/

const command = 'ffmpeg';
const args = [
  // FFmpeg will read input video from STDIN
  '-i', '-',

  // If we're encoding H.264 in-browser, we can set the video codec to 'copy'
  // so that we don't waste any CPU and quality with unnecessary transcoding.
  '-vcodec', 'copy',

  // use if you need for smooth youtube publishing. Note: will use more CPU
  //'-vcodec', 'libx264',
  //'-x264-params', 'keyint=120:scenecut=0',

  //No browser currently supports encoding AAC, so we must transcode the audio to AAC here on the server.
  '-acodec', 'aac',

  // remove background noise. You can adjust this values according to your need
  '-af', 'highpass=f=200, lowpass=f=3000',

  // This option sets the size of this buffer, in packets, for the matching output stream
  '-max_muxing_queue_size', '99999',

  // better to use veryfast or fast
  '-preset', 'veryfast',

  //'-vf', 'mpdecimate', '-vsync', 'vfr',
  //'-vf', 'mpdecimate,setpts=N/FRAME_RATE/TB',

  // FLV is the container format used in conjunction with RTMP
  '-f', 'flv',

  // The output RTMP URL.
  // For debugging, you could set this to a filename like 'test.flv', and play
  // the resulting file with VLC.
  process.env['RTMP_URL'],
];

type StartParameters = {
  onStdInErr: (error: Error) => unknown,
  onStdErrErr: (data: unknown) => unknown,
  onClose: (code: number, signal: NodeJS.Signals) => unknown,
};

export const start = (params: StartParameters) => {
  const ffmpeg = spawn(command, args);

  ffmpeg.on('close', params.onClose);
  ffmpeg.stdin.on('error', params.onStdInErr);
  ffmpeg.stderr.on('data', params.onStdErrErr);

  return {
    write: (data) => ffmpeg.stdin.write(data),
    kill: () => ffmpeg.kill('SIGINT'),
  };
};
