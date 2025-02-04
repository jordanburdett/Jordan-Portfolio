export interface DeviceInfo {
  browser: string;
  browserVersion: string;
  os: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  screenResolution: string;
}

export interface LocationInfo {
  country: string;
  city: string;
  timezone: string;
}

export interface PerformanceMetrics {
  pageLoadTime: number;  // in milliseconds
  timeToInteractive: number;  // in milliseconds
}

export interface PageVisit {
  route: string;
  timestamp: string;  // ISO string format
  sessionId: string;
  timeSpent: number;  // in seconds
  previousRoute: string | null;
  deviceInfo: DeviceInfo;
  locationInfo: LocationInfo;
  performanceMetrics: PerformanceMetrics;
}

export interface StatisticsAggregation {
  totalVisits: number;
  uniqueVisitors: number;  // based on sessionId
  averageTimeSpent: number;
  visitsByCountry: Record<string, number>;
  visitsByDevice: Record<string, number>;
  visitsByRoute: Record<string, number>;
  dailyVisits: Array<{
    date: string;
    visits: number;
  }>;
}

export const emptyStatistics: StatisticsAggregation = {
  totalVisits: 0,
  uniqueVisitors: 0,
  averageTimeSpent: 0,
  visitsByCountry: {},
  visitsByDevice: {},
  visitsByRoute: {},
  dailyVisits: []
};