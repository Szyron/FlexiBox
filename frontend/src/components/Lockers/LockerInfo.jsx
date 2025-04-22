function LockerInfo({ locker, closeFunction }) {
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-primary font-bold text-center text-lg">Csomagautomata leírás</h2>
        <div className="divider divider-primary text-primary"></div>
        <p className="text-left text-info">{locker.description}</p>
        <div className="modal-action">
          <button className="btn btn-ghost btn-circle absolute right-2 top-2 text-info" onClick={closeFunction}>
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

export default LockerInfo;