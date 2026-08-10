import React, { useEffect, useState } from 'react'
import api from '../api'

function ContactItem({ contact, onDelete, onEdit }) {
  return (
    <article className="elevated rounded-xl border p-4 transition hover:border-primary/20">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-1">
          <h3 className="truncate font-medium">{contact.name}</h3>
          <p className="truncate text-sm text-muted-foreground">{contact.email}</p>
          <p className="text-sm tabular-nums">{contact.phone}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => onEdit(contact)}
            className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium transition hover:bg-muted"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(contact._id)}
            className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive transition hover:bg-destructive/20"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}

export default function Contacts() {
  const [contacts, setContacts] = useState([])
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [editing, setEditing] = useState(null)
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setErr('')
    try {
      const res = await api.get('/api/contacts')
      setContacts(res.data)
    } catch (e) {
      setErr(e.response?.data?.message || e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const resetForm = () => {
    setEditing(null)
    setForm({ name: '', email: '', phone: '' })
  }

  const submit = async (e) => {
    e.preventDefault()
    setErr('')

    if (!form.name || !form.email || !form.phone) {
      setErr('Name, email, and phone are all required')
      return
    }

    setSaving(true)
    try {
      if (editing) {
        await api.put(`/api/contacts/${editing._id}`, form)
      } else {
        await api.post('/api/contacts', form)
      }
      resetForm()
      await load()
    } catch (e) {
      setErr(e.response?.data?.message || e.message)
    } finally {
      setSaving(false)
    }
  }

  const onDelete = async (id) => {
    if (!window.confirm('Remove this contact?')) return

    setErr('')
    try {
      await api.delete(`/api/contacts/${id}`)
      if (editing?._id === id) resetForm()
      await load()
    } catch (e) {
      setErr(e.response?.data?.message || e.message)
    }
  }

  const onEdit = (contact) => {
    setEditing(contact)
    setForm({ name: contact.name, email: contact.email, phone: contact.phone })
    setErr('')
  }

  return (
    <section className="animate-fade-in space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">Your Contacts</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Keep names, numbers, and emails in one place.
          </p>
        </div>
        <div className="rounded-full border border-border/70 bg-surface px-4 py-1.5 text-sm font-medium tabular-nums">
          {contacts.length} saved
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="elevated h-fit rounded-2xl border p-5 sm:p-6">
          <h2 className="mb-4 text-lg font-semibold">
            {editing ? 'Edit contact' : 'Add someone'}
          </h2>

          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="field-input"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="field-input"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone
              </label>
              <input
                id="phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="field-input"
              />
            </div>

            {err && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {err}
              </div>
            )}

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex h-10 flex-1 items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? 'Saving…' : editing ? 'Save changes' : 'Add contact'}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-surface px-4 text-sm font-medium transition hover:bg-muted"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </aside>

        <div className="space-y-3">
          {loading && (
            <div className="rounded-xl border border-border/60 bg-surface px-4 py-8 text-center text-sm text-muted-foreground">
              Fetching your list…
            </div>
          )}

          {!loading && contacts.length === 0 && (
            <div className="rounded-xl border border-dashed border-border/70 bg-surface/50 px-4 py-12 text-center">
              <p className="font-medium">Nothing here yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Add a contact using the form on the left.
              </p>
            </div>
          )}

          {!loading &&
            contacts.map((contact) => (
              <ContactItem
                key={contact._id}
                contact={contact}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
        </div>
      </div>
    </section>
  )
}
