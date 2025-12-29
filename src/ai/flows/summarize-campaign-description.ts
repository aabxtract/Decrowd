'use server';
/**
 * @fileOverview A campaign description summarization AI agent.
 *
 * - summarizeCampaignDescription - A function that summarizes a campaign description.
 * - SummarizeCampaignDescriptionInput - The input type for the summarizeCampaignDescription function.
 * - SummarizeCampaignDescriptionOutput - The return type for the summarizeCampaignDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeCampaignDescriptionInputSchema = z.object({
  description: z.string().describe('The full campaign description to be summarized.'),
});
export type SummarizeCampaignDescriptionInput = z.infer<typeof SummarizeCampaignDescriptionInputSchema>;

const SummarizeCampaignDescriptionOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the campaign description.'),
});
export type SummarizeCampaignDescriptionOutput = z.infer<typeof SummarizeCampaignDescriptionOutputSchema>;

export async function summarizeCampaignDescription(input: SummarizeCampaignDescriptionInput): Promise<SummarizeCampaignDescriptionOutput> {
  return summarizeCampaignDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeCampaignDescriptionPrompt',
  input: {schema: SummarizeCampaignDescriptionInputSchema},
  output: {schema: SummarizeCampaignDescriptionOutputSchema},
  prompt: `Summarize the following campaign description in one sentence:\n\n{{{description}}}`, 
});

const summarizeCampaignDescriptionFlow = ai.defineFlow(
  {
    name: 'summarizeCampaignDescriptionFlow',
    inputSchema: SummarizeCampaignDescriptionInputSchema,
    outputSchema: SummarizeCampaignDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
