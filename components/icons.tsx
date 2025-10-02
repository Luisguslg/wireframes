import React from 'react'

// Minimal placeholder icons. These are tiny inline SVGs used as safe fallbacks when
// the real icon library is not installed. They keep the UI from crashing and are
// visually neutral. Replace with real icons when dependencies are available.

export const Icon = ({ children }: { children?: React.ReactNode }) => (
  <span style={{ display: 'inline-flex', width: 16, height: 16, alignItems: 'center', justifyContent: 'center' }}>
    {children}
  </span>
)

export const Search = () => (
  <Icon>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
  </Icon>
)

export const Heart = () => (
  <Icon>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-8-4.35-8-11a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 6.65-8 11-8 11z" /></svg>
  </Icon>
)

export const Star = () => (
  <Icon>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .587l3.668 7.431L24 9.748l-6 5.848L19.335 24 12 19.771 4.665 24 6 15.596 0 9.748l8.332-1.73z"/></svg>
  </Icon>
)

export const MapPin = () => (
  <Icon>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>
  </Icon>
)

export const Calendar = () => (
  <Icon>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg>
  </Icon>
)
