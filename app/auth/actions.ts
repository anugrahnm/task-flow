'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function logIn(formData: FormData) {
  const supabase = await createSupabaseServerClient()
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  }
  if (
    typeof data.email !== 'string' ||
    typeof data.password !== 'string' ||
    data.email.length < 3 ||
    data.password.length < 6
  ) {
    redirect('/error')
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signUp(formData: FormData) {
  const supabase = await createSupabaseServerClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  }
  if (
    typeof data.email !== 'string' ||
    typeof data.password !== 'string' ||
    data.email.length < 3 ||
    data.password.length < 6
  ) {
    redirect('/error')
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function resetPassword(formData: FormData ) {
    const supabase = await createSupabaseServerClient()
  
    const email = formData.get('email') as string
  
    if (typeof email !== 'string' || email.length < 3) {
      redirect('/error')
    }
  
    const { error } = await supabase.auth.resetPasswordForEmail(email)
  
    if (error) {
      redirect('/error')
    }
  
    revalidatePath('/', 'layout')
    redirect('/')
  }


  export async function signOut() {
    const supabase = await createSupabaseServerClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
        redirect('/error')
      }
    
      revalidatePath('/', 'layout')
      redirect('/')
  }
  