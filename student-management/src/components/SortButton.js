// ===================================================================
// BÀI 6: COMPONENT SẮP XẾP HỌC SINH THEO TÊN
// ===================================================================

function SortButton({ sortAsc, setSortAsc }) {
  return (
    <div className="sort-container">
      <button onClick={() => setSortAsc(prev => !prev)} className="sort-btn">
        Sắp xếp theo tên: {sortAsc ? 'A → Z' : 'Z → A'}
      </button>
    </div>
  );
}

export default SortButton;
