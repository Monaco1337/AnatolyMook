export interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
  metadata?: Record<string, any>;
}

export interface ConversionGoal {
  id: string;
  name: string;
  type: 'pageview' | 'event' | 'duration' | 'scroll';
  value: number;
  target: string | number;
}

export class AdvancedAnalytics {
  private sessionStart: number;
  private pageViews: number = 0;
  private events: AnalyticsEvent[] = [];
  private conversions: string[] = [];

  constructor() {
    this.sessionStart = Date.now();
    this.trackPageView();
    this.setupScrollTracking();
    this.setupEngagementTracking();
  }

  trackPageView(page?: string) {
    this.pageViews++;
    const event: AnalyticsEvent = {
      category: 'PageView',
      action: 'view',
      label: page || window.location.pathname,
      metadata: {
        timestamp: Date.now(),
        referrer: document.referrer,
        sessionDuration: Date.now() - this.sessionStart
      }
    };
    this.events.push(event);
    this.sendToBackend(event);
  }

  trackEvent(event: AnalyticsEvent) {
    this.events.push(event);
    this.sendToBackend(event);
  }

  trackConversion(goalId: string, value?: number) {
    if (!this.conversions.includes(goalId)) {
      this.conversions.push(goalId);
      const event: AnalyticsEvent = {
        category: 'Conversion',
        action: goalId,
        value: value,
        metadata: {
          timestamp: Date.now(),
          sessionDuration: Date.now() - this.sessionStart,
          pageViewsBeforeConversion: this.pageViews
        }
      };
      this.events.push(event);
      this.sendToBackend(event);
    }
  }

  trackScrollDepth(depth: number) {
    const event: AnalyticsEvent = {
      category: 'Engagement',
      action: 'scroll',
      value: depth,
      metadata: {
        page: window.location.pathname,
        timestamp: Date.now()
      }
    };
    this.events.push(event);
  }

  trackTimeOnPage() {
    return Date.now() - this.sessionStart;
  }

  private setupScrollTracking() {
    let maxScroll = 0;
    const milestones = [25, 50, 75, 90, 100];
    const triggered = new Set<number>();

    window.addEventListener('scroll', () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

      if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage;
      }

      milestones.forEach(milestone => {
        if (scrollPercentage >= milestone && !triggered.has(milestone)) {
          triggered.add(milestone);
          this.trackEvent({
            category: 'Engagement',
            action: 'ScrollMilestone',
            label: `${milestone}%`,
            value: milestone
          });
        }
      });
    });

    window.addEventListener('beforeunload', () => {
      this.trackEvent({
        category: 'Engagement',
        action: 'MaxScroll',
        value: Math.round(maxScroll),
        metadata: {
          timeOnPage: this.trackTimeOnPage()
        }
      });
    });
  }

  private setupEngagementTracking() {
    let engaged = false;
    const engagementThreshold = 15000;

    setTimeout(() => {
      if (!engaged) {
        engaged = true;
        this.trackEvent({
          category: 'Engagement',
          action: 'EngagedUser',
          label: '15s+',
          metadata: {
            timeOnPage: this.trackTimeOnPage()
          }
        });
      }
    }, engagementThreshold);

    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A') {
        this.trackEvent({
          category: 'Interaction',
          action: 'LinkClick',
          label: target.getAttribute('href') || '',
          metadata: {
            text: target.textContent,
            timeOnPage: this.trackTimeOnPage()
          }
        });
      }
    });
  }

  private async sendToBackend(event: AnalyticsEvent) {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      });
    } catch (error) {
      console.error('Analytics error:', error);
    }
  }

  getSessionSummary() {
    return {
      duration: this.trackTimeOnPage(),
      pageViews: this.pageViews,
      events: this.events.length,
      conversions: this.conversions.length
    };
  }
}

export const conversionGoals: ConversionGoal[] = [
  {
    id: 'booking_started',
    name: 'Booking Form Started',
    type: 'pageview',
    value: 10,
    target: '/booking'
  },
  {
    id: 'booking_completed',
    name: 'Booking Completed',
    type: 'event',
    value: 100,
    target: 'booking_submit'
  },
  {
    id: 'contact_form_submit',
    name: 'Contact Form Submitted',
    type: 'event',
    value: 50,
    target: 'contact_submit'
  },
  {
    id: 'newsletter_signup',
    name: 'Newsletter Signup',
    type: 'event',
    value: 20,
    target: 'newsletter_submit'
  },
  {
    id: 'video_watched_50',
    name: 'Video Watched 50%',
    type: 'event',
    value: 15,
    target: 'video_progress_50'
  },
  {
    id: 'deep_engagement',
    name: 'Deep Page Engagement',
    type: 'duration',
    value: 30,
    target: 180000
  },
  {
    id: 'full_scroll',
    name: 'Scrolled to Bottom',
    type: 'scroll',
    value: 10,
    target: 90
  }
];

export const heatmapTracking = {
  trackClick(x: number, y: number, element: string) {
    return {
      type: 'click',
      x,
      y,
      element,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      page: window.location.pathname,
      timestamp: Date.now()
    };
  },

  trackMouseMovement(x: number, y: number) {
    return {
      type: 'move',
      x,
      y,
      timestamp: Date.now()
    };
  },

  trackAttention(element: string, duration: number) {
    return {
      type: 'attention',
      element,
      duration,
      page: window.location.pathname,
      timestamp: Date.now()
    };
  }
};

export const seoMetrics = {
  async trackGoogleRanking(keyword: string): Promise<number> {
    return 0;
  },

  async trackBacklinks(): Promise<number> {
    return 0;
  },

  async trackDomainAuthority(): Promise<number> {
    return 0;
  },

  async trackOrganicTraffic(): Promise<number> {
    return 0;
  },

  async trackConversionRate(): Promise<number> {
    return 0;
  }
};

export const aiSearchTracking = {
  trackAISnippet(platform: 'chatgpt' | 'perplexity' | 'bing' | 'google-sge') {
    return {
      platform,
      detected: true,
      timestamp: Date.now(),
      page: window.location.pathname
    };
  },

  trackCitation(source: string, content: string) {
    return {
      type: 'citation',
      source,
      content,
      timestamp: Date.now()
    };
  }
};
