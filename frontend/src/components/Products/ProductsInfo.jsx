function ProductsInfo({ product, closeFunction }) {
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        
        <h3 className="font-semibold text-lg">Terméknév: {product.name}</h3>
        <h2 className="font-bold text-center">Termék leírás</h2>
        <p className="py-4">{product.description}</p>
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

export default ProductsInfo;
