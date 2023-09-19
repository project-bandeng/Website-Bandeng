import axios from '../../service/axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import '../../App.css';
import { Ring } from '@uiball/loaders';

const LoadingButton = () => {
  return(
    <Ring size={20} lineWeight={5} speed={2} color="white" />
  )
}

export default function Contact() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pesan, setPesan] = useState('');
  const [category, setCategory] = useState('Umum');
  const [isLoading, setIsLoading] = useState(false)

  function handleContact() {
    setIsLoading(true)
    let dataContact = {
      nameCn: username,
      emailCn: email,
      pesanCn: pesan,
      kategoriCn: category,
    };

    axios
      .post('/api/contact/kirim', dataContact)
      .then(function (response) {
        if (response.status === 200) {
          setIsLoading(false)
          Swal.fire({
            icon: 'success',
            title: 'Good job!',
            text: 'Terimakasih Telah Menghubungi Kami',
          });
          
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.status === 400) {
          //TODO : Tmbahin handle error karena error tergantung sama field nya contoh errors:{email: ['kesalahan'], telp: ['ada'], dst...}
          setIsLoading(false)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Terjadi Kesalahan Lain.',
          });
        }
      });
  }

  return (
    <section className="contact-section" style={{ backgroundColor: '#DDE6ED' }}>
      <div className="container pt-5 pb-5">
        <h1 className="news-title text-center mb-5">Contact</h1>
        <div className="d-flex flex-lg-row flex-column align-items-center">
          <div className="Maps">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7920.56619885069!2d110.39243363598925!3d-6.975887322638056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70f4cb48ba9965%3A0x83ea7ca439df6149!2sKrobokan%2C%20Kec.%20Semarang%20Barat%2C%20Kota%20Semarang%2C%20Jawa%20Tengah!5e0!3m2!1sid!2sid!4v1693477235893!5m2!1sid!2sid"
              className="rounded maps-krobokan"
              title="Kelurahan Krobokan"
              allowfullscreen="true"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="ms-lg-5 mt-lg-0 ms-0 mt-4 container-fluid d-flex flex-column">
            <div className="mb-3">
              <label for="category" className="form-label">
                <h5>Kategori</h5>
              </label>
              <select className="form-select" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="umum">Umum</option>
                <option value="Pertanyaan">Pertanyaan</option>
                <option value="mitra">Mitra</option>
              </select>
            </div>
            <div className="mb-3">
              <label for="inputEmail" className="form-label">
                <h5>Email</h5>
              </label>
              <input type="email" className="form-control shadow" id="inputEmail" onChange={(e) => setEmail(e.target.value)} placeholder='Tuliskan Email Anda'></input>
            </div>
            <div className="mb-3">
              <label for="inputUsername" className="form-label">
                <h5>Nama Lengkap</h5>
              </label>
              <input type="text" className="form-control shadow" id="inputUsername" onChange={(e) => setUsername(e.target.value)} placeholder='Tuliskan Nama Lengkap Anda'></input>
            </div>
            <div className="mb-3">
              <label for="exampleFormControlTextarea1" className="form-label">
                <h5>Pesan</h5>
              </label>
              <textarea className="form-control shadow" id="exampleFormControlTextarea1" rows="3" onChange={(e) => setPesan(e.target.value)} placeholder='Tuliskan Pesan Anda'></textarea>
            </div>
            <button onClick={handleContact} type="submit" className="btn btn-primary col-md-4 my-3 align-self-center">
            {isLoading ? <LoadingButton /> : "Kirim Pesan"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
