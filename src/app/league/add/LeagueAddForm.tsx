"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { addLeague } from "@/server/db/actions";

const FormSchema = z.object({
  name: z.string().min(2, "Name is too short, minimum 2 characters"),
});

export const LeagueAddForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(addLeague)}>
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
        <Button type="submit">Create League</Button>
      </form>
    </Form>
  );
};

export default LeagueAddForm;
