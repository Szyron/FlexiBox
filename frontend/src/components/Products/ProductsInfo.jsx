function ProductsInfo({ product, closeFunction }) {
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-primary font-bold text-center text-lg">Termék leírás</h2>
        <div className="divider divider-primary text-primary"></div>
        <p className="text-info text-left">{product.description}</p>
        <div className="modal-action">
          {/* Close button */}
          <button className="btn btn-ghost btn-circle absolute right-2 top-2 text-info" onClick={closeFunction}>
          ✕
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductsInfo;
