const initialState = {
  backgroundAudioPlaying: false
};

const playBackgroundAudio = (state = initialState, action) => {
  switch (action.type) {
    case "PLAY_BACKGROUND_AUDIO":
      return { ...state, backgroundAudioPlaying: action.payload };
    default:
      return state;
  }
};

export default playBackgroundAudio;
