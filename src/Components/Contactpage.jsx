import React, { useState }  from "react";

const Contactpage = () => {
  const [category, setCategory] = useState("Umum"); // State untuk kategori

  return (
    <div className="container" style={{ paddingTop: '100px' }}>
      <h2>Hubungi Kami</h2>
      <p>Silakan isi formulir di bawah ini untuk menghubungi kami:</p>
      <form>
      <div className="form-group">
          <label htmlFor="category"><h3>Kategori</h3></label>
          <select
            className="form-control"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Umum">Umum</option>
            <option value="Pertanyaan">Pertanyaan</option>
            <option value="Masukan">Mitra</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="name"><h3>Nama</h3></label>
          <input type="text" className="form-control" id="name" />
        </div>
        <div className="form-group">
          <label htmlFor="email"><h3>Email</h3></label>
          <input type="email" className="form-control" id="email" />
        </div>
        <div className="form-group">
          <label htmlFor="message"><h3>Pesan</h3></label>
          <textarea className="form-control" id="message" rows="4"></textarea>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Kirim Pesan</button>
      </form>
    </div>
  );
};

export default Contactpage;
