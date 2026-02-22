export interface VideoMetadata {
  title: string;
  description: string;
  duration: string;
  uploadDate: string;
  thumbnailUrl: string;
  embedUrl: string;
  contentUrl?: string;
  transcript?: string;
  chapters?: Array<{
    startTime: number;
    title: string;
  }>;
}

export const generateVideoSchema = (video: VideoMetadata) => ({
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: video.title,
  description: video.description,
  thumbnailUrl: video.thumbnailUrl,
  uploadDate: video.uploadDate,
  duration: video.duration,
  contentUrl: video.contentUrl,
  embedUrl: video.embedUrl,
  publisher: {
    '@type': 'Organization',
    name: 'Anatoly Mook',
    logo: {
      '@type': 'ImageObject',
      url: 'https://anatolymook.com/logo.png'
    }
  },
  hasPart: video.chapters?.map(chapter => ({
    '@type': 'Clip',
    name: chapter.title,
    startOffset: chapter.startTime,
    url: `${video.embedUrl}?t=${chapter.startTime}`
  }))
});

export interface VideoTranscript {
  language: string;
  text: string;
  timestamps: Array<{
    time: number;
    text: string;
  }>;
}

export const formatTranscriptForSEO = (transcript: VideoTranscript): string => {
  return transcript.timestamps.map(t => {
    const minutes = Math.floor(t.time / 60);
    const seconds = t.time % 60;
    return `[${minutes}:${seconds.toString().padStart(2, '0')}] ${t.text}`;
  }).join('\n\n');
};

export const extractKeyMoments = (transcript: VideoTranscript, keywords: string[]): Array<{startTime: number; title: string}> => {
  const moments: Array<{startTime: number; title: string}> = [];

  transcript.timestamps.forEach(timestamp => {
    keywords.forEach(keyword => {
      if (timestamp.text.toLowerCase().includes(keyword.toLowerCase())) {
        moments.push({
          startTime: timestamp.time,
          title: timestamp.text.substring(0, 100)
        });
      }
    });
  });

  return moments;
};

export const spiritualVideoLibrary = [
  {
    id: 'was-ist-erwachen',
    title: 'Was ist spirituelles Erwachen wirklich?',
    description: 'Eine klare Erklärung ohne spirituellen Nebel. Anatoly Mook spricht über die direkte Erfahrung jenseits von Konzepten.',
    duration: 'PT15M32S',
    uploadDate: '2025-01-15',
    thumbnailUrl: '/videos/was-ist-erwachen-thumb.jpg',
    embedUrl: 'https://youtube.com/embed/example1',
    transcript: {
      language: 'de',
      text: 'Spirituelles Erwachen ist kein mystisches Ereignis...',
      timestamps: [
        { time: 0, text: 'Spirituelles Erwachen ist kein mystisches Ereignis, sondern eine natürliche Verschiebung der Wahrnehmung.' },
        { time: 45, text: 'Die meisten Menschen verwechseln spirituelle Erfahrungen mit Erwachen.' },
        { time: 120, text: 'Erwachen bedeutet: Die Identifikation mit dem begrenzten Selbst bricht auf.' }
      ]
    },
    chapters: [
      { startTime: 0, title: 'Einleitung: Was Erwachen NICHT ist' },
      { startTime: 45, text: 'Der Unterschied zwischen Erfahrung und Erkenntnis' },
      { startTime: 120, title: 'Die wahre Bedeutung von Erwachen' },
      { startTime: 300, title: 'Praktische Hinweise für den Weg' }
    ],
    keywords: ['spirituelles erwachen', 'erleuchtung', 'bewusstsein', 'selbsterkenntnis']
  },
  {
    id: 'ego-dissolution-english',
    title: 'Ego Dissolution: What Really Happens',
    description: 'A clear explanation of ego dissolution without spiritual fantasies. Anatoly Mook speaks about the direct process.',
    duration: 'PT18M45S',
    uploadDate: '2025-01-20',
    thumbnailUrl: '/videos/ego-dissolution-thumb.jpg',
    embedUrl: 'https://youtube.com/embed/example2',
    chapters: [
      { startTime: 0, title: 'Introduction: What is Ego?' },
      { startTime: 60, title: 'The Process of Dissolution' },
      { startTime: 240, title: 'What Remains After' },
      { startTime: 480, title: 'Integration into Daily Life' }
    ],
    keywords: ['ego dissolution', 'ego death', 'awakening', 'enlightenment', 'consciousness']
  }
];

export const generateVideoSitemap = (videos: typeof spiritualVideoLibrary) => {
  const header = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">';
  const footer = '</urlset>';

  const entries = videos.map(video => `
  <url>
    <loc>https://anatolymook.com/videos/${video.id}</loc>
    <video:video>
      <video:thumbnail_loc>${video.thumbnailUrl}</video:thumbnail_loc>
      <video:title>${video.title}</video:title>
      <video:description>${video.description}</video:description>
      <video:content_loc>${video.embedUrl}</video:content_loc>
      <video:duration>${parseDuration(video.duration)}</video:duration>
      <video:publication_date>${video.uploadDate}</video:publication_date>
      <video:tag>${video.keywords.join('</video:tag><video:tag>')}</video:tag>
    </video:video>
  </url>`).join('');

  return header + entries + footer;
};

const parseDuration = (isoDuration: string): number => {
  const match = isoDuration.match(/PT(\d+)M(\d+)S/);
  if (match) {
    return parseInt(match[1]) * 60 + parseInt(match[2]);
  }
  return 0;
};
