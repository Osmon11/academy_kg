declare global {
  interface Window {
    YT: {
      PlayerState: {
        BUFFERING: 3;
        CUED: 5;
        ENDED: 0;
        PAUSED: 2;
        PLAYING: 1;
        UNSTARTED: -1;
      };
    };
  }
}
