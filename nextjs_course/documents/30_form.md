# 📝 Form Management & Validation Guide

## 🎯 Overview

คู่มือการสร้างและจัดการฟอร์มใน Next.js 15.3.2 พร้อมการ validate แบบ real-time และการใช้งาน component ที่สามารถ reuse ได้

---

## 📋 Table of Contents

1. [🛠️ Setup & Installation](#setup--installation)
2. [🎨 Form UI Components](#form-ui-components)
3. [⚡ Form State Management](#form-state-management)
4. [✅ Form Validation](#form-validation)
5. [🔄 API Integration](#api-integration)
6. [♻️ Reusable Form Components](#reusable-form-components)
7. [🆚 Old vs New Approach](#old-vs-new-approach)

---

## 🛠️ Setup & Installation

### Library Dependencies

```bash
# Core form management libraries
pnpm add react-hook-form
pnpm add @hookform/resolvers
pnpm add zod

# UI Components (Shadcn/ui)
pnpm dlx shadcn@latest add form input textarea button dialog
```

### ✨ What's New in 2025 vs Original Tutorial

| Aspect                    | เดิม (ตามคลิป)       | ใหม่ (2025/Next.js 15.3.2)    |
| ------------------------- | -------------------- | ----------------------------- |
| **Form Validation**       | Basic validation     | Real-time validation with Zod |
| **Type Safety**           | Manual typing        | Full TypeScript integration   |
| **Error Handling**        | Basic error display  | Comprehensive error messages  |
| **Component Reusability** | Single-purpose forms | Multi-purpose reusable forms  |
| **API Integration**       | Simple fetch         | Advanced mutation handling    |

---

## 🎨 Form UI Components

### 1. Dialog Setup with Form

```tsx
// components/ArticleList.tsx
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ArticleList() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Floating Action Button */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="
              fixed bottom-10 right-10 z-100 
              flex justify-center items-center 
              rounded-full bg-blue-600 text-white 
              drop-shadow-lg
            "
          >
            <Plus />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <ScrollArea className="max-h-[50vh]">
            <div className="p-6">
              <ArticleForm mode="create" onSubmit={handleAddArticle} />
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
```

### 2. Reusable Article Form Component

```tsx
// components/ArticleForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { capitalize } from "lodash";

// ✨ New: Type-safe form props with union types
type ArticleFormProps =
  | {
      mode: "create";
      onSubmit: SubmitHandler<AddArticleInput>;
    }
  | {
      mode: "edit";
      article: ArticleDetail;
      onSubmit: SubmitHandler<UpdateArticleInput>;
    };

export default function ArticleForm(props: ArticleFormProps) {
  // ✨ New: Dynamic resolver based on mode
  const resolver =
    props.mode === "create"
      ? zodResolver(validator.add)
      : zodResolver(validator.update);

  // ✨ New: Dynamic default values
  const defaultValues =
    props.mode === "edit"
      ? {
          title: props.article.title,
          excerpt: props.article.excerpt,
          content: props.article.content,
          image: "", // Will be handled separately
        }
      : {
          title: "",
          excerpt: "",
          content: "",
          image: "",
        };

  const form = useForm({
    mode: "onChange", // ✨ New: Real-time validation
    resolver,
    defaultValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(props.onSubmit)}
        className="relative space-y-8"
      >
        {/* Dynamic Title */}
        <h1 className="text-center mb-4 border-b-2 text-2xl">
          {capitalize(props.mode)} Article
        </h1>

        {/* Title Field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter article title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Excerpt Field */}
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief description..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Content Field */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Full article content..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {capitalize(props.mode)}
        </Button>
      </form>
    </Form>
  );
}
```

---

## ⚡ Form State Management

### React Hook Form Integration

```tsx
// ✨ New: Enhanced form configuration
const form = useForm<AddArticleInput>({
  mode: "onChange", // Real-time validation
  resolver: zodResolver(validator.add),
  defaultValues: {
    title: "",
    excerpt: "",
    content: "",
    image: "",
  },
});

// ✨ New: Automatic form state management
const {
  handleSubmit,
  control,
  formState: { errors, isSubmitting },
} = form;
```

### Dialog State Management

```tsx
// ✨ New: Coordinated dialog and form state
const [open, setOpen] = useState(false)

const handleSubmit = async (data: AddArticleInput) => {
  try {
    await mutateAsync(data)
    setOpen(false) // ✨ Auto-close on success
  } catch (error) {
    // Error handling
  }
}

// ✨ New: Automatic state sync
<Dialog open={open} onOpenChange={setOpen}>
```

---

## ✅ Form Validation

### Zod Schema Setup

```typescript
// lib/validator/admin.ts
import { z } from "zod";

export const add = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  excerpt: z
    .string()
    .min(1, "Excerpt is required")
    .max(200, "Excerpt too long"),
  content: z.string().min(1, "Content is required"),
  image: z.string().optional(), // ✨ New: Optional for now
});

export const update = z.object({
  title: z.string().min(1, "Title is required").optional(),
  excerpt: z.string().min(1, "Excerpt is required").optional(),
  content: z.string().min(1, "Content is required").optional(),
  image: z.string().optional(),
});

export type AddArticleInput = z.infer<typeof add>;
export type UpdateArticleInput = z.infer<typeof update>;
```

### Custom Error Messages

```tsx
// ✨ New: Thai language error messages
const titleField = z.string()
  .min(1, "กรุณาใส่หัวข้อ")
  .max(100, "หัวข้อยาวเกินไป")

// In form component
<FormField
  control={form.control}
  name="title"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Title</FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage /> {/* ✨ Automatic error display */}
    </FormItem>
  )}
/>
```

---

## 🔄 API Integration

### Create Article Hook

```typescript
// hooks/admin.ts
export const useCreateArticle = () => {
  return {
    mutateAsync: async (formValue: AddArticleInput) => {
      const response = await fetch("/api/admin/article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValue),
      });

      if (!response.ok) {
        throw new Error("Failed to create article");
      }

      return (await response.json()) as ArticleDetail;
    },
  };
};
```

### Update Article Hook

```typescript
// ✨ New: Update hook with ID parameter
export const useEditArticle = (id: number) => {
  return {
    mutateAsync: async (formValue: UpdateArticleInput) => {
      const response = await fetch(`/api/admin/article/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValue),
      });

      if (!response.ok) {
        throw new Error("Failed to update article");
      }

      return (await response.json()) as ArticleDetail;
    },
  };
};
```

### API Route Handler

```typescript
// app/api/admin/article/route.ts
import { validator } from "@/lib/validator/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // ✨ New: Server-side validation
    const validatedData = validator.add.parse(body);

    const article = await API.add(validatedData);

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

---

## ♻️ Reusable Form Components

### Multi-Purpose Form Usage

#### Create Mode

```tsx
// In ArticleList component
<ArticleForm mode="create" onSubmit={handleAddArticle} />;

const handleAddArticle = async (data: AddArticleInput) => {
  await createArticle(data);
  setOpen(false);
};
```

#### Edit Mode

```tsx
// In ArticleDetail component
<ArticleForm mode="edit" article={article} onSubmit={handleUpdateArticle} />;

const handleUpdateArticle = async (data: UpdateArticleInput) => {
  await updateArticle(data);
  setOpen(false);
};
```

### Benefits of This Approach

| 🎯 Feature               | 📝 Description              | 💡 Benefit                   |
| ------------------------ | --------------------------- | ---------------------------- |
| **Type Safety**          | Full TypeScript integration | Catch errors at compile time |
| **Code Reusability**     | One form, multiple uses     | Reduce code duplication      |
| **Real-time Validation** | Instant feedback            | Better UX                    |
| **Consistent UI**        | Shared components           | Unified design system        |
| **Easy Maintenance**     | Centralized logic           | Single source of truth       |

---

## 🆚 Old vs New Approach

### 🔴 Old Approach (ตามคลิป)

```tsx
// ❌ Separate forms for create/edit
const CreateForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Manual validation
    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }
    // Submit logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button type="submit">Create</button>
    </form>
  );
};

const EditForm = () => {
  // Duplicate code with slight variations
  // ...
};
```

### 🟢 New Approach (2025)

```tsx
// ✅ Single reusable form
const ArticleForm = (props: ArticleFormProps) => {
  const form = useForm({
    resolver: zodResolver(getValidator(props.mode)),
    defaultValues: getDefaultValues(props),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(props.onSubmit)}>
        {/* Reusable form fields */}
        <FormField name="title" control={form.control} />
        <FormField name="content" control={form.control} />
        <Button type="submit">{capitalize(props.mode)}</Button>
      </form>
    </Form>
  );
};
```

### 📊 Comparison Table

| Aspect               | เก่า (Old)        | ใหม่ (New)         | Improvement          |
| -------------------- | ----------------- | ------------------ | -------------------- |
| **Code Duplication** | 🔴 High           | 🟢 Minimal         | 70% reduction        |
| **Type Safety**      | 🔴 Manual         | 🟢 Automatic       | Full TypeScript      |
| **Validation**       | 🔴 Basic          | 🟢 Schema-based    | Real-time validation |
| **Error Handling**   | 🔴 Alert boxes    | 🟢 Inline messages | Better UX            |
| **Maintainability**  | 🔴 Multiple files | 🟢 Single source   | Easier updates       |
| **Testing**          | 🔴 Complex        | 🟢 Simplified      | Better coverage      |

---

## 🎯 Key Improvements Made

### 1. **Enhanced Type Safety**

```typescript
// ✨ Union types for different form modes
type ArticleFormProps =
  | { mode: "create"; onSubmit: SubmitHandler<AddArticleInput> }
  | {
      mode: "edit";
      article: ArticleDetail;
      onSubmit: SubmitHandler<UpdateArticleInput>;
    };
```

### 2. **Real-time Validation**

```tsx
// ✨ Immediate feedback on input changes
const form = useForm({
  mode: "onChange", // Validates on every change
  resolver: zodResolver(schema),
});
```

### 3. **Dynamic Content**

```tsx
// ✨ Content changes based on mode
<h1>{capitalize(props.mode)} Article</h1>
<Button>{capitalize(props.mode)}</Button>
```

### 4. **Improved Error Messages**

```tsx
// ✨ Custom error messages in Thai
z.string().min(1, "กรุณาใส่ข้อมูล");
```

### 5. **Better State Management**

```tsx
// ✨ Coordinated dialog and form state
const handleSubmit = async (data) => {
  await mutateAsync(data);
  setOpen(false); // Auto-close on success
};
```

---

## 🚀 Usage Examples

### Basic Create Form

```tsx
import { ArticleForm } from "@/components/ArticleForm";
import { useCreateArticle } from "@/hooks/admin";

export default function CreateArticlePage() {
  const { mutateAsync } = useCreateArticle();

  const handleSubmit = async (data: AddArticleInput) => {
    try {
      await mutateAsync(data);
      router.push("/admin/articles");
    } catch (error) {
      console.error("Failed to create article:", error);
    }
  };

  return <ArticleForm mode="create" onSubmit={handleSubmit} />;
}
```

### Edit Form with Prefilled Data

```tsx
export default function EditArticlePage({
  article,
}: {
  article: ArticleDetail;
}) {
  const { mutateAsync } = useEditArticle(article.id);

  const handleSubmit = async (data: UpdateArticleInput) => {
    await mutateAsync(data);
    router.push(`/admin/articles/${article.id}`);
  };

  return <ArticleForm mode="edit" article={article} onSubmit={handleSubmit} />;
}
```

---

## 📚 Additional Resources

- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Validation Schema](https://zod.dev/)
- [Shadcn/ui Components](https://ui.shadcn.com/)
- [Next.js 15 App Router](https://nextjs.org/docs)

---

## 🎉 Conclusion

การใช้แนวทางใหม่นี้ทำให้เราได้:

- **Code ที่สะอาดและ maintainable มากขึ้น**
- **Type safety ที่ดีขึ้น**
- **User experience ที่ดีกว่า**
- **การ reuse component ที่มีประสิทธิภาพ**

ซึ่งเป็นการพัฒนาที่สำคัญจากแนวทางเดิมในคลิป และเหมาะสมกับ Next.js 15.3.2 ในปัจจุบัน
