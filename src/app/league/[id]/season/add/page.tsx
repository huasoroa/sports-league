'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { PlusSquare, Trash2Icon, X } from 'lucide-react';
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

const FormSchema = z.object({
  year: z
    .number()
    .min(1900)
    .max(new Date().getFullYear() + 1),
  divisions: z
    .array(
      z.object({
        name: z.string().min(1),
        promotionSpots: z.number().min(0),
        relegationSpots: z.number().min(0),
      }),
    )
    .min(1),
});

const SeasonAddForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      year: new Date().getFullYear(),
      divisions: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'divisions',
  });

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-[auto_1fr] gap-2 items-center"
        onSubmit={form.handleSubmit((result) => console.log(result))}
      >
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem className="col-start-2 flex flex-col w-3/12">
              <FormLabel className="text-base font-semibold">Year</FormLabel>
              <FormControl>
                <Input
                  type="text"
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
        {fields.map((field, index) => (
          <Fragment key={field.id}>
            <p>{index + 1}.</p>
            <div className="flex gap-4 items-center">
              <FormField
                control={form.control}
                name={`divisions.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">
                      Divisions
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Divisions"
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
              {fields.length - 1 === index && (
                <Button
                  className="col-start-2 my-2 w-min"
                  variant={'default'}
                  type="button"
                  onClick={() =>
                    append({ name: '', promotionSpots: 0, relegationSpots: 0 })
                  }
                >
                  <PlusSquare />
                </Button>
              )}
            </div>
          </Fragment>
        ))}
        <Button className="col-start-2 w-min" variant={'default'} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SeasonAddForm;
