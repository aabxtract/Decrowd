
'use server';

import { summarizeCampaignDescription } from '@/ai/flows/summarize-campaign-description';

/**
 * Generates a concise summary for a given campaign description using an AI model.
 * @param description The full campaign description.
 * @returns A promise that resolves to the generated summary string.
 */
export async function getSummary(description: string): Promise<string> {
  if (!description) {
    return '';
  }
  try {
    const result = await summarizeCampaignDescription({ description });
    return result.summary;
  } catch (error) {
    console.error('Error summarizing description:', error);
    // As a fallback, return a truncated version of the description.
    const truncated = description.slice(0, 150);
    return truncated.length < description.length ? `${truncated}...` : truncated;
  }
}
