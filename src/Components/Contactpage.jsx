import React from "react";

const Contactpage = () => {
    return (
      <div className="container" style={{paddingTop: '100px'}}>
        <h2>Hubungi Kami</h2>
        <p>Silakan isi formulir di bawah ini untuk menghubungi kami:</p>
        <form>
          <div className="form-group">
            <h3 for="name">Nama</h3>
            <input type="text" className="form-control" id="name" />
          </div>
          <div className="form-group">
            <h3 for="email">Email</h3>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="form-group">
            <h3 for="message">Pesan</h3>
            <textarea className="form-control" id="message" rows="4"></textarea>
          </div>
          <button type="submit" className="btn btn-primary mt-3">Kirim Pesan</button>
        </form>
      </div>
    );
  };
  
  export default Contactpage;