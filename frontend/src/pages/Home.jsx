import React from 'react'
import { Link } from 'react-router-dom'
import auth from '../auth'

export default function Home() {
  const user = auth.getUserFromToken()

  if (user) {
    return (
      <section className="animate-fade-in-up mx-auto max-w-2xl text-center">
        <div className="elevated rounded-2xl border p-8 sm:p-12">
          <h1 className="mb-3 text-3xl font-semibold sm:text-4xl">
            Hey {user.username}
          </h1>
          <p className="mb-8 text-muted-foreground">
            Your contact list is ready whenever you need it.
          </p>
          <Link
            to="/contacts"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground no-underline shadow-sm transition hover:bg-primary/90"
          >
            Go to contacts
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="animate-fade-in-up mx-auto max-w-3xl text-center">
      <div className="elevated rounded-2xl border p-8 sm:p-12">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">
          Private address book
        </p>
        <h1 className="mb-4 text-3xl font-semibold sm:text-5xl">
          <span className="gradient-text">MyContacts</span>
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
          A simple place to store the people you actually call — names, numbers,
          and emails, all in one spot.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/login"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground no-underline shadow-sm transition hover:bg-primary/90"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-surface px-6 text-sm font-medium no-underline transition hover:bg-muted"
          >
            Get started
          </Link>
        </div>
      </div>
    </section>
  )
}
