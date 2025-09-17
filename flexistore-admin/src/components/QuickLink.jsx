import  { ChevronRightIcon} from '@heroicons/react/24/outline'
import {Link } from 'react-router-dom'

function QuickLink({ icon, label, to }) {
  return (
        <Link
      to={to}
      className="flex items-center justify-between p-3 rounded-lg hover:bg-info transition-colors btn bg-primary"
    >
      <div className="flex items-center gap-3 text-white">
        <span className="material-symbols-outlined text-[var(--text-primary)]">
          {icon}
        </span>
        <span className="font-medium">{label}</span>
      </div>
        <ChevronRightIcon className="w-5 h-5 text-[var(--text-primary)]" />
    </Link>
  )
}

export default QuickLink