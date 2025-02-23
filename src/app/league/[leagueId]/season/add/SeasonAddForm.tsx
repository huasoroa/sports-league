'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { PlusSquare, Trash2Icon } from 'lucide-react';
import { Fragment } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
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
import { SeasonAddFormSchema } from '@/lib/formSchema';
import { createSeason } from '@/server/db/actions';

const SeasonAddForm = ({ leagueId }: { leagueId: string }) => {
  const form = useForm<z.infer<typeof SeasonAddFormSchema>>({
    resolver: zodResolver(SeasonAddFormSchema),
    defaultValues: {
      year: new Date().getFullYear(),
      divisions: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'divisions',
  });

  const createSeasonWithLeagueId = createSeason.bind(null, Number(leagueId));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(createSeasonWithLeagueId)}>
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem className="col-start-2 flex flex-col w-3/12">
              <FormLabel className="text-base font-semibold">Year</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="year"
                  {...field}
                  autoComplete="off"
                />
              </FormControl>
              <FormDescription>
                Year of the season, like 2024-2025 would be 2024
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-4">
          {fields.map((field, index) => (
            <Fragment key={field.id}>
              <div className="flex gap-4 items-center">
                <FormField
                  control={form.control}
                  name={`divisions.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="D1 Men A"
                          {...field}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormDescription>
                        Number of divisions in the season
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`divisions.${index}.level`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        Level
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder={`${index + 1}`}
                          {...field}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormDescription>
                        Level of the division, like 1, 2, 3 etc.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`divisions.${index}.promotionSpots`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        Promotion spots
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormDescription>
                        Top teams that will get promoted.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`divisions.${index}.relegationSpots`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        Relegation Spots
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormDescription>
                        Bottom teams that will get relegated.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button variant={'destructive'} onClick={() => remove(index)}>
                  <Trash2Icon />
                </Button>
              </div>
            </Fragment>
          ))}
          <Button
            variant="ghost"
            className="w-min"
            type="button"
            onClick={() =>
              append({
                name: '',
                level: fields.length + 1,
                promotionSpots: 0,
                relegationSpots: 0,
              })
            }
          >
            <PlusSquare />
            <span>Add division</span>
          </Button>
        </div>
        <Button className="col-start-2 w-min" variant={'default'} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SeasonAddForm;
