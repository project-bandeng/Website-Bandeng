export default function SearchBar({
  textToSearch,
  setTextToSearch,
  handleSearch,
  placeholder = "Cari",
}) {
  return (
    <form className="d-inline-flex ms-5 ms-md-0" onSubmit={handleSearch}>
      <div className="input-group">
        <input
          className="form-control"
          type="search"
          placeholder={placeholder}
          aria-label="Search"
          value={textToSearch}
          onChange={(e) => setTextToSearch(e.target.value)}
        />
        <button className="btn btn-secondary rounded-end text-white" type="submit" style={{fontWeight: "bold"}}>
            Cari
        </button>
      </div>
    </form>
  );
}
