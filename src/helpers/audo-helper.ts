import SoundPlayer from 'react-native-sound';
import React from 'react';

import {Station} from 'radio-browser-api';

type AudioStatusType =
  | 'loading'
  | 'success'
  | 'error'
  | 'play'
  | 'pause'
  | 'next'
  | 'previous'
  | 'stop';

interface IUseAudioHelper {
  timeRate?: number; // seconds
  isLogStatus?: boolean;
}

export type SoundFileType =
  | {
      type: 'app-bundle';
      name: string;
      path: string;
      basePath: string;
    }
  | {
      type: 'network';
      name: string;
      path: string;
    }
  | {
      type: 'directory';
      name: string;
      path: NodeRequire;
    };

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

const queue: SoundFileType[] = [];

export function useAudioHelper(
  request: IUseAudioHelper = {
    isLogStatus: false,
    timeRate: 15,
  },
) {
  // const [listSounds, setListSounds] = React.useState(queue);
  const [timeRate, setTimeRate] = React.useState(request.timeRate); // seconds
  const [status, setStatus] = React.useState<AudioStatusType>('loading');
  const [errorMessage, setErrorMessage] = React.useState('');

  const [currentTime, setCurrentTime] = React.useState(0);

  const [duration, setDuration] = React.useState(0);
  const [player, setPlayer] = React.useState<SoundPlayer>(null);

  const playSoundNow = (station: Station) => {
    console.log('audio-helper station: ', station);
    queue.unshift({
      type: 'network',
      path: station.urlResolved,
      name: station.name,
    });
    if (queue.length > 1) {
      queue.pop();
    }
    console.log(queue);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (player && status === 'play') {
        player.getCurrentTime((seconds: number) => {
          setCurrentTime(seconds);
        });
      }
    }, 100);

    return () => clearInterval(interval);
  });

  const [speed, setSpeed] = React.useState(1);
  function changeSpeed(value: number) {
    if (player && value > 0 && value <= 2) {
      player.setSpeed(value);
      setSpeed(value);
    }
  }

  function initialize() {
    setStatus('loading');
    if (queue.length > 0) {
      if (player) {
        player.release();
      }

      // eslint-disable-next-line no-shadow
      const callback = (error: any, player: SoundPlayer) => {
        if (error) {
          setStatus('error');
          setErrorMessage(error.message);
        } else {
          setStatus('success');
          setErrorMessage('');
        }
        player.setSpeed(speed);
        setDuration(player.getDuration());
        if (!player.isPlaying()) {
          play(player);
        }
      };

      const currentAudio = queue[index];
      // If the audio is a 'require' then the second parameter must be the callback.

      //TODO: kiedy player sie tworzy i dlugo czeka na odpowiedz radia a w tym czasie wlaczymy drugie radio tworza sie dwa playery na raz - zajac sie tym problemem!!!!!!!!!
      let newPlayer: SoundPlayer = null;
      switch (currentAudio.type) {
        default:
          break;
        case 'app-bundle':
          newPlayer = new SoundPlayer(
            currentAudio.path,
            currentAudio.basePath,
            error => callback(error, newPlayer),
          );
          break;
        case 'network':
          newPlayer = new SoundPlayer(currentAudio.path, null, error =>
            callback(error, newPlayer),
          );
          break;
        case 'directory':
          newPlayer = new SoundPlayer(currentAudio.path, error =>
            callback(error, newPlayer),
          );
          break;
      }
      if (newPlayer) {
        //TODO: jak cos by niedzialalo z odtwarznaiem to moze przez to
        setPlayer(newPlayer);
      }
    }
  }

  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    initialize();
  }, [index]);

  const [isShuffle, setIsShuffle] = React.useState(false);
  function shuffle() {
    setIsShuffle(!isShuffle);
  }
  //TODO: wylaczyc log status
  React.useEffect(() => {
    if (request.isLogStatus === true) {
      switch (status) {
        default:
          break;
        case 'loading':
          console.log('loading...');
          break;
        case 'next':
          console.log('next...');
          break;
        case 'pause':
          console.log('pause...');
          break;
        case 'play':
          console.log('play...');
          break;
        case 'previous':
          console.log('previous...');
          break;
        case 'stop':
          console.log('stop...');
          break;
      }
    }
  }, [request.isLogStatus, status]);

  function playComplete(isEnd: boolean) {
    if (isEnd === true) {
      if (isLoop === false) {
        next();
      } else {
        repeat();
      }
    }
  }

  function repeat() {
    setCurrentTime(0);
    play(player);
  }

  function play(player: SoundPlayer) {
    if (player) {
      if (isMuted === true) {
        changeVolume(player, 0);
      }
      player.play(playComplete);
      setStatus('play');
    }
  }

  function pause() {
    if (player) {
      player.pause();
      setStatus('pause');
    }
  }

  function stop() {
    if (player) {
      player.stop();
      setStatus('stop');
    }
  }

  const [remainingIndices, setRemainingIndices] = React.useState(
    [...Array(queue.length).keys()].filter(value => value !== index),
  );
  React.useEffect(() => {
    setRemainingIndices(remainingIndices.filter(value => value !== index));
  }, [index]);

  function next() {
    if (player && queue.length) {
      player.release();
      setCurrentTime(0);
      setStatus('next');

      if (isShuffle === true) {
        let newRemainingIndices = shuffleArray(
          remainingIndices.length === 0
            ? [...Array(queue.length).keys()].filter(value => value !== index)
            : remainingIndices,
        );
        setRemainingIndices(newRemainingIndices);
        setIndex(newRemainingIndices[0]);
      } else {
        setIndex((index + 1) % queue.length);
      }
    }
  }

  function previous() {
    if (player && index > 0) {
      player.release();
      setCurrentTime(0);
      setStatus('previous');
      setIndex(index - 1);

      if (isShuffle === true) {
        let newRemainingIndices = shuffleArray(
          remainingIndices.length === 0
            ? [...Array(queue.length).keys()].filter(value => value !== index)
            : remainingIndices,
        );
        setRemainingIndices(newRemainingIndices);
        setIndex(newRemainingIndices[0]);
      } else {
        setIndex(index - 1 >= 0 ? index - 1 : queue.length - 1);
      }
    }
  }

  function increaseTime() {
    if (player) {
      player.getCurrentTime(seconds => {
        if (seconds + timeRate < duration) {
          seekToTime(seconds + timeRate);
        } else {
          seekToTime(duration);
        }
      });
    }
  }

  function decreaseTime() {
    if (player) {
      player.getCurrentTime(seconds => {
        if (seconds - timeRate > 0) {
          seekToTime(seconds - timeRate);
        } else {
          seekToTime(0);
        }
      });
    }
  }

  function seekToTime(seconds: number) {
    if (player) {
      player.setCurrentTime(seconds);
      setCurrentTime(seconds);
    }
  }

  const [isLoop, setIsLoop] = React.useState(false);
  function loop() {
    setIsLoop(!isLoop);
  }

  const [volume, setVolume] = React.useState(100); // percent
  const [previousVolume, setPreviousVolume] = React.useState(volume);
  function changeVolume(player: SoundPlayer, volume: number) {
    if (player && volume >= 0 && volume <= 100) {
      player.setVolume(volume / 100.0);
      setVolume(volume);
    }
  }

  const [isMuted, setIsMuted] = React.useState(false);
  React.useEffect(() => {
    if (volume > 0 && isMuted === true) {
      setIsMuted(false);
    }
  }, [volume]);

  function mute() {
    if (isMuted === false) {
      setIsMuted(true);
      setPreviousVolume(volume);
      changeVolume(player, 0);
    }
  }

  function unmute() {
    if (isMuted === true) {
      setIsMuted(false);
      changeVolume(player, previousVolume);
    }
  }

  function formatTimeString(value: number) {
    return new Date(value * 1000).toISOString().substr(11, 8);
  }

  function getDurationString() {
    return formatTimeString(duration);
  }

  function getCurrentTimeString() {
    return formatTimeString(currentTime);
  }

  function getCurrentAudioName() {
    return index > 0 ? queue[index].name : 'No tracks';
  }

  function isDisabledButtonPlay() {
    return status === 'loading' || status === 'play';
  }

  function isDisabledButtonPause() {
    return status === 'loading' || status === 'pause' || status === 'stop';
  }

  function isDisabledButtonStop() {
    return status === 'loading' || status === 'stop';
  }

  function isDisabledButtonNext() {
    if (queue.length <= 1) {
      return false;
    }
    return status === 'loading' || index === queue.length - 1;
  }

  function isDisabledButtonPrevious() {
    if (queue.length <= 1) {
      return false;
    }
    return status === 'loading' || index === 0;
  }

  function isPlaying() {
    return player ? player.isPlaying() : false;
  }

  function isLoaded() {
    return player ? player.isLoaded() : false;
  }

  function release() {
    if (player) {
      player.release();
    }
  }

  function getNumberofChanels() {
    if (player) {
      player.getNumberOfChannels();
    }
  }

  return {
    play: () => play(player),
    pause,
    stop,
    next,
    previous,
    increaseTime,
    decreaseTime,
    seekToTime,
    setSpeed: (speed: number) => changeSpeed(speed),
    shuffle,
    loop,
    mute,
    unmute,
    setVolume: (volume: number) => changeVolume(player, volume),
    status,
    duration,
    currentTime,
    durationString: getDurationString(),
    currentTimeString: getCurrentTimeString(),
    currentAudioName: getCurrentAudioName(),
    isDisabledButtonPlay: isDisabledButtonPlay(),
    isDisabledButtonPause: isDisabledButtonPause(),
    isDisabledButtonStop: isDisabledButtonStop(),
    isDisabledButtonNext: isDisabledButtonNext(),
    isDisabledButtonPrevious: isDisabledButtonPrevious(),
    timeRate,
    speed,
    isShuffle,
    errorMessage,
    isLoop,
    isMuted,
    volume,
    playSoundNow,
    isPlaying,
    isLoaded,
    initialize,
    release,
    getNumberofChanels,
  };
}
