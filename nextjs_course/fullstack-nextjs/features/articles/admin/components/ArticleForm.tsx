import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/features/shadcn/components/ui/form';
import { Separator } from '@/features/shadcn/components/ui/separator';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as validators from '../validators';
import type * as types from '../types';
import { Input } from '@/features/shadcn/components/ui/input';
import { Textarea } from '@/features/shadcn/components/ui/textarea';
import { Button } from '@/features/shadcn/components/ui/button';
import { type ArticleDetails } from '@/features/articles/types';
import { capitalize } from 'lodash';
import ImageUploader from '@/features/ui/components/ImageUploader';
import { getImagePath } from '@/features/shared/helpers/upload';

type ArticleFormProps =
  | { kind: 'create'; onSubmit: SubmitHandler<types.AddArticleInput> }
  | {
      kind: 'edit';
      article: ArticleDetails;
      onSubmit: SubmitHandler<types.UpdateArticleInput>;
    };

const ArticleForm = (props: ArticleFormProps) => {
  const { kind, onSubmit } = props;
  const form = useForm<
    typeof onSubmit extends SubmitHandler<types.AddArticleInput>
      ? types.AddArticleInput
      : types.UpdateArticleInput
  >({
    mode: 'onChange',
    resolver: zodResolver(
      kind === 'create' ? validators.add : validators.update,
    ),
    defaultValues:
      props.kind === 'edit'
        ? { ...props.article, image: undefined }
        : {
            title: '',
            content: '',
            excerpt: '',
            image: undefined,
          },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative space-y-8"
      >
        <h1 className="mb-4 text-center text-2xl">
          {capitalize(kind)} Article
        </h1>
        <Separator></Separator>
        <ImageUploader
          defaultImage={
            props.kind === 'edit'
              ? getImagePath(props.article.image)
              : '/assets/images/no-image.png'
          }
          onImageChanged={(image) => {
            form.setValue('image', image, { shouldValidate: true });
          }}
          error={form.formState.errors.image?.message}
        ></ImageUploader>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="1989" {...field}></Input>
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Taylor's version"
                  {...field}
                  className="resize-none"
                ></Textarea>
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="1989 (Taylor's version)"
                  {...field}
                  className="resize-none"
                ></Textarea>
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        ></FormField>
        <Button type="submit">{capitalize(kind)}</Button>
      </form>
    </Form>
  );
};

export default ArticleForm;
