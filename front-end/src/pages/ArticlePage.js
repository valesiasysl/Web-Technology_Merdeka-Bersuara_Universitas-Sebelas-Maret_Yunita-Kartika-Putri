import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ArticlePage.css';
import articleImage from '../assets/artikel.png'; // Update with the correct path

const ArticlePage = () => {
  return (
    <div className="article-page">
      <Header />
      <div className="article-container">
        <img src={articleImage} alt="Human Rights Protest" className="article-image" />
        <div className="article-content">
          <p className="article-date">14 Juli 2023</p>
          <h1 className="article-title">Kekerasan Hak Asasi Manusia: Apa yang Perlu Anda Ketahui</h1>
          <p className="article-text">
            Kekerasan hak asasi manusia adalah masalah kompleks yang memerlukan perhatian serius dari seluruh masyarakat.
            Dengan memahami berbagai bentuk kekerasan, hak-hak yang dimiliki individu, dan langkah-langkah perlindungan
            yang dapat diambil, kita dapat bersama-sama menciptakan lingkungan yang aman dan adil bagi semua.
            Mari kita berkontribusi untuk memperjuangkan hak asasi manusia dan melindungi sesama dari kekerasan.
            Setiap individu memiliki hak untuk dilindungi dari kekerasan dan pelanggaran hak asasi manusia. Hak-hak ini
            mencakup hak untuk hidup, hak untuk tidak disiksa, dan hak untuk mengakses keadilan.
          </p>
          <p className="article-text">
            Kekerasan hak asasi manusia merupakan isu serius yang masih terjadi di berbagai belahan dunia, termasuk di
            Indonesia. Kekerasan ini dapat mengambil berbagai bentuk, seperti kekerasan dalam rumah tangga (KDRT),
            diskriminasi, dan penyiksaan. KDRT adalah salah satu bentuk yang paling umum, di mana pelaku melakukan
            tindakan kekerasan fisik, psikologis, atau seksual terhadap anggota keluarga, sering kali dalam lingkungan
            yang seharusnya aman. Diskriminasi, di sisi lain, dapat terjadi berdasarkan jenis kelamin, ras, agama, atau
            orientasi seksual, merugikan individu dalam aspek kehidupan seperti pekerjaan, pendidikan, atau layanan
            publik. Penjajahan dan perbuatan tidak manusiawi juga melanggar prinsip-prinsip dasar hak asasi manusia dan
            sering kali dilakukan oleh pihak berwenang atau individu yang memiliki kekuasaan.
          </p>
          <p className="article-text">
            Setiap individu memiliki hak untuk dilindungi dari kekerasan dan pelanggaran hak asasi manusia. Hak-hak ini
            mencakup hak untuk hidup, hak untuk tidak disiksa, dan hak untuk mengakses keadilan. Jika Anda atau seseorang
            yang Anda kenal menjadi korban kekerasan, penting untuk segera mencari bantuan dari lembaga atau organisasi
            yang fokus pada perlindungan hak asasi manusia. Lembaga ini dapat memberikan pendampingan hukum, serta
            akses ke sumber daya medis dan psikologis yang sangat dibutuhkan. Kekerasan hak asasi manusia adalah isu
            global yang membutuhkan perhatian, solidaritas, dan kerja sama dari semua pihak.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ArticlePage;
