import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { signInWithEmailAndPassword } from '../actions';
import { useTransition } from 'react';

const passwordMinLength = 6;

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(passwordMinLength, {
    message: `Password Minimum length is ${passwordMinLength}`
  })
});

export default function SignInForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const res = await signInWithEmailAndPassword(data);
      const { error } = JSON.parse(res);

      let toastTitle = 'You submitted the following values:',
        toastDescription = JSON.stringify(data, null, 2),
        toastVariant: 'default' | 'destructive' = 'default';

      if (error) {
        toastTitle = 'Error';
        toastDescription = error.message;
        toastVariant = 'destructive';
      }

      toast({
        variant: toastVariant,
        title: toastTitle,
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{toastDescription}</code>
          </pre>
        )
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='example@gmail.com'
                  {...field}
                  type='email'
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder='******'
                  {...field}
                  type='password'
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full flex gap-2'>
          Login
          <AiOutlineLoading3Quarters
            className={cn('animate-spin', { hidden: !isPending })}
          />
        </Button>
      </form>
    </Form>
  );
}
