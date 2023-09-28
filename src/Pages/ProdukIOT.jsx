import { useState } from 'react';
import { Ring } from '@uiball/loaders';

export default function ProdukIOT() {
  let [data, setData] = useState({
    kategori: '-',
    berat: '-',
    harga: '-',
  });

  let [isClicked, setClicked] = useState(false);

  let onClickHandle = () => {
    let temp = {
      kategori: 'Besar',
      berat: '306',
      harga: '15.000',
    };
    setData(temp);
    setClicked(true);
  };

  return (
    <div className="container d-flex justify-content-center flex-column" style={{ marginTop: '5rem', height: '50vh' }}>
      <div className="row d-flex justify-content-center">
        <div className="col-12 col-md-6 d-flex justify-content-center flex-column align-items-center gap-3">
          <h1 className="text-center">Data Deteksi Bandeng</h1>
          <div className={`d-flex justify-content-center align-items-center py-1 px-2 rounded ${isClicked ? "bg-success" : "bg-warning"}`}>
            {!isClicked && <Ring size={20} lineWeight={5} speed={2} color="black" />}
            <p>{isClicked ? 'Terdeteksi' : 'Mendeteksi..'}</p>
            </div>
          <table class="table">
            <tbody>
              <tr>
                <th scope="row">Kategori</th>
                <td>{data.kategori}</td>
              </tr>
              <tr>
                <th scope="row">Berat</th>
                <td>{data.berat} gram</td>
              </tr>
              <tr>
                <th scope="row">Harga</th>
                <td>Rp. {data.harga}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={onClickHandle} className="btn btn-primary px-4">
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
}
