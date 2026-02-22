export interface SocialMetaTags {
  openGraph: OpenGraphTags;
  twitter: TwitterTags;
  facebook: FacebookTags;
  linkedin: LinkedInTags;
  pinterest: PinterestTags;
}

export interface OpenGraphTags {
  'og:title': string;
  'og:description': string;
  'og:image': string;
  'og:image:width': string;
  'og:image:height': string;
  'og:image:alt': string;
  'og:url': string;
  'og:type': string;
  'og:locale': string;
  'og:site_name': string;
  'og:video'?: string;
  'og:audio'?: string;
}

export interface TwitterTags {
  'twitter:card': 'summary' | 'summary_large_image' | 'app' | 'player';
  'twitter:site': string;
  'twitter:creator': string;
  'twitter:title': string;
  'twitter:description': string;
  'twitter:image': string;
  'twitter:image:alt': string;
}

export interface FacebookTags {
  'fb:app_id'?: string;
  'fb:pages'?: string;
}

export interface LinkedInTags {
  'linkedin:owner': string;
}

export interface PinterestTags {
  'pinterest:description': string;
  'pinterest:image': string;
}

export const generateSocialMetaTags = (content: {
  title: string;
  description: string;
  image: string;
  url: string;
  type?: string;
  locale?: string;
  video?: string;
}): SocialMetaTags => {
  const truncatedTitle = content.title.length > 60
    ? content.title.substring(0, 57) + '...'
    : content.title;

  const truncatedDescription = content.description.length > 155
    ? content.description.substring(0, 152) + '...'
    : content.description;

  const imageAlt = `${content.title} - Anatoly Mook Spiritual Awakening`;

  return {
    openGraph: {
      'og:title': truncatedTitle,
      'og:description': truncatedDescription,
      'og:image': content.image,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': imageAlt,
      'og:url': content.url,
      'og:type': content.type || 'article',
      'og:locale': content.locale || 'de_DE',
      'og:site_name': 'Anatoly Mook',
      ...(content.video && { 'og:video': content.video })
    },
    twitter: {
      'twitter:card': 'summary_large_image',
      'twitter:site': '@anatolymux',
      'twitter:creator': '@anatolymux',
      'twitter:title': truncatedTitle,
      'twitter:description': truncatedDescription,
      'twitter:image': content.image,
      'twitter:image:alt': imageAlt
    },
    facebook: {
      'fb:pages': 'anatolymux'
    },
    linkedin: {
      'linkedin:owner': 'anatolymook'
    },
    pinterest: {
      'pinterest:description': truncatedDescription,
      'pinterest:image': content.image
    }
  };
};

export const socialMediaImages = {
  generateImageUrl: (type: 'article' | 'video' | 'event' | 'course', params: {
    title: string;
    subtitle?: string;
    author?: string;
    date?: string;
  }): string => {
    const baseUrl = 'https://anatolymook.com/api/og-image';
    const queryParams = new URLSearchParams({
      type,
      title: params.title,
      ...(params.subtitle && { subtitle: params.subtitle }),
      ...(params.author && { author: params.author }),
      ...(params.date && { date: params.date })
    });

    return `${baseUrl}?${queryParams.toString()}`;
  },

  getOptimalDimensions: (platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram' | 'pinterest') => {
    const dimensions = {
      facebook: { width: 1200, height: 630 },
      twitter: { width: 1200, height: 675 },
      linkedin: { width: 1200, height: 627 },
      instagram: { width: 1080, height: 1080 },
      pinterest: { width: 1000, height: 1500 }
    };

    return dimensions[platform];
  }
};

export const socialSharingOptimization = {
  optimizeForPlatform: (platform: 'facebook' | 'twitter' | 'linkedin' | 'whatsapp', content: {
    title: string;
    description: string;
    url: string;
    image: string;
  }) => {
    switch (platform) {
      case 'facebook':
        return {
          shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(content.url)}`,
          optimal: {
            titleLength: 60,
            descriptionLength: 155,
            imageRatio: '1.91:1'
          }
        };

      case 'twitter':
        return {
          shareUrl: `https://twitter.com/intent/tweet?url=${encodeURIComponent(content.url)}&text=${encodeURIComponent(content.title)}&via=anatolymux`,
          optimal: {
            titleLength: 280,
            descriptionLength: 0,
            imageRatio: '2:1'
          }
        };

      case 'linkedin':
        return {
          shareUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(content.url)}`,
          optimal: {
            titleLength: 70,
            descriptionLength: 150,
            imageRatio: '1.91:1'
          }
        };

      case 'whatsapp':
        return {
          shareUrl: `https://wa.me/?text=${encodeURIComponent(content.title + ' ' + content.url)}`,
          optimal: {
            titleLength: 65,
            descriptionLength: 0,
            imageRatio: '1:1'
          }
        };
    }
  },

  generateShareButtons: (url: string, title: string) => [
    {
      platform: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      icon: 'facebook',
      color: '#1877F2'
    },
    {
      platform: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}&via=anatolymux`,
      icon: 'twitter',
      color: '#1DA1F2'
    },
    {
      platform: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      icon: 'linkedin',
      color: '#0A66C2'
    },
    {
      platform: 'WhatsApp',
      url: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
      icon: 'whatsapp',
      color: '#25D366'
    },
    {
      platform: 'Email',
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
      icon: 'mail',
      color: '#EA4335'
    }
  ]
};

export const viralContentPatterns = {
  emotionalTriggers: [
    'transformation',
    'breakthrough',
    'awakening',
    'discover',
    'secret',
    'ultimate',
    'complete',
    'powerful',
    'life-changing'
  ],

  headlineFormulas: [
    `${'{keyword}'}: Der ultimative Guide für ${'{year}'}`,
    `Wie Sie ${'{benefit}'} in ${'{timeframe}'}`,
    `${'{number}'} bewährte Wege zu ${'{outcome}'}`,
    `Was niemand Ihnen über ${'{topic}'} sagt`,
    `${'{shocking-fact}'} über ${'{topic}'}`,
    `Von ${'{problem}'} zu ${'{solution}'}`,
    `Der Unterschied zwischen ${'{A}'} und ${'{B}'}`,
    `Warum ${'{common-belief}'} falsch ist`
  ],

  engagementOptimization: {
    postingTimes: {
      facebook: ['14:00', '19:00'],
      twitter: ['12:00', '17:00', '20:00'],
      linkedin: ['08:00', '12:00', '17:00'],
      instagram: ['11:00', '19:00', '21:00']
    },

    hashtagStrategy: {
      primary: ['#spiritualawakening', '#consciousness', '#enlightenment', '#awakening'],
      secondary: ['#spirituality', '#mindfulness', '#meditation', '#transformation'],
      branded: ['#anatolymok', '#anatolymux']
    },

    contentMix: {
      educational: 0.4,
      inspirational: 0.3,
      promotional: 0.1,
      entertainment: 0.2
    }
  }
};
