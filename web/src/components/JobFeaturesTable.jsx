export default function JobFeaturesTable({job}) {
  const rows = [
    ['Job Category', job.category?.title],
    ['Position', job.title],
    ['Experience', job.experience],
    ['Location', job.locations?.map((l) => l.title).join(', ')],
  ].filter(([, value]) => value)

  return (
    <div className="mt-10 overflow-hidden rounded-lg border border-gray-200">
      <h3 className="bg-gray-50 px-5 py-3 text-sm font-semibold text-gray-700">Job Features</h3>
      <table className="w-full text-sm">
        <tbody>
          {rows.map(([label, value]) => (
            <tr key={label} className="border-t border-gray-200">
              <td className="w-1/3 px-5 py-3 font-medium text-gray-600">{label}</td>
              <td className="px-5 py-3 text-gray-800">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
