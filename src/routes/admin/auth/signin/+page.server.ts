import { error, redirect, fail } from '@sveltejs/kit'

import type { Actions } from './$types'

export const actions: Actions = {
  default: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      return fail(authError.status!, { email, message: authError.message });
    } else {
      return redirect(303, '/admin')
    }
  },
}