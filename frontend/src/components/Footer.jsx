export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 py-6 text-center shrink-0">
      <p className="text-sm text-gray-500 font-medium">
        &copy; {new Date().getFullYear()} TruthLens. Built with RoBERTa and FastAPI.
      </p>
    </footer>
  )
}
