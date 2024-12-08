'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { addLeague } from '@/server/db/actions';

const FormSchema = z.object({
  name: z.string().min(2, 'Name is too short, minimum 2 characters'),
  divisions: z.coerce
    .number()
    .min(2, 'Divisions is too small, you must have at least 2 divisions')
    .optional(),
});

export const LeagueAddForm = () => {
  const [hasDivisions, setHasDivisions] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      divisions: undefined,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(addLeague)}
        className="space-y-8 max-w-fit flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Premier League"
                  {...field}
                  autoComplete="off"
                />
              </FormControl>
              <FormDescription>
                The name of the league, e.g. Premier League
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Label className="text-base font-semibold" htmlFor="hasDivisions">
            Does it have divisions?
          </Label>
          <Switch
            id="hasDivisions"
            checked={hasDivisions}
            onCheckedChange={() => {
              setHasDivisions((prev) => !prev);
            }}
          />
        </div>
        {hasDivisions && (
          <FormField
            control={form.control}
            name="divisions"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  Divisions
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Divisions"
                    {...field}
                    autoComplete="off"
                  />
                </FormControl>
                <FormDescription>
                  The number of divisions in the league, e.g. 4
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit">Create League</Button>
      </form>
    </Form>
  );
};

export default LeagueAddForm;
