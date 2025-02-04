import { v4 as uuidv4 } from 'uuid';
import { DeviceInfo, LocationInfo, PageVisit, PerformanceMetrics, StatisticsAggregation } from '../Models/Statistics';
import { getBaseApi } from './BaseAPIHelper';

const baseStatistics = getBaseApi() + '/statistics';
let currentSessionId: string | null = null;

const getBrowserInfo = (): DeviceInfo => {
  const ua = navigator.userAgent;
  const browserRegex = /(chrome|safari|firefox|edge|opera(?=\/))\/?\s*(\d+)/i;
  const match = ua.match(browserRegex);
  
  return {
    browser: match?.[1] || 'unknown',
    browserVersion: match?.[2] || 'unknown',
    os: navigator.platform,
    deviceType: /Mobile|Android|iPhone|iPad/i.test(ua) 
      ? (/iPad|Android/i.test(ua) ? 'tablet' : 'mobile')
      : 'desktop',
    screenResolution: `${window.screen.width}x${window.screen.height}`
  };
};

const getPerformanceMetrics = (): PerformanceMetrics => {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  return {
    pageLoadTime: navigation.loadEventEnd - navigation.startTime,
    timeToInteractive: performance.now()
  };
};

const getLocationInfo = async (): Promise<LocationInfo> => {
  try {
    const response = await fetch(`${baseStatistics}/location`);
    return await response.json();
  } catch (error) {
    console.error('Error getting location:', error);
    return {
      country: 'Unknown',
      city: 'Unknown',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  }
};

export const initializeSession = () => {
  if (!currentSessionId) {
    currentSessionId = sessionStorage.getItem('sessionId') || uuidv4();
    sessionStorage.setItem('sessionId', currentSessionId);
  }
  return currentSessionId;
};

export const trackPageVisit = async (
  route: string,
  previousRoute: string | null = null
): Promise<void> => {
  try {
    const sessionId = initializeSession();
    const locationInfo = await getLocationInfo();

    const pageVisit: PageVisit = {
      route,
      timestamp: new Date().toISOString(),
      sessionId,
      timeSpent: 0, // This will be updated when leaving the page
      previousRoute,
      deviceInfo: getBrowserInfo(),
      locationInfo,
      performanceMetrics: getPerformanceMetrics()
    };

    await fetch(`${baseStatistics}/visit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pageVisit)
    });
  } catch (error) {
    console.error('Error tracking page visit:', error);
  }
};

export const updateTimeSpent = async (route: string, timeSpent: number): Promise<void> => {
  try {
    await fetch(`${baseStatistics}/time`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId: currentSessionId,
        route,
        timeSpent
      })
    });
  } catch (error) {
    console.error('Error updating time spent:', error);
  }
};

export const getStatistics = async (): Promise<StatisticsAggregation> => {
  try {
    const response = await fetch(baseStatistics);
    return await response.json();
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }
};
