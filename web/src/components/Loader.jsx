export default function Loader({label = 'Loading…'}) {
  return (
    <div className="flex items-center justify-center py-16 text-gray-400">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-brand-orange" />
      <span className="ml-3 text-sm">{label}</span>
    </div>
  )
}
