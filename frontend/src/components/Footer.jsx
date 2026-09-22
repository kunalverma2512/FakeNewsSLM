export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-100 px-8 py-5 flex items-center justify-center">
      <p className="text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} TruthLens. Built with DeBERTa and FastAPI.
      </p>
    </footer>
  )
}
