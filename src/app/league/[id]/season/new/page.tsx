'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form } from '@/components/ui/form';

const FormSchema = z.object({
  name: z.string().min(2, 'Name is too short, minimum 2 characters'),
  divisions: z.coerce
    .number()
    .min(2, 'Divisions is too small, you must have at least 2 divisions')
    .optional(),
});

const SeasonAddForm = () => {
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
        onSubmit={form.handleSubmit((result) => console.log(result))}
      ></form>
    </Form>
  );
};

export default SeasonAddForm;
