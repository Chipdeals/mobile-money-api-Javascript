import mixpanel from 'mixpanel-browser';
import { Commons } from './commons';

const liveMixpanelKey = 'b385c1045e069b2cb205e6c9ded202ae';
const devMixpanelKey = 'fbc2da6f3739ddd834cc939f81062aa0';

function getMixpanelKey() {
  if (Commons.isLiveEnv()) {
    return liveMixpanelKey;
  }
  return devMixpanelKey;
}

class AnalyticsUtils {
  static initAnalytics(isFirsVisit) {
    window.chipdeals.mixpanel = mixpanel;
    window.chipdeals.mixpanel.init(getMixpanelKey(), {
      debug: !Commons.isLiveEnv(),
    });
    window.chipdeals.mixpanel.track('website visit');
    if (isFirsVisit) {
      window.chipdeals.mixpanel.track('website first visit');
    }
  }

  static catchEvent(eventName, eventData) {
    window.chipdeals.mixpanel.track(eventName, eventData);
  }
}

export { AnalyticsUtils };
