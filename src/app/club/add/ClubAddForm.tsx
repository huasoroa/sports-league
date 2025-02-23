'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useParams } from 'next/navigation';
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
import { createClub } from '@/server/db/actions';

const fileSizeLimit = 5 * 1024 * 1024; // 5MB

const FormSchema = z.object({
  name: z.string().min(2, 'Name is too short, minimum 2 characters'),
  picture: z
    .instanceof(File)
    .refine(
      (file) =>
        [
          'image/png',
          'image/jpeg',
          'image/jpg',
          'image/svg+xml',
          'image/gif',
        ].includes(file.type),
      { message: 'Invalid image file type' },
    )
    .refine((file) => file.size <= fileSizeLimit, {
      message: 'File size should not exceed 5MB',
    }),
});

const ClubAddForm = () => {
  const params = useParams();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
    },
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const createClubWithLeagueId = createClub.bind(null, Number(params.leagueId));

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(createClubWithLeagueId)}
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
                  placeholder="FC Your Club"
                  {...field}
                  autoComplete="off"
                />
              </FormControl>
              <FormDescription>Name of the club</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="picture"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { onChange, value, ...fieldProps } }) => (
            <div>
              <FormItem>
                <FormLabel className="text-base font-semibold">Logo</FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    placeholder="Upload a picture"
                    type="file"
                    onChange={(event) => {
                      onChange(event.target.files && event.target.files[0]);
                      if (!event.target.files) return;
                      setImagePreviewUrl(
                        URL.createObjectURL(event.target.files[0]),
                      );
                    }}
                    accept="image/*"
                  />
                </FormControl>
                <FormDescription>Logo of the club</FormDescription>
                <FormMessage />
              </FormItem>
              {imagePreviewUrl && imagePreviewUrl.length > 0 && (
                <div className="h-24 w-24 relative">
                  <Image
                    src={imagePreviewUrl}
                    alt="Club Logo"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
              )}
            </div>
          )}
        />
        <Button type="submit" className="w-min">
          Add Club
        </Button>
      </form>
    </Form>
  );
};

export default ClubAddForm;
