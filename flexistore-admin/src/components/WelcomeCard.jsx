import React from 'react'
import  { HandRaisedIcon} from '@heroicons/react/24/outline'

function WelcomeCard() {
  return (
        <div className="card rounded-lg p-6 text-center flex flex-col items-center justify-center bg-base-100">
      <div className="p-4 bg-[var(--bg-base-300)] rounded-full inline-block">
      </div>
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
            <path d="M20.3873 7.1575L11.9999 12L3.60913 7.14978" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 12V21" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 2.57735C11.6188 2.22008 12.3812 2.22008 13 2.57735L19.6603 6.42265C20.2791 6.77992 20.6603 7.44017 20.6603 8.1547V15.8453C20.6603 16.5598 20.2791 17.2201 19.6603 17.5774L13 21.4226C12.3812 21.7799 11.6188 21.7799 11 21.4226L4.33975 17.5774C3.72094 17.2201 3.33975 16.5598 3.33975 15.8453V8.1547C3.33975 7.44017 3.72094 6.77992 4.33975 6.42265L11 2.57735Z" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.5 4.5L16 9" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      <h2 className="mt-4 text-xl sm:text-2xl font-bold text-primary">
        Üdvözlünk újra, Balázs!
      </h2>
      <p className="mt-2 text-info max-w-md mx-auto text-sm sm:text-base">
        Minden, amire az üzemeltetéshez szükséged van, egy helyen. Itt kezelheted a
        FlexiStore rendszer működését és beállításait.
      </p>
    </div>
  )
}

export default WelcomeCard