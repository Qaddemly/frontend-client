export interface IOptimizedKeywordsResponse {
  optimizedKeywords: {
    summary: string;
    recommendations: IRecommendations;
    keyword_analysis: IKeywordAnalysis;
  };
}

export interface IOptimizedKeywords {
  summary: string;
  recommendations: IRecommendations;
  keyword_analysis: IKeywordAnalysis;
}

interface IRecommendations {
  add: IAdd[];
  modify: IModify[];
  remove: IRemove[];
}

interface IAdd {
  section: string;
  content: string;
  reason: string;
}

interface IModify {
  section: string;
  current_content: string;
  suggested_change: string;
  reason: string;
}

interface IRemove {
  section: string;
  content: string;
  reason: string;
}

interface IKeywordAnalysis {
  missing_keywords: string[];
  underrepresented_keywords: string[];
}
