import { nanoid } from 'nanoid'

const adjectives = [
  'Swift', 'Bright', 'Cool', 'Smart', 'Quick', 'Bold', 'Calm', 'Wise', 'Kind', 'Pure',
  'Wild', 'Free', 'True', 'Fair', 'Keen', 'Fine', 'Rich', 'Deep', 'Warm', 'Clear'
]

const nouns = [
  'Fox', 'Wolf', 'Bear', 'Lion', 'Eagle', 'Hawk', 'Owl', 'Tiger', 'Shark', 'Whale',
  'Star', 'Moon', 'Sun', 'Wave', 'Fire', 'Wind', 'Rock', 'Tree', 'River', 'Ocean'
]

export function generateUsername(): string {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  const number = Math.floor(Math.random() * 10000) // Increased range for less collisions

  // Add a random suffix for extra uniqueness
  const suffix = nanoid(3) // 3 character random string

  return `${adjective}${noun}${number}${suffix}`
}

export function getStoredUsername(email: string): string {
  const stored = localStorage.getItem(`username_${email}`)
  if (stored) return stored

  const newUsername = generateUsername()
  localStorage.setItem(`username_${email}`, newUsername)
  return newUsername
}
