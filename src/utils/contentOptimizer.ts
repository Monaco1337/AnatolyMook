export interface ContentAnalysis {
  score: number;
  issues: ContentIssue[];
  suggestions: ContentSuggestion[];
  keywordDensity: Record<string, number>;
  readability: ReadabilityScore;
  seoMetrics: SEOMetrics;
}

export interface ContentIssue {
  severity: 'critical' | 'warning' | 'info';
  type: string;
  message: string;
  fix?: string;
}

export interface ContentSuggestion {
  type: 'keyword' | 'structure' | 'readability' | 'seo' | 'ai-optimization';
  priority: 'high' | 'medium' | 'low';
  message: string;
  implementation: string;
}

export interface ReadabilityScore {
  score: number;
  gradeLevel: string;
  avgSentenceLength: number;
  avgWordLength: number;
  complexWords: number;
}

export interface SEOMetrics {
  titleLength: number;
  metaDescriptionLength: number;
  h1Count: number;
  h2Count: number;
  internalLinks: number;
  externalLinks: number;
  imageAltTags: number;
  wordCount: number;
}

export class ContentOptimizer {
  private content: string;
  private targetKeyword: string;
  private relatedKeywords: string[];

  constructor(content: string, targetKeyword: string, relatedKeywords: string[] = []) {
    this.content = content;
    this.targetKeyword = targetKeyword;
    this.relatedKeywords = relatedKeywords;
  }

  analyze(): ContentAnalysis {
    const issues: ContentIssue[] = [];
    const suggestions: ContentSuggestion[] = [];

    const keywordDensity = this.calculateKeywordDensity();
    const readability = this.analyzeReadability();
    const seoMetrics = this.analyzeSEOMetrics();

    if (seoMetrics.wordCount < 1500) {
      issues.push({
        severity: 'warning',
        type: 'content-length',
        message: 'Content is shorter than recommended 1500 words',
        fix: `Add ${1500 - seoMetrics.wordCount} more words to reach optimal length`
      });
    }

    if (keywordDensity[this.targetKeyword.toLowerCase()] === 0) {
      issues.push({
        severity: 'critical',
        type: 'keyword-missing',
        message: `Target keyword "${this.targetKeyword}" is missing from content`,
        fix: `Include target keyword naturally in the content`
      });
    }

    const targetDensity = keywordDensity[this.targetKeyword.toLowerCase()] || 0;
    if (targetDensity < 0.5) {
      suggestions.push({
        type: 'keyword',
        priority: 'high',
        message: `Keyword density too low (${targetDensity.toFixed(2)}%)`,
        implementation: 'Add target keyword 2-3 more times naturally'
      });
    } else if (targetDensity > 3) {
      issues.push({
        severity: 'warning',
        type: 'keyword-stuffing',
        message: `Keyword density too high (${targetDensity.toFixed(2)}%)`,
        fix: 'Remove some keyword instances to avoid over-optimization'
      });
    }

    if (seoMetrics.h1Count === 0) {
      issues.push({
        severity: 'critical',
        type: 'missing-h1',
        message: 'No H1 heading found',
        fix: 'Add a clear H1 heading with target keyword'
      });
    } else if (seoMetrics.h1Count > 1) {
      issues.push({
        severity: 'warning',
        type: 'multiple-h1',
        message: `Multiple H1 headings found (${seoMetrics.h1Count})`,
        fix: 'Use only one H1 per page'
      });
    }

    if (seoMetrics.h2Count < 3) {
      suggestions.push({
        type: 'structure',
        priority: 'medium',
        message: 'Add more H2 subheadings for better structure',
        implementation: 'Break content into 4-6 clear sections with H2 headings'
      });
    }

    if (seoMetrics.internalLinks < 3) {
      suggestions.push({
        type: 'seo',
        priority: 'high',
        message: 'Add more internal links',
        implementation: 'Link to 3-5 related pages on your site'
      });
    }

    if (readability.score < 60) {
      suggestions.push({
        type: 'readability',
        priority: 'high',
        message: 'Readability score is low',
        implementation: 'Simplify sentences and use shorter paragraphs'
      });
    }

    if (!this.hasAnswerFirstStructure()) {
      suggestions.push({
        type: 'ai-optimization',
        priority: 'high',
        message: 'Add answer-first paragraph for AI search',
        implementation: 'Start with a clear, quotable answer in the first paragraph'
      });
    }

    if (!this.hasSpeakableContent()) {
      suggestions.push({
        type: 'ai-optimization',
        priority: 'medium',
        message: 'Add speakable content markers',
        implementation: 'Mark key sections as speakable for voice search'
      });
    }

    const relatedKeywordsUsed = this.relatedKeywords.filter(kw =>
      this.content.toLowerCase().includes(kw.toLowerCase())
    ).length;

    if (relatedKeywordsUsed < this.relatedKeywords.length * 0.5) {
      suggestions.push({
        type: 'keyword',
        priority: 'medium',
        message: 'Use more related keywords',
        implementation: `Include these keywords: ${this.relatedKeywords.slice(0, 5).join(', ')}`
      });
    }

    const score = this.calculateOverallScore(issues, seoMetrics, readability, keywordDensity);

    return {
      score,
      issues,
      suggestions,
      keywordDensity,
      readability,
      seoMetrics
    };
  }

  private calculateKeywordDensity(): Record<string, number> {
    const words = this.content.toLowerCase().split(/\s+/);
    const totalWords = words.length;
    const density: Record<string, number> = {};

    const keywords = [this.targetKeyword, ...this.relatedKeywords];

    keywords.forEach(keyword => {
      const keywordLower = keyword.toLowerCase();
      const count = this.content.toLowerCase().split(keywordLower).length - 1;
      density[keywordLower] = (count / totalWords) * 100;
    });

    return density;
  }

  private analyzeReadability(): ReadabilityScore {
    const sentences = this.content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = this.content.split(/\s+/);
    const syllables = words.reduce((sum, word) => sum + this.countSyllables(word), 0);

    const avgSentenceLength = words.length / sentences.length;
    const avgSyllablesPerWord = syllables / words.length;
    const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / words.length;

    const fleschScore = 206.835 - 1.015 * avgSentenceLength - 84.6 * avgSyllablesPerWord;

    const complexWords = words.filter(w => this.countSyllables(w) > 2).length;

    let gradeLevel = 'College';
    if (fleschScore >= 90) gradeLevel = '5th Grade';
    else if (fleschScore >= 80) gradeLevel = '6th Grade';
    else if (fleschScore >= 70) gradeLevel = '7th Grade';
    else if (fleschScore >= 60) gradeLevel = '8-9th Grade';
    else if (fleschScore >= 50) gradeLevel = '10-12th Grade';

    return {
      score: Math.max(0, Math.min(100, fleschScore)),
      gradeLevel,
      avgSentenceLength: Math.round(avgSentenceLength),
      avgWordLength: Math.round(avgWordLength * 10) / 10,
      complexWords
    };
  }

  private countSyllables(word: string): number {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const matches = word.match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 1;
  }

  private analyzeSEOMetrics(): SEOMetrics {
    const h1Count = (this.content.match(/<h1/g) || []).length;
    const h2Count = (this.content.match(/<h2/g) || []).length;
    const internalLinks = (this.content.match(/href="\/[^"]*"/g) || []).length;
    const externalLinks = (this.content.match(/href="http[^"]*"/g) || []).length;
    const imageAltTags = (this.content.match(/alt="[^"]*"/g) || []).length;
    const wordCount = this.content.split(/\s+/).length;

    return {
      titleLength: 0,
      metaDescriptionLength: 0,
      h1Count,
      h2Count,
      internalLinks,
      externalLinks,
      imageAltTags,
      wordCount
    };
  }

  private hasAnswerFirstStructure(): boolean {
    const firstParagraph = this.content.split('\n\n')[0];
    return firstParagraph.length > 100 && firstParagraph.length < 300;
  }

  private hasSpeakableContent(): boolean {
    return this.content.includes('speakable') || this.content.includes('class="ai-answer"');
  }

  private calculateOverallScore(
    issues: ContentIssue[],
    seoMetrics: SEOMetrics,
    readability: ReadabilityScore,
    keywordDensity: Record<string, number>
  ): number {
    let score = 100;

    issues.forEach(issue => {
      if (issue.severity === 'critical') score -= 15;
      else if (issue.severity === 'warning') score -= 8;
      else score -= 3;
    });

    if (seoMetrics.wordCount < 1500) score -= 10;
    if (seoMetrics.h2Count < 3) score -= 5;
    if (seoMetrics.internalLinks < 3) score -= 8;
    if (readability.score < 60) score -= 10;

    const targetDensity = keywordDensity[this.targetKeyword.toLowerCase()] || 0;
    if (targetDensity < 0.5 || targetDensity > 3) score -= 12;

    return Math.max(0, score);
  }
}

export const optimizationRules = {
  wordCount: { min: 1500, optimal: 2500, max: 5000 },
  keywordDensity: { min: 0.5, optimal: 1.5, max: 3 },
  h1Count: { min: 1, optimal: 1, max: 1 },
  h2Count: { min: 3, optimal: 6, max: 12 },
  internalLinks: { min: 3, optimal: 8, max: 15 },
  externalLinks: { min: 1, optimal: 3, max: 8 },
  sentenceLength: { min: 10, optimal: 18, max: 25 },
  paragraphLength: { min: 50, optimal: 150, max: 250 }
};
