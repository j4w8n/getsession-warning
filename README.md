# Demo - warning: getSession() is potentially insecure

There are no `getSession()` calls in my code. In `hooks.server.js`, I'm simply creating a `@supabase/ssr` client and fetching from a table on the server-side.

Yet, it throws: _"Using supabase.auth.getSession() is potentially insecure as it loads data directly from the storage medium (typically cookies) which may not be authentic. Prefer using supabase.auth.getUser() instead. To suppress this warning call supabase.auth.getUser() before you call supabase.auth.getSession()."_
