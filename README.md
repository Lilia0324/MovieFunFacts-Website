# Fun Facts

## 1) Setup

```bash
npm i
cp .env.example .env
# fill in env values
```

- Create a Google OAuth **Web** client with redirect:
  - `http://localhost:3000/api/auth/callback/google`
- Create a Postgres database; set `DATABASE_URL` accordingly.
- Create `NEXTAUTH_SECRET` with:
  ```bash
  openssl rand -base64 32
  ```
- Add your `OPENAI_API_KEY`.

## 2) Prisma

```bash
npx prisma migrate dev -n init
```

Optional: open Prisma Studio
```bash
npm run prisma:studio
```

## 3) Run

```bash
npm run dev
# visit http://localhost:3000/login
```

## Notes
- Middleware protects `/dashboard` and `/onboarding` from anonymous users.
- Dashboard is `dynamic` so a new fun fact is generated on each refresh.
