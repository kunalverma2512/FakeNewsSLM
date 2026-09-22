import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-green-600 font-bold text-xl">&#9632;</span>
          <span className="text-gray-900 font-semibold text-lg tracking-tight">TruthLens</span>
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <Link to="/" className="text-sm text-gray-700 font-medium hover:text-green-600 transition-colors">
          Home
        </Link>
        <Link to="/about" className="text-sm text-gray-700 font-medium hover:text-green-600 transition-colors">
          About
        </Link>
        <Link to="/contact" className="text-sm text-gray-700 font-medium hover:text-green-600 transition-colors">
          Contact Us
        </Link>
        <a
          href="https://github.com/kunalverma2512/FakeNewsSLM"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-green-600 font-medium hover:text-green-700 transition-colors"
        >
          GitHub
        </a>
      </div>
    </nav>
  )
}
