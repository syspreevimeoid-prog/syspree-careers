import ApplyForm from './ApplyForm.jsx'

export default function QuickApplyModal({job, onClose}) {
  if (!job) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">Quick Apply — {job.title}</p>
          <button onClick={onClose} aria-label="Close" className="text-gray-400 hover:text-gray-700">
            ✕
          </button>
        </div>
        <ApplyForm jobId={job._id} jobTitle={job.title} />
      </div>
    </div>
  )
}
