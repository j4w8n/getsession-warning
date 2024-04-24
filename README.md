# Demo - user object warning

> I hijacked a previous warning demo. Hence the `getsession-warning` repo name and verbiage.

There are no references to `session.user`, but it logs this warning five times after a login, or page refresh with a logged-in user:

_"Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and many not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."_

## Test
```
git clone https://github.com/j4w8n/getsession-warning.git
cd getsession-warning
npm install
```

Add your .env.local file with supabase url and anon key.

Server-side login requires you to setup proper redirects in your Supabase dashboard, to `http://localhost:5173/auth/callback`.

```
npm run dev
```

Browse to http://localhost:5173, login, and you'll see the session.user warning in the server console.
