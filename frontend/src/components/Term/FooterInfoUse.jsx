import TermOfUse from './TermOfUse'

function FooterInfoUse({ closeFunction }) {
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <TermOfUse />
        <div className="modal-action">
          <button className="btn btn-info btn-circle btn-ghost absolute right-2 top-2 font-bold text-primary text-2xl" onClick={closeFunction}>
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}

export default FooterInfoUse