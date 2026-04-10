import analytics from '@react-native-firebase/analytics';

class AnalyticsService {
  async logEvent(name, params = {}) {
    try {
      await analytics().logEvent(name, params);
      // console.log(`📊 ${name}`, params);
    } catch (e) {
      console.log('❌ Analytics error:', e);
    }
  }

  async logScreen(screenName: string) {
    try {
      await analytics().logScreenView({
        screen_name: screenName,
        screen_class: screenName,
      });
    } catch (e) {}
  }

  async setUser(userId: string) {
    await analytics().setUserId(userId);
  }
}

export default new AnalyticsService();