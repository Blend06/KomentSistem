import './globals.css'

export const metadata = {
  title: 'Sistemi i Komenteve',
  description: 'Një sistem i thjeshtë komentesh me Next.js dhe SQLite',
}

export default function RootLayout({ children }) {
  return (
    <html lang="sq">
      <body>{children}</body>
    </html>
  )
}
