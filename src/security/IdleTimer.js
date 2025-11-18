import { AppState } from 'react-native';

let lastActivityTime = Date.now();
let logoutCallback = null;

// const IDLE_LIMIT = 2 * 60 * 1000; // 2 minutes

const IDLE_LIMIT = 5000; // 2 minutes

export function initIdleTimer(onLogout) {

    console.log("play logout"); 
    

  logoutCallback = onLogout;

  // app foreground/background tracking
  AppState.addEventListener("change", (state) => {
    if (state === "active") {
      resetActivity();
    }
  });

  // check every 3 seconds
  setInterval(() => {
    const now = Date.now();
    if (now - lastActivityTime > IDLE_LIMIT) {
      logoutCallback && logoutCallback();
    }
  }, 3000);
}

export function resetActivity() {
  lastActivityTime = Date.now();
}

