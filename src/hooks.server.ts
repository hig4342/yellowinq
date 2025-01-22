import { redirect, type Handle } from '@sveltejs/kit';

import { i18n } from '$lib/i18n';
import { sequence } from '@sveltejs/kit/hooks';

import { createServerClient } from '@supabase/ssr';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

const handleParaglide: Handle = i18n.handle();

const handleSupabase: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => event.cookies.getAll(),
      /**
       * SvelteKit's cookies API requires `path` to be explicitly set in
       * the cookie options. Setting `path` to `/` replicates previous/
       * standard behavior.
       */
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          event.cookies.set(name, value, { ...options, path: '/' })
        })
      },
    },
  })

  event.locals.safeGetSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    if (!session) {
      return { session: null, user: null }
    }

    const {
      data: { user },
      error,
    } = await event.locals.supabase.auth.getUser()
    if (error) {
      // JWT validation has failed
      return { session: null, user: null }
    }

    return { session, user }
  }

  const response = await resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range' || name === 'x-supabase-api-version'
    },
  });
  return response;
};

const handleAuthGuard: Handle = async ({ event, resolve }) => {
  const { session } = await event.locals.safeGetSession()

  if (!session && event.url.pathname.startsWith('/admin') && event.url.pathname !== '/admin/auth/signin') {
    redirect(303, '/admin/auth/signin')
  }

  if (session && event.url.pathname === '/admin/auth/signin') {
    redirect(303, '/admin')
  }

  return resolve(event);
}

export const handle: Handle = sequence(handleParaglide, handleSupabase, handleAuthGuard);