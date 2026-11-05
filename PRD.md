# PRD: Birthday Web

| | |
| --- | --- |
| Jenis produk | Website hadiah ulang tahun (statis) |
| Platform | Browser mobile (prioritas), tablet, desktop |
| Teknologi | HTML, CSS, JavaScript murni |
| Hosting | GitHub Pages atau Netlify |
| Status | Selesai, tahap deploy |

## 1. Latar Belakang

Hadiah ulang tahun yang berkesan tidak selalu berupa benda. Proyek ini adalah website kecil yang merangkai video, foto, surat, dan pesan dalam satu pengalaman interaktif, sebagai kejutan untuk satu orang penerima.

Pembuat bertindak sebagai pengarah visual dan penentu konten. Penulisan kode dibantu AI.

## 2. Tujuan

1. Memberi pengalaman membuka hadiah yang terasa personal dan bertahap, bukan sekadar galeri.
2. Menyajikan kenangan (video dan foto) dan perasaan (surat) dengan tampilan yang rapi.
3. Memberi penerima jalan untuk membalas lewat form pesan yang langsung masuk ke email pembuat.
4. Berjalan lancar di HP, karena hampir pasti dibuka dari sana.

### Bukan tujuan

- Sistem keamanan atau autentikasi sungguhan.
- Akun pengguna, database, atau backend sendiri.
- Dibuka oleh banyak orang. Ini hadiah untuk satu orang.

## 3. Pengguna

| Peran | Kebutuhan |
| --- | --- |
| Penerima | Membuka hadiah dari HP, menikmati video, foto, dan surat tanpa kebingungan, lalu mengirim balasan. |
| Pembuat | Mengganti konten dengan mudah, menerima pesan balasan di email, dan men-deploy tanpa biaya. |

## 4. Alur Pengguna

```
Login (index.html)
   └─ password benar → popup + loading 5 detik → main.html
        ├─ Halaman utama: kamera + video + teks ketik
        ├─ Video: 3 klip dalam kamera
        ├─ Foto: album 3D, foto "?" dibuka satu per satu
        ├─ Ucapan: surat gulungan
        └─ Pesan: form → popup berhasil → credit roll
```

Halaman utama tidak masuk menu navigasi. Ia hanya tampil sebagai halaman pembuka setelah login.

## 5. Kebutuhan Fungsional

### 5.1 Login (`index.html`)

- Input password numerik dan tombol Masuk. Tombol Enter juga bisa dipakai.
- Password salah: popup berisi gambar, teks, dan tombol Coba Lagi.
- Password benar: popup berisi tanda berhasil dan spinner, lalu pindah ke `main.html` sekitar 5 detik kemudian.
- Latar belakang blur penuh di belakang popup.

### 5.2 Global (`main.html`)

- Latar gradient biru muda yang tetap saat halaman digulir.
- Confetti hati yang jatuh terus-menerus, dengan posisi, ukuran, dan durasi acak.
- Tombol hamburger di kiri atas membuka menu: Video, Foto, Ucapan, Pesan.
- Saat menu terbuka, halaman di belakangnya tidak bisa digulir dan diburamkan.
- Hanya satu halaman yang tampil pada satu waktu, ditandai kelas `.active`.
- Tombol musik di kanan atas memutar dan menjeda lagu latar. Musik tidak autoplay karena dibatasi browser.
- Pindah halaman menghentikan video dan menutup popup yang sedang terbuka.

### 5.3 Halaman Utama

- Judul dan kamera bergaya retro dengan layar video, indikator REC, sudut bingkai, label, dan D-pad.
- Tombol bulat di tengah D-pad berfungsi sebagai play dan jeda. REC berkedip saat video diputar.
- Teks ucapan diketik dan dihapus berulang, dimulai setelah tombol play pertama kali ditekan.

### 5.4 Video

- Kamera yang sama dengan tiga klip.
- Tombol kiri dan kanan pada D-pad mengganti klip. Jika video sedang diputar, klip berikutnya langsung diputar.
- Setelah klip selesai, lanjut otomatis ke klip berikutnya.
- Label menunjukkan urutan klip, misalnya `FLOWER CAM 01/03`.
- Petunjuk teks di bawah kamera menjelaskan cara mengganti video.

### 5.5 Foto

- Album 3D dengan sampul depan, 7 halaman isi, dan sampul belakang. Dibuka dan dibalik lewat tombol kiri dan kanan.
- 12 foto biasa dan 2 foto spesial, 2 foto per halaman.
- Foto dibuat miring dengan solasi di atasnya.
- Setiap foto awalnya tampil sebagai kotak bertanda "?". Saat diketuk, foto terbuka penuh di popup, dan kotak di album berubah menjadi fotonya.
- Popup foto punya tombol panah kembali di kiri atas.
- Foto spesial meminta password sebelum terbuka.
- Foto tidak boleh terpotong, apa pun rasio aslinya.

### 5.6 Ucapan

- Tampil sebagai kertas gulungan bergaya kuno.
- Saat diketuk, kertas memanjang ke atas disertai teks yang diketik.
- Teks bisa digulir di dalam kertas. Pengguna yang menyentuh kertas tidak dilawan oleh auto-scroll.

### 5.7 Pesan dan Credit

- Form dengan dua kolom: nama dan pesan, serta tombol Kirim.
- Pengiriman memakai Web3Forms, jadi pesan masuk langsung ke email pembuat.
- Pesan berhasil: popup konfirmasi dengan latar buram. Pesan gagal: teks galat di bawah tombol.
- Satu detik setelah popup ditutup, layar menjadi gelap, lalu berubah biru tua perlahan, dan credit bergerak seperti akhir film.
- Tombol Kembali muncul setelah seluruh teks credit keluar dari layar.

## 6. Kebutuhan Non-Fungsional

### Tampilan

| Elemen | Pilihan |
| --- | --- |
| Latar | Gradient biru muda berlapis |
| Teks utama | Biru tua `#123B5D` |
| Aksen tombol | Biru `#164e78` |
| Kamera dan sampul buku | Abu gelap dengan aksen emas pada punggung buku |
| Solasi | Kuning transparan |
| Font | Finlandica (dasar), DM Sans, Dancing Script (teks tulisan tangan), Lilita One (judul) |

### Responsif

- Prioritas utama HP berlayar 360px sampai 480px.
- Titik pecah: 360px, 480px, 768px, 1200px, dan mode landscape dengan tinggi di bawah 520px.
- Semua elemen (kamera, buku, kertas, form, popup, credit) menyesuaikan ukuran.

### Performa

- Video menjadi beban terbesar. Setiap file harus di bawah 100 MB, dan idealnya jauh lebih kecil.
- Video memakai `faststart` agar bisa mulai diputar sebelum selesai diunduh.
- Video halaman utama `preload="auto"`, video galeri `preload="metadata"`.
- Foto besar dikecilkan sebelum diunggah.
- Font Google dimuat lewat `<link>` dengan `preconnect`, hanya font yang dipakai.

### Kompatibilitas

- Chrome dan browser bawaan HP Android.
- Safari iOS (video memakai `playsinline`).
- Fitur modern yang dipakai: `backdrop-filter`, `aspect-ratio`, `IntersectionObserver`, CSS 3D transform.

### Keamanan dan Privasi

- Password hanya penghalang ringan di JavaScript, bukan keamanan. Siapa pun yang tahu alamat berkas bisa membukanya langsung, termasuk foto spesial.
- Access key Web3Forms boleh tampil di HTML karena hanya bisa dipakai untuk mengirim ke email pembuat.
- Halaman diberi `noindex` agar tidak masuk mesin pencari.
- Alamat website hanya dibagikan kepada penerima.

## 7. Struktur Proyek

```
Birthday Web/
├── index.html
├── main.html
├── assets/ (music, photo, videos)
├── css/ (base, background, confetti, home, nav, camera, gretting, foto, ucapan, pesan, credit)
└── js/ (confetti, password, nav, gretting, video, foto, ucapan, pesan)
```

## 8. Konten yang Harus Disediakan

| Konten | Jumlah | Catatan |
| --- | --- | --- |
| Video halaman utama | 1 | Disarankan di bawah 10 MB |
| Video galeri | 3 | Disarankan di bawah 10 MB per file |
| Foto album | 14 | 12 biasa dan 2 spesial |
| Gambar popup salah | 1 | Bebas |
| Musik latar | 1 | MP3 |
| Teks surat | 1 | Di `js/ucapan.js` |
| Teks credit | 1 | Di `main.html` |

## 9. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
| --- | --- | --- |
| Video terlalu besar | Tersendat di Chrome, kuota hosting cepat habis | Kompres atau `faststart`, pantau bandwidth |
| Foto dan teks pribadi bocor lewat alamat langsung | Isi hadiah terlihat orang lain | Tidak menyebar alamat, hindari konten yang benar-benar rahasia |
| Musik tidak bisa autoplay | Penerima tidak mendengar lagu | Disediakan tombol musik yang jelas |
| Web3Forms tidak jalan dari `file://` | Pesan gagal terkirim saat uji lokal | Uji setelah di-deploy |
| Kuota Web3Forms gratis habis | Pesan tidak masuk | Cukup untuk satu penerima |
| Pengetikan huruf besar-kecil nama file | Aset tidak ditemukan di hosting Linux | Semua nama file huruf kecil |

## 10. Kriteria Penerimaan

- [ ] Password salah menampilkan popup, password benar masuk ke `main.html`.
- [ ] Blur popup menutupi seluruh layar.
- [ ] Semua halaman bisa dibuka lewat menu, dan hanya satu yang tampil.
- [ ] Video diputar tanpa tersendat di Chrome HP.
- [ ] Ketiga klip bisa diganti dan label ikut berubah.
- [ ] Buku bisa dibuka sampai sampul belakang dan kembali.
- [ ] Foto "?" terbuka di popup, dan dua foto spesial meminta password.
- [ ] Surat memanjang, teks diketik, dan bisa digulir.
- [ ] Pesan terkirim dan masuk ke email pembuat.
- [ ] Credit berjalan dan tombol Kembali muncul di akhir.
- [ ] Tampilan benar pada portrait, landscape, dan layar lebar.
- [ ] Tidak ada galat merah di console.

## 11. Ide Pengembangan (di Luar Cakupan Saat Ini)

- Menyimpan status foto yang sudah dibuka dengan `localStorage`.
- Memutar musik otomatis setelah interaksi pertama.
- Hitung mundur menuju hari ulang tahun.
- Mode gelap.
- Kunci halaman `main.html` agar tidak bisa dibuka tanpa login.
