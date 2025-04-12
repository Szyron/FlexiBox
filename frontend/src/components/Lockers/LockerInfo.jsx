function LockerInfo({ locker, closeFunction }) {
    return (
      <div className="modal modal-open">
        <div className="modal-box">
          <p className="py-4">{locker.description}</p>
          <div className="modal-action">
            {/* Close button */}
            <button className="btn btn-info" onClick={closeFunction}>
              Bezárás
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default LockerInfo;