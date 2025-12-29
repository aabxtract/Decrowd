'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useWeb3 } from '@/hooks/use-web3';
import { useState } from 'react';

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
  target: z.coerce.number().positive('Funding goal must be a positive number.'),
  deadline: z.date({
    required_error: 'A deadline is required.',
  }).min(new Date(), "Deadline must be in the future."),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateCampaignForm() {
  const { createCampaign, userAddress } = useWeb3();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      target: 0,
    },
  });

  async function onSubmit(values: FormValues) {
    if (!userAddress) {
        form.setError("root", { message: "Please connect your wallet before creating a campaign."})
        return;
    }
    setIsSubmitting(true);
    await createCampaign({
      ...values,
      deadline: values.deadline.getTime(),
    });
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campaign Title</FormLabel>
              <FormControl>
                <Input placeholder="Project Phoenix" {...field} />
              </FormControl>
              <FormDescription>
                What is the name of your project?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Story</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell the community about your project..."
                  rows={6}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Describe your project in detail to get people excited.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="target"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Funding Goal (ETH)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="100" {...field} />
                </FormControl>
                <FormDescription>
                  How much ETH do you need to raise?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Deadline</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                 <FormDescription>
                  When will your campaign end?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {form.formState.errors.root && <FormMessage>{form.formState.errors.root.message}</FormMessage>}
        <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting} size="lg">
          {isSubmitting ? 'Submitting...' : 'Create Campaign'}
        </Button>
      </form>
    </Form>
  );
}
