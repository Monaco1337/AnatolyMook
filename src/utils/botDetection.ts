export function isBot(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  const userAgent = navigator.userAgent.toLowerCase();

  const botPatterns = [
    'googlebot',
    'bingbot',
    'slurp',
    'duckduckbot',
    'baiduspider',
    'yandexbot',
    'facebookexternalhit',
    'twitterbot',
    'linkedinbot',
    'whatsapp',
    'telegrambot',
    'slackbot',
    'applebot',
    'chrome-lighthouse',
    'gtmetrix',
    'pagespeed',
    'gptbot',
    'chatgpt-user',
    'perplexitybot',
    'claude-web',
    'anthropic-ai',
    'ccbot'
  ];

  return botPatterns.some(pattern => userAgent.includes(pattern));
}

export function isCrawler(): boolean {
  return isBot();
}

export function getBotName(): string | null {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return null;
  }

  const userAgent = navigator.userAgent.toLowerCase();

  const bots: Record<string, string> = {
    'googlebot': 'Google',
    'bingbot': 'Bing',
    'slurp': 'Yahoo',
    'duckduckbot': 'DuckDuckGo',
    'baiduspider': 'Baidu',
    'yandexbot': 'Yandex',
    'facebookexternalhit': 'Facebook',
    'twitterbot': 'Twitter',
    'linkedinbot': 'LinkedIn',
    'gptbot': 'ChatGPT',
    'perplexitybot': 'Perplexity',
    'claude-web': 'Claude'
  };

  for (const [pattern, name] of Object.entries(bots)) {
    if (userAgent.includes(pattern)) {
      return name;
    }
  }

  return null;
}

export function logBotVisit(): void {
  const botName = getBotName();
  if (botName) {
    console.log(`[SEO] Bot detected: ${botName}`);
  }
}

export function shouldRenderForSEO(): boolean {
  return isBot();
}
