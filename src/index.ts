import { start as startFfmpeg } from './ffmpeg';

const test = () => {
  const { kill } = startFfmpeg({
    onStdInErr: (error) => {
      console.log('Got error on stdIn:', error);
      kill();
    },
    onStdErrErr: (data) => {
      console.log('Got output on stdErr:', String(data));
      kill();
    },
    onClose: (code, signal) => {
      console.log('ffmpeg terminated:', { code, signal });
    },
  });

  process.on('SIGINT', () => {
    console.log('noticed SIGINT!', kill());
  });
};

test();
