import axios from 'axios';
import { logger } from 'react-query/types/react/logger';

import { API_ENDPOINTS } from './apiConfig';

// import { ItemRecommendationBoxData } from 'src/models/ItemRecommendationBoxData';

interface ValidSearchPromptResponse {
  status: string;
}

interface ValidSearchPromptResponse {
  status: string;
}

export async function validateSearchPrompt(prompt: string): Promise<boolean> {
  try {
    const response = await axios.post<ValidSearchPromptResponse>(API_ENDPOINTS.validateSearchResult, { prompt });
    return response.data.status === 'success';
  } catch (error) {
    logger.error('Error validating search prompt:', error); // Log the entire error for debugging
    return false;
  }
}

// interface RecommendationResponse {
//   recommendations: ItemRecommendationBoxData[];
// }

// export async function getRecommendations(prompt: string): Promise<ItemRecommendationBoxData[]> {
// export async function getRecommendations(prompt: string): Promise<string[]> {
//   try {
//     const response = await axios.post<RecommendationResponse>(API_ENDPOINTS.getRecommendations, { prompt });
//     return response.data.recommendations;
//   } catch (error) {
//     logger.error('Error validating recomendation query:', error); // Log the entire error for debugging
//     return [];
//   }
// }

export interface ResearchStateMessage {
  type: 'url' | 'info' | 'error' | 'none';
  content: string;
}

export async function getResearchState(): Promise<ResearchStateMessage> {
  try {
    // TODO: NOT SURE IF THIS IS THE RIGHT TYPE OF COMMUNICATION
    const response = await axios.get<string>(API_ENDPOINTS.getResearchState);
    return JSON.parse(response.data);
  } catch (error) {
    logger.error('Error getting research state:', error); // Log the entire error for debugging
    return { type: 'error', content: 'Error fetching research state' };
  }
}
