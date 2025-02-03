function ProductsInfo({ product, closeFunction }) {
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{product.name}</h3>
        <p className="py-4">{product.description}</p>
        <div className="modal-action">
          {/* Close button */}
          <button className="btn" onClick={closeFunction}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductsInfo;
