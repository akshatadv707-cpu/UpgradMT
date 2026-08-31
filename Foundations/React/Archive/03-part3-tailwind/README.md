# Part 3 challenge — Style your dashboard

Apply Tailwind to the Part 1 dashboard: cards, nav, responsive grid. At least one `hover:` or `focus:` variant on a button.

## Solution files

| File in this folder | Save as in your app |
|---------------------|---------------------|
| `01-user-card.tsx` | `app/components/UserCard.tsx` |
| `02-counter.tsx` | `app/components/Counter.tsx` |
| `03-layout.tsx` | **`app/layout.tsx`** |
| `challenge-page.tsx` | **`app/page.tsx`** |

Keep `PostList.tsx` from Challenge 1 (or practice-solutions). This challenge mainly adds Tailwind classes.

## What you should see

- Centred dashboard with max width
- Two user cards side by side on desktop, stacked on mobile (`md:grid-cols-2`)
- Blue button that darkens on hover (`hover:bg-blue-700`)
- Styled nav bar with link hover underline

## Runnable answer key

```bash
cd ../../practice-solutions/reference-app
npm run dev
```

Reference-app already has Tailwind on `app/page.tsx`, `app/layout.tsx`, and components. Resize the browser to check responsive layout.
