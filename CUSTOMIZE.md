# Panduan Kustomisasi

Panduan ini menjelaskan cara mengganti isi Birthday Web menjadi milikmu sendiri. Urutannya dari yang paling sering diubah.

Semua perubahan cukup dilakukan di editor teks biasa. Tidak ada proses build.

## Daftar Isi

1. [Ganti password](#1-ganti-password)
2. [Ganti foto, video, dan musik](#2-ganti-foto-video-dan-musik)
3. [Ganti teks](#3-ganti-teks)
4. [Pasang form pesan](#4-pasang-form-pesan)
5. [Tambah atau kurangi isi](#5-tambah-atau-kurangi-isi)
6. [Ganti warna dan font](#6-ganti-warna-dan-font)
7. [Kompres video](#7-kompres-video)
8. [Masalah umum](#8-masalah-umum)

## 1. Ganti Password

| Password | File | Baris |
| --- | --- | --- |
| Halaman login | `js/password.js` | `const PASSWORD = '000000';` |
| Foto spesial | `js/foto.js` | `const SPECIAL_PASSWORD = '000000';` |

Ganti angka di dalam tanda kutip. Password boleh berupa huruf, tetapi kolom input di HP akan menampilkan keyboard angka karena atribut `inputmode="numeric"`. Kalau memakai huruf, hapus atribut itu di `index.html` dan `main.html`.

Lama loading setelah password benar diatur di `js/password.js`:

```js
setTimeout(() => spinner.classList.add('show'), 1000);
setTimeout(() => {
  window.location.href = 'main.html';
}, 6000);
```

Angka `6000` adalah waktu pindah halaman dalam milidetik. Spinner mulai terlihat di detik ke-1, jadi lama putarnya adalah selisih keduanya.

## 2. Ganti Foto, Video, dan Musik

Ganti file di folder `assets/` dengan file milikmu, **dengan nama yang sama persis**:

```
assets/
├── music/music.mp3
├── photo/photo1.jpg sampai photo14.jpg, salah.jpg
└── videos/video.mp4, video1.mp4, video2.mp4, video3.mp4
```

Aturan penting:

- Nama file harus huruf kecil semua dan ekstensinya sama. Hosting seperti GitHub Pages membedakan `Photo1.jpg` dengan `photo1.jpg`.
- `salah.jpg` adalah gambar yang muncul saat password login salah.
- `video.mp4` tampil di halaman utama. `video1.mp4` sampai `video3.mp4` tampil di halaman Video.
- Foto 13 dan 14 adalah dua foto spesial yang meminta password.

Kalau ingin memakai nama file lain, ubah juga nama di tempat ini:

| Aset | Tempat mengubah |
| --- | --- |
| Foto album | `main.html`, bagian `#foto`, atribut `src` |
| Gambar password salah | `index.html`, atribut `src` pada gambar popup |
| Video halaman utama | `main.html`, tag `<video id="mainVideo">` |
| Video halaman Video | `js/video.js`, array `clips` |
| Musik | `main.html`, tag `<audio id="bgMusic">` |

## 3. Ganti Teks

| Teks | File | Cara |
| --- | --- | --- |
| Surat gulungan | `js/ucapan.js` | Ubah isi `SCROLL_MESSAGE` |
| Teks ketik di halaman utama | `js/gretting.js` | Ubah `TYPING_WORDS` |
| Credit film | `main.html` | Cari bagian `<div class="credits">` |
| Judul tiap halaman | `main.html` | Ubah tag `<h1>` di setiap `<section>` |
| Teks login | `index.html` | Ubah `<h1>` dan `<h2>` di `.login-box` |
| Nama menu | `main.html` | Ubah teks di dalam `<nav id="sideNav">` |
| Tulisan di kamera | `main.html` dan `js/video.js` | Ganti `FLOWER MEMORIES` dan `FLOWER CAM` |

### Menulis surat

Pecah surat dengan tanda `+`, dan gunakan `\n` untuk pindah baris:

```js
const SCROLL_MESSAGE =
  'Paragraf pertama.\n\n' +
  'Paragraf kedua.\n\n' +
  'Nama Pembuat';
```

Jangan menekan Enter di tengah teks. Satu baris kode harus tetap satu baris.

Kecepatan mengetik diatur oleh `SCROLL_TYPE_DELAY` (milidetik per huruf). Angka lebih kecil berarti lebih cepat.

### Teks ketik di halaman utama

```js
const TYPING_WORDS = 'Selamat ulang tahun 🥳';
```

Kecepatan diatur di dalam fungsi `typeLoop`:

```js
let delay = deleting ? 40 : 30;
```

Angka `30` untuk mengetik dan `40` untuk menghapus. Nilai `1500` dan `600` di bawahnya adalah jeda setelah kalimat selesai dan setelah habis dihapus.

### Credit

Setiap bagian credit memakai pola yang sama:

```html
<p class="c-role">Peran</p>
<p class="c-name">Nama</p>
```

Kalimat penutup memakai `<p class="c-end">`. Tambah, hapus, atau urutkan sesukamu. Kecepatan gulung diatur di `css/credit.css`:

```css
.credits.rolling .credits-roll {
  animation: creditRoll 35s linear forwards;
}
```

Makin besar angka `35s`, makin pelan.

## 4. Pasang Form Pesan

Form memakai [Web3Forms](https://web3forms.com), jadi pesan masuk ke email tanpa server sendiri.

1. Buka web3forms.com, lalu masukkan email yang ingin menerima pesan.
2. Salin **access key** yang dikirim ke email itu.
3. Di `main.html`, cari baris berikut dan ganti nilainya:

```html
<input type="hidden" name="access_key" value="MASUKKAN_ACCESS_KEY_DI_SINI">
```

4. Ubah judul email yang masuk lewat input `subject` tepat di bawahnya.

Catatan:

- Access key aman terlihat di HTML karena hanya bisa dipakai untuk mengirim ke emailmu.
- Form tidak berjalan dari `file://`. Uji setelah di-deploy atau lewat server lokal.
- Paket gratis punya batas kiriman per bulan.

## 5. Tambah atau Kurangi Isi

### Menambah video di halaman Video

Di `js/video.js`, tambahkan nama file ke array `clips`:

```js
const clips = [
  'assets/videos/video1.mp4',
  'assets/videos/video2.mp4',
  'assets/videos/video3.mp4',
  'assets/videos/video4.mp4'
];
```

Label di layar kamera menyesuaikan jumlahnya otomatis. Format labelnya hanya mendukung sampai 9 klip.

### Menambah halaman buku

Buku terdiri dari **lembar** (`.sheet`). Satu lembar punya dua sisi: depan dan belakang, masing-masing memuat dua foto. Jadi menambah satu lembar berarti menambah **empat foto**.

Struktur bawaan:

- Lembar pertama: sisi depan adalah sampul depan.
- Lembar terakhir: sisi belakang adalah sampul belakang.

Untuk menambah lembar:

1. Ubah sisi belakang lembar terakhir dari sampul menjadi halaman foto:

```html
<div class="face back paper">
  <div class="photo"><img src="assets/photo/photo15.jpg" alt="Foto 15"></div>
  <div class="photo"><img src="assets/photo/photo16.jpg" alt="Foto 16"></div>
</div>
```

2. Tambahkan lembar baru di bawahnya, tepat sebelum penutup `</div>` milik `.book`, dengan sampul belakang di sisi belakangnya:

```html
<div class="sheet" data-i="5">
  <div class="face front paper">
    <div class="photo"><img src="assets/photo/photo17.jpg" alt="Foto 17"></div>
    <div class="photo"><img src="assets/photo/photo18.jpg" alt="Foto 18"></div>
  </div>
  <div class="face back cover">
    <span>♥</span>
  </div>
</div>
```

`js/foto.js` menghitung jumlah lembar otomatis, jadi tidak perlu diubah.

### Menjadikan foto biasa atau spesial

Foto spesial ditandai dengan:

```html
<div class="photo special" data-special="true">
```

Hapus `special` dan `data-special="true"` kalau ingin menjadikannya foto biasa. Semua foto otomatis tampil sebagai "?" sebelum diketuk, tidak perlu pengaturan tambahan.

Judul "Special Photo" pada halaman spesial adalah tag `<h3 class="special-title">`.

### Menghapus halaman

Hapus blok halaman dari `main.html`, lalu hapus link-nya di `<nav id="sideNav">`. Kalau menghapus halaman Video, hapus juga `video.js` dan tag script-nya.

Halaman utama (`#main`) sengaja tidak masuk menu. Ia hanya tampil pertama kali setelah login.

## 6. Ganti Warna dan Font

### Warna

Cara termudah: pakai fitur cari dan ganti di editor untuk seluruh folder `css/`.

| Elemen | Warna bawaan | File |
| --- | --- | --- |
| Latar belakang | gradient biru muda | `css/background.css` |
| Teks utama dan judul | `#123B5D` | `css/home.css`, `css/camera.css` |
| Tombol | `#164e78` | `css/home.css`, `css/pesan.css`, `css/foto.css` |
| Bodi kamera | `#454545` ke `#171717` | `css/camera.css` |
| Sampul buku | `#454545` ke `#252525`, punggung `#c5a875` | `css/foto.css` |
| Latar credit | `#17324d` dan `#254b6a` | `css/credit.css` |

### Font

Font dimuat lewat `@import` di bagian atas `css/base.css`. Untuk mengganti font:

1. Pilih font di [fonts.google.com](https://fonts.google.com) dan salin URL `@import`-nya.
2. Tambahkan di `css/base.css`.
3. Cari dan ganti nama font lama di file CSS lainnya.

Font yang dipakai: Finlandica (dasar), DM Sans, Dancing Script (tulisan tangan), dan Lilita One (judul).

### Ukuran di layar berbeda

Pengaturan responsif ada di bagian paling bawah `css/base.css`. Titik pecahnya: 360px, 480px, 768px, 1200px, dan landscape.

## 7. Kompres Video

Video besar adalah penyebab utama website terasa lambat. Target: 5 sampai 10 MB per video.

Dengan [ffmpeg](https://ffmpeg.org):

```
ffmpeg -i input.mp4 -vf scale=-2:720 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 96k -movflags +faststart output.mp4
```

Kalau tidak ingin menurunkan kualitas, cukup susun ulang file supaya bisa diputar sebelum selesai diunduh:

```
ffmpeg -i input.mp4 -c copy -movflags +faststart output.mp4
```

Tanpa ffmpeg, bisa pakai HandBrake (preset "Fast 720p30" dengan opsi "Web Optimized") atau aplikasi kompres video di HP.

Setiap file harus di bawah 100 MB, karena itu batas GitHub per file. Upload lewat web GitHub hanya mendukung file sampai 25 MB, jadi untuk file lebih besar pakai Git.

## 8. Masalah Umum

| Gejala | Kemungkinan penyebab dan solusi |
| --- | --- |
| Foto atau video tidak muncul | Nama file tidak sama persis, atau beda huruf besar-kecil |
| Musik tidak bunyi | Browser memblokir autoplay. Tekan tombol ♪ di kanan atas. Pastikan file `music.mp3` ada dan benar-benar berformat MP3 |
| Video tersendat di Chrome | File terlalu besar atau belum `faststart`. Lihat bagian 7 |
| Menu tidak bisa dibuka | Ada error JavaScript. Buka console browser dan baca pesan merahnya |
| Pesan gagal terkirim | Access key belum diganti, atau halaman dibuka dari `file://`. Uji setelah di-deploy |
| Teks surat menampilkan `\n` | Penulisan tanda garis miring salah. Gunakan satu garis miring: `\n` |
| Tombol "Kembali" di credit tidak muncul | Tombol harus berada di luar `.credits-roll`, langsung di dalam `.credits` |
| Perubahan tidak terlihat setelah disimpan | Browser memakai cache lama. Tutup tab lalu buka lagi |
| Layout berantakan setelah mengedit HTML | Ada tag `</div>` yang kurang atau berlebih. Periksa blok yang baru diubah |

Urutan script di akhir `main.html` penting. `nav.js` harus dimuat paling awal karena file lain memakai variabel yang dibuatnya.

## Catatan

Password pada proyek ini hanya penghalang ringan di JavaScript, bukan keamanan. Jangan menaruh data yang benar-benar rahasia di dalamnya.
