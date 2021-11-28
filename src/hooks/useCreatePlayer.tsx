import {useAudioHelper} from '../helpers/audo-helper';

const useCreatePlayer = () => {
  const player = useAudioHelper({
    timeRate: 15,
    isLogStatus: true,
  });
  return player;
};
export default useCreatePlayer;
