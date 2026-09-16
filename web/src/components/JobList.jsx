import JobCard from './JobCard.jsx'

export default function JobList({jobs, onQuickApply}) {
  if (jobs.length === 0) {
    return <p className="py-16 text-center text-gray-500">No jobs match your filters right now. Try clearing a filter.</p>
  }
  return (
    <div className="space-y-5">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} onQuickApply={onQuickApply} />
      ))}
    </div>
  )
}
