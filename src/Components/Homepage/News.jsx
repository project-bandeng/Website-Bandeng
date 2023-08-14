import news1 from '../../Image/news1.JPG';
import news2 from '../../Image/news2.JPG';
import news3 from '../../Image/news3.JPG';
import news4 from '../../Image/news4.JPG';
import useBackendURLTranslator from '../../hooks/useBackendURLTranslator';

import axios from '../../service/axios';
import { useState, useEffect } from 'react';

function NewsItem({ data }) {
  let convertImage = useBackendURLTranslator();

  return (
    <div className="col-md-4 d-flex flex-column gap-3 my-2" style={{ height: '170px' }}>
      <div className="card rounded-3 h-100">
        <img src={data.foto_article ? convertImage(data.foto_article) : ''} alt="logo-mitra" className="rounded-3 object-fit-cover h-100" />
      </div>
    </div>
  );
}

export default function News() {
  let [newsData, setNewsData] = useState([]);
  const fetchAllNews = () => {
    axios
      .get(`/api/article/read-all`)
      .then((res) => {
        console.log(res.data.data.slice(0, 6));
        setNewsData(res.data.data.slice(0, 6));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAllNews();
  }, []);

  return (
    <>
      <section className="news-section" style={{ backgroundColor: '#DDE6ED' }}>
        <div className="container-fluid">
          <h1 className="news-title text-center">NEWS</h1>
          <p className="text-center">Berita terbaru terkait informasi Bandeng pada wilayah Krobokan Kota Semarang</p>
          <div className="container pt-4 justify-content-center" style={{ backgroundColor: '#DDE6ED' }}>
            <div className="container-card-product row mt-1 mx-5 justify-content-center">
              {newsData.map((item, key) => {
                return <NewsItem data={item} key={key} />;
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
