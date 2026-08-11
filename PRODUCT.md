# PRODUCT.md — SatwaLogi Scientific Platform

## Vision & Purpose
**SatwaLogi** adalah platform ensiklopedia ilmiah dan publikasi jurnal keanekaragaman hayati (flora & fauna tropis Indonesia) berlandaskan prinsip *Open Access* dan *Botanical Intellect Design System*.

## Target Audience
1. **Peneliti & Akademisi**: Meneliti taksonomi, menerbitkan jurnal ilmiah, dan mengakses metadata CrossRef DOI.
2. **Mahasiswa & Pelajar**: Mempelajari keanekaragaman hayati tropis, bioakustik vokalisasi satwa, dan data status konservasi IUCN.
3. **Masyarakat Umum & Ekowisata**: Mengakses ensiklopedia taksonomi flora/satwa terlindungi di Indonesia.

## Core Features
- **Ensiklopedia Taksonomi Terproteksi**: Katalog 40+ spesies flora dan satwa dengan data IUCN Red List, audio bioakustik, dan karakteristik fisik.
- **Jurnal Ilmiah & Integrasi CrossRef**: Pencarian real-time jutaan metadata artikel riset dunia via CrossRef API.
- **Editor Naskah & Peer-Review Admin**: Editor penulisan artikel ilmiah dengan antrean verifikasi moderasi Admin.
- **Bioakustik Spectrogram Soundboard**: Player audio interaktif untuk mendengarkan vokalisasi satwa tropis.
- **Habitat Explorer**: Visualisasi lanskap ekosistem dan wilayah sebaran geografis spesies di Indonesia.
- **Kalkulator Ekologi**: Alat perhitungan Indeks Keanekaragaman Hayati (Shannon-Wiener $H'$ & Simpson $D$).

## Architecture & Tech Stack
- **Frontend**: React 18 (TypeScript), Vite, Tailwind CSS with custom CSS design tokens.
- **Database**: Embedded SQLite via `sql.js` dengan auto-save dan migrasi otomatis.
- **API**: CrossRef REST API & Audio Synthesizer Web Audio API fallback.
