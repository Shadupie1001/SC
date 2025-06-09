import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default function CustomerForm() {
  const [form, setForm] = useState({ email: '', city: '', state: '', country: 'USA' })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase.from('customers').insert([form])
    if (error) {
      setStatus('Error: ' + error.message)
    } else {
      setStatus('Customer added!')
      setForm({ email: '', city: '', state: '', country: 'USA' })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {['email', 'city', 'state', 'country'].map((field) => (
        <input
          key={field}
          name={field}
          value={form[field]}
          onChange={handleChange}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          className="w-full border p-2 rounded"
          required={field === 'email'}
        />
      ))}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
      <div>{status}</div>
    </form>
  )
}