export default function SearchBar({
  textToSearch,
  setTextToSearch,
  handleSearch,
}) {
  return (
    <form className="d-inline-flex ms-5 ms-md-0" onSubmit={handleSearch}>
      <div className="input-group">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Cari Produk"
          aria-label="Search"
          value={textToSearch}
          onChange={(e) => setTextToSearch(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" type="submit">
            Cari
          </button>
        </div>
      </div>
    </form>
  );
}
