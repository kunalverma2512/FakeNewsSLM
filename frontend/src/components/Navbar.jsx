export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-green-600 font-bold text-xl">&#9632;</span>
        <span className="text-gray-900 font-semibold text-lg tracking-tight">TruthLens</span>
      </div>
      <a
        href="https://github.com/kunalverma2512"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-green-600 font-medium hover:text-green-700 transition-colors"
      >
        GitHub
      </a>
    </nav>
  )
}
