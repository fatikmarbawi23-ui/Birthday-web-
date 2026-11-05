# Birthday Web

Website ulang tahun interaktif yang dibuat sebagai hadiah. Dibangun dengan HTML, CSS, dan JavaScript murni, tanpa framework dan tanpa proses build.

## Fitur

- **Halaman login** dengan password sederhana, popup salah dan benar, serta animasi loading sebelum masuk.
- **Confetti hati** yang jatuh di latar belakang dengan gradient biru muda.
- **Halaman utama** berupa kamera retro yang memutar video, lengkap dengan indikator REC dan teks ucapan yang diketik otomatis setelah tombol play ditekan.
- **Galeri video** dengan tiga klip yang bisa diganti lewat tombol kiri dan kanan pada kamera.
- **Album foto 3D** dengan efek membalik halaman, foto miring bergaya polaroid dengan solasi, dan foto yang baru terbuka setelah diketuk. Dua foto spesial dikunci dengan password.
- **Surat gulungan** yang memanjang saat diketuk, disertai teks yang diketik pelan-pelan dan bisa digulir.
- **Form pesan** yang terhubung ke [Web3Forms](https://web3forms.com), sehingga pesan langsung masuk ke email tanpa backend.
- **Credit roll** bergaya film setelah pesan terkirim.
- **Musik latar** yang dikontrol lewat tombol di pojok kanan atas.
- **Navigasi hamburger** untuk berpindah halaman tanpa memuat ulang.
- **Responsif** untuk HP, tablet, desktop, dan layar landscape.

## Struktur Folder

```
Birthday Web/
├── index.html
├── main.html
├── assets/
│   ├── music/
│   ├── photo/
│   └── videos/
├── css/
│   ├── base.css
│   ├── background.css
│   ├── confetti.css
│   ├── home.css
│   ├── nav.css
│   ├── camera.css
│   ├── gretting.css
│   ├── foto.css
│   ├── ucapan.css
│   ├── pesan.css
│   └── credit.css
└── js/
    ├── confetti.js
    ├── password.js
    ├── nav.js
    ├── gretting.js
    ├── video.js
    ├── foto.js
    ├── ucapan.js
    └── pesan.js
```

## Menjalankan di Lokal

Buka `index.html` langsung di browser, atau jalankan server lokal agar semua fitur berjalan sempurna:

```
npx serve .
```

Atau dengan Python:

```
python -m http.server 8000
```

Lalu buka `http://localhost:8000`.

## Kustomisasi

| Yang ingin diubah | File |
| --- | --- |
| Password halaman login | `js/password.js` |
| Password foto spesial | `js/foto.js` |
| Isi surat gulungan | `js/ucapan.js` |
| Teks yang diketik di halaman utama | `js/gretting.js` |
| Daftar video pada galeri | `js/video.js` |
| Foto pada album | `main.html` bagian `#foto` |
| Teks credit | `main.html` bagian `.credits` |
| Warna dan font | `css/` dan `css/base.css` |
| Access key form pesan | `main.html` bagian `#pesan` |

Untuk form pesan, daftar di [web3forms.com](https://web3forms.com) dengan email penerima, lalu tempel access key yang dikirim ke dalam input `access_key`.

## Catatan Performa

Video berukuran besar akan terasa berat saat dibuka lewat internet. Beberapa langkah yang membantu:

- Kompres video ke 720p, atau minimal pindahkan info pemutaran ke awal file tanpa mengubah kualitas:

```
ffmpeg -i input.mp4 -c copy -movflags +faststart output.mp4
```

- Kecilkan foto beresolusi tinggi sebelum diunggah.
- Pastikan setiap file di bawah 100 MB, karena itu batas GitHub per file.

## Deploy ke GitHub Pages

1. Unggah proyek ke repository GitHub, dengan `index.html` berada di folder paling atas.
2. Buka **Settings**, lalu **Pages**.
3. Pilih branch `main` dan folder `/ (root)`, lalu simpan.
4. Tunggu sekitar satu menit, lalu buka link yang muncul.

Alternatif lain adalah Netlify Drop: tarik folder proyek ke halamannya tanpa perlu Git.

## Catatan Keamanan

Password pada proyek ini hanya penghalang ringan yang tertulis di JavaScript, bukan sistem keamanan. Siapa pun yang mengetahui alamat file bisa mengaksesnya langsung. Jangan menyimpan data yang benar-benar rahasia di dalamnya.

## Teknologi

- HTML5
- CSS3 (flexbox, grid, 3D transform, backdrop-filter, media query)
- JavaScript (vanilla)
- Google Fonts
- Web3Forms

## Lisensi

Proyek pribadi. Seluruh foto, video, dan musik adalah milik pembuatnya.
