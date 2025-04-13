import React from 'react'
import PrivacyPolicy from './PrivacyPolicy'

function FooterInfoUse({ closeFunction }) {
  return (
    <div className="modal modal-open">
    <div className="modal-box">
        <PrivacyPolicy/>
      <div className="modal-action">
        {/* Close button */}
        <button className="btn btn-info btn-circle btn-ghost absolute right-2 top-2" onClick={closeFunction}>
        ✕
        </button>
      </div>
    </div>
  </div>
  )
}

export default FooterInfoUse