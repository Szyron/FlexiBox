import { Link } from "react-router-dom"

function SidebarLink({ icon, label, active, to }) {
    return (
        <Link
            to={to}
            className={`flex uppercase items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg hover:bg-[var(--bg-base-300)] hover:text-primary transition-colors ${active ? "bg-[var(--bg-base-300)] text-info" : ""
                }`}
        >
            <span className="material-symbols-outlined">{icon}</span>
            <span>{label}</span>
        </Link>
    )
}

export default SidebarLink