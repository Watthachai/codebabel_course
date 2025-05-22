import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./components/ui/form";
import { Textarea } from "./components/ui/textarea";
import { Input } from "./components/ui/input";
import { ArticleItem, useGetArticles } from "./ArticleList";

const schema = z.object({
  title: z.string(),
  content: z.string(),
});

type FormSchema = z.infer<typeof schema>;

function ArticleForm() {
  const { mutate } = useGetArticles();
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  async function onSubmit(formValue: FormSchema) {
    const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/articles`, {
      method: "POST",
      body: JSON.stringify(formValue),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await (res.json() as Promise<ArticleItem>);

    mutate();
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Input placeholder="Awesome article title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write the article content here..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default ArticleForm;
