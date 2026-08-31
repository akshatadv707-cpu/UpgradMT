# Part 2 challenge — Put Next.js together

Two-page app: **Home** (Server Component, fetches a list) + **Detail** (dynamic route `/posts/[id]`). **Link** navigation. One **Client Component**. Shared **layout** with nav.

## Solution files

| File in this folder | Save as in your app |
|---------------------|---------------------|
| `01-home-page.tsx` | **`app/page.tsx`** |
| `02-post-detail-page.tsx` | `app/posts/[id]/page.tsx` |
| `03-add-button.tsx` | `app/components/AddButton.tsx` |
| `04-layout.tsx` | **`app/layout.tsx`** |
| `05-about-page.tsx` | `app/about/page.tsx` (optional) |
| `06-contact-page.tsx` | `app/contact/page.tsx` (optional) |

Create the folder path for the dynamic route: `app` → `posts` → `[id]` → `page.tsx`.

## What you should see

- Home (`/`) — list of post titles as links, plus a client button
- Click a title → `/posts/1` (or any id) shows post detail
- Nav links in layout stay visible when you switch pages
- Try: http://localhost:3000/posts/1

## Runnable answer key

```bash
cd ../../practice-solutions/reference-app
npm run dev
```

- Home: `app/page.tsx` (reference-app combines practices; use `01-home-page.tsx` for the challenge-specific server-fetch list)
- Dynamic route: `app/posts/[id]/page.tsx`
- Nav: `app/layout.tsx`
