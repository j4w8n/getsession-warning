import { fail, redirect } from '@sveltejs/kit'
import { AuthApiError } from '@supabase/supabase-js'

export const load = async ({ locals: { getSession } }) => {
  const { session } = await getSession()

  /* User is already logged in. */
  if (session) redirect(303, '/')
}

export const actions = {
  signup: async ({ request, url, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get('password')

    if (email && password) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${url.origin}` }
      })

      if (error) 
        console.error(error)
      else
        return { message: 'Please check your email to confirm your signup.' }
    }
  },
  signin: async ({ request, url, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get('password')
    const provider = formData.get('provider')

    if (email && password) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
    
      if (error) {
        if (error instanceof AuthApiError && error.status === 400) {
          return fail(400, {
            error: 'Invalid credentials.',
            data: {
              email
            }
          })
        }
        return fail(500, {
          error: 'Server error. Try again later.',
          data: {
            email
          }
        })
      }

      /* Login successful, redirect. */
      redirect(303, '/')
      
    } else if (provider) {
      /* OAuth sign-in. */

      /**
       * Sign-in will not happen yet, because we're on the server-side, 
       * but we need the returned url.
       */
      const { data, error } = await supabase.auth.signInWithOAuth({ 
        provider,
        options: {
          redirectTo: `${url.origin}/auth/callback?next=/`
        }
      })

      if (error) throw error

      /* Now authorize sign-in on browser. */
      if (data.url) redirect(303, data.url)

    } else {
      return fail(400, {
        error: 'Please enter an email and password',
        data: {
          email
        }
      })
    }
  },
  signout: async ({ locals: { supabase } }) => {
    await supabase.auth.signOut()
    redirect(303, '/')
  }
}