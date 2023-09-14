import { Ring } from "@uiball/loaders";
export default function SearchBar({
  textToSearch,
  setTextToSearch,
  handleSearch,
  placeholder = "Cari",
  buttonIsLoading=false
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
            {buttonIsLoading ? (<Ring size={20} lineWeight={5} speed={2} color="white" />): "Cari"}
        </button>
      </div>
    </form>
  );
}
