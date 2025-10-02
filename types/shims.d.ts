// Minimal shims to reduce editor/type errors when dependencies aren't installed.
// These do not replace real types; they are temporary shims to avoid noise.

declare module '*.css'
declare module '*.scss'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg' {
  const content: string
  export default content
}

// Allow importing non-typed modules (e.g. some third-party components) without errors.
declare module '@/*'
declare module 'geist/font/sans'
declare module 'geist/font/mono'

// Fallback for any untyped package
declare module '*'

// JSX global for environments where @types/react isn't installed yet.
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
}
