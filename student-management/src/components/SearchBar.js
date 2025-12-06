// ===================================================================
// BÀI 5: COMPONENT TÌM KIẾM HỌC SINH THEO TÊN
// ===================================================================

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Tìm kiếm theo tên..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;
