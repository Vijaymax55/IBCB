# How to Make Your Google Calendar Public & Get Embed URL

## Step 1 — Make Calendar Public
1. Open Google Calendar on desktop
2. Find your calendar in the left sidebar
3. Click the three dots (...) next to it
4. Click "Settings and sharing"
5. Under "Access permissions" check:
   **"Make available to public" → "See all event details"**
6. Click Save

## Step 2 — Get Your Calendar ID
1. In the same Settings page, scroll down
2. Find the **"Integrate calendar"** section
3. Copy the **"Calendar ID"** — it looks like either:
   - `yourname@gmail.com`
   - `abc123xyz@group.calendar.google.com`

## Step 3 — Update the Website

Open `app/calendar/page.tsx` and replace `CALENDAR_ID_HERE` with your ID:

```
src="https://calendar.google.com/calendar/embed?src=YOUR_ID_HERE&ctz=Asia%2FKolkata&..."
```

## Step 4 — URL-Encode the Calendar ID

If the Calendar ID contains an `@` symbol, encode it as `%40`:

| Original              | Encoded                      |
|-----------------------|------------------------------|
| `vijaymax5555@gmail.com` | `vijaymax5555%40gmail.com` |
| `abc@group.calendar.google.com` | `abc%40group.calendar.google.com` |

## Step 5 — Deploy

```bash
npm run build && pm2 restart ibcb
```

## Example Final URL

```
https://calendar.google.com/calendar/embed?src=vijaymax5555%40gmail.com&ctz=Asia%2FKolkata&mode=MONTH&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=1&bgcolor=%23F9F7F4&color=%23B8860B
```
