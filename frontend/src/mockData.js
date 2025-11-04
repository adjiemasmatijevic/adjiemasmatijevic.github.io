// Mock data untuk Sistem Informasi Batas Wilayah

export const statistikNasional = {
  provinsi: 38,
  kabupaten: 416,
  kecamatan: 7024,
  kelurahan: 83931,
  statusPenegasan: {
    disepakati: 75,
    dalamProses: 20,
    sengketa: 5
  },
  progressIntegrasi: 82
};

export const dataProvinsi = [
  {
    id: 1,
    kode: '11',
    nama: 'Aceh',
    ibukota: 'Banda Aceh',
    luas: 57956.0,
    populasi: 5371532,
    jumlahKabupaten: 18,
    jumlahKota: 5,
    statusPenegasan: 'Disepakati',
    koordinat: { lat: 4.695135, lng: 96.749397 }
  },
  {
    id: 2,
    kode: '12',
    nama: 'Sumatera Utara',
    ibukota: 'Medan',
    luas: 72981.2,
    populasi: 14799361,
    jumlahKabupaten: 25,
    jumlahKota: 8,
    statusPenegasan: 'Disepakati',
    koordinat: { lat: 2.115340, lng: 99.545929 }
  },
  {
    id: 3,
    kode: '13',
    nama: 'Sumatera Barat',
    ibukota: 'Padang',
    luas: 42012.9,
    populasi: 5534472,
    jumlahKabupaten: 12,
    jumlahKota: 7,
    statusPenegasan: 'Dalam Proses',
    koordinat: { lat: -0.949800, lng: 100.352463 }
  },
  {
    id: 4,
    kode: '31',
    nama: 'DKI Jakarta',
    ibukota: 'Jakarta',
    luas: 664.0,
    populasi: 10557810,
    jumlahKabupaten: 1,
    jumlahKota: 5,
    statusPenegasan: 'Disepakati',
    koordinat: { lat: -6.208763, lng: 106.845599 }
  },
  {
    id: 5,
    kode: '32',
    nama: 'Jawa Barat',
    ibukota: 'Bandung',
    luas: 35377.8,
    populasi: 49316712,
    jumlahKabupaten: 18,
    jumlahKota: 9,
    statusPenegasan: 'Disepakati',
    koordinat: { lat: -7.090911, lng: 107.668887 }
  },
  {
    id: 6,
    kode: '33',
    nama: 'Jawa Tengah',
    ibukota: 'Semarang',
    luas: 32800.7,
    populasi: 36516035,
    jumlahKabupaten: 29,
    jumlahKota: 6,
    statusPenegasan: 'Dalam Proses',
    koordinat: { lat: -7.150975, lng: 110.140259 }
  },
  {
    id: 7,
    kode: '51',
    nama: 'Bali',
    ibukota: 'Denpasar',
    luas: 5780.1,
    populasi: 4317404,
    jumlahKabupaten: 8,
    jumlahKota: 1,
    statusPenegasan: 'Disepakati',
    koordinat: { lat: -8.409518, lng: 115.188919 }
  },
  {
    id: 8,
    kode: '91',
    nama: 'Papua',
    ibukota: 'Jayapura',
    luas: 319036.1,
    populasi: 4303707,
    jumlahKabupaten: 28,
    jumlahKota: 1,
    statusPenegasan: 'Sengketa',
    koordinat: { lat: -4.269928, lng: 138.080353 }
  }
];

export const dataDokumen = [
  {
    id: 1,
    nomor: 'BA/001/2023',
    jenis: 'Berita Acara Kesepakatan Batas',
    tanggal: '2023-03-15',
    wilayahTerkait: 'Jawa Barat - Jawa Tengah',
    status: 'Final',
    penandatangan: 'Gubernur Jawa Barat, Gubernur Jawa Tengah',
    file: 'ba_jabar_jateng_2023.pdf'
  },
  {
    id: 2,
    nomor: 'PERMENDAGRI/045/2023',
    jenis: 'Permendagri Penetapan',
    tanggal: '2023-05-20',
    wilayahTerkait: 'Sumatera Utara',
    status: 'Final',
    penandatangan: 'Menteri Dalam Negeri',
    file: 'permendagri_sumut_2023.pdf'
  },
  {
    id: 3,
    nomor: 'SK/089/2023',
    jenis: 'Surat Keputusan',
    tanggal: '2023-07-10',
    wilayahTerkait: 'Aceh',
    status: 'Draft',
    penandatangan: 'Dirjen Otda',
    file: 'sk_aceh_2023.pdf'
  },
  {
    id: 4,
    nomor: 'BA/012/2024',
    jenis: 'Berita Acara Kesepakatan Batas',
    tanggal: '2024-01-25',
    wilayahTerkait: 'Bali - Nusa Tenggara Barat',
    status: 'Final',
    penandatangan: 'Gubernur Bali, Gubernur NTB',
    file: 'ba_bali_ntb_2024.pdf'
  },
  {
    id: 5,
    nomor: 'BA/015/2024',
    jenis: 'Berita Acara Kesepakatan Batas',
    tanggal: '2024-03-12',
    wilayahTerkait: 'Papua',
    status: 'Dalam Proses',
    penandatangan: 'Tim Penegasan Batas Papua',
    file: 'ba_papua_draft_2024.pdf'
  }
];

export const dataMonitoring = [
  {
    id: 1,
    provinsi: 'Aceh',
    kabupaten: 'Aceh Besar',
    statusPenegasan: 'Disepakati',
    tanggalPenegasan: '2022-11-15',
    progress: 100,
    lastUpdate: '2023-02-10',
    validator: 'Tim Validasi Regional I'
  },
  {
    id: 2,
    provinsi: 'Sumatera Barat',
    kabupaten: 'Padang Pariaman',
    statusPenegasan: 'Dalam Proses',
    tanggalPenegasan: '-',
    progress: 65,
    lastUpdate: '2024-10-20',
    validator: 'Tim Validasi Regional I'
  },
  {
    id: 3,
    provinsi: 'Jawa Tengah',
    kabupaten: 'Semarang',
    statusPenegasan: 'Dalam Proses',
    tanggalPenegasan: '-',
    progress: 78,
    lastUpdate: '2024-11-01',
    validator: 'Tim Validasi Regional III'
  },
  {
    id: 4,
    provinsi: 'Papua',
    kabupaten: 'Jayapura',
    statusPenegasan: 'Sengketa',
    tanggalPenegasan: '-',
    progress: 30,
    lastUpdate: '2024-09-15',
    validator: 'Tim Validasi Regional VII'
  },
  {
    id: 5,
    provinsi: 'Bali',
    kabupaten: 'Badung',
    statusPenegasan: 'Disepakati',
    tanggalPenegasan: '2023-05-20',
    progress: 100,
    lastUpdate: '2023-06-10',
    validator: 'Tim Validasi Regional IV'
  }
];

export const dataIntegrasi = [
  {
    id: 1,
    namaAPI: 'BIG Geospasial API',
    status: 'Aktif',
    lastSync: '2024-11-15 08:30:00',
    records: 83931,
    endpoint: 'https://api.big.go.id/v1/boundaries'
  },
  {
    id: 2,
    namaAPI: 'BPS Wilayah API',
    status: 'Aktif',
    lastSync: '2024-11-15 07:15:00',
    records: 7024,
    endpoint: 'https://api.bps.go.id/v1/regions'
  },
  {
    id: 3,
    namaAPI: 'Kemendagri Master Wilayah',
    status: 'Error',
    lastSync: '2024-11-14 22:00:00',
    records: 0,
    endpoint: 'https://api.kemendagri.go.id/v1/regions'
  },
  {
    id: 4,
    namaAPI: 'KemenkopUKM Data',
    status: 'Aktif',
    lastSync: '2024-11-15 06:00:00',
    records: 416,
    endpoint: 'https://api.kemenkopukm.go.id/v1/areas'
  }
];

export const chartDataStatus = [
  { name: 'Jan', disepakati: 65, proses: 25, sengketa: 10 },
  { name: 'Feb', disepakati: 67, proses: 24, sengketa: 9 },
  { name: 'Mar', disepakati: 68, proses: 24, sengketa: 8 },
  { name: 'Apr', disepakati: 70, proses: 23, sengketa: 7 },
  { name: 'Mei', disepakati: 71, proses: 22, sengketa: 7 },
  { name: 'Jun', disepakati: 72, proses: 22, sengketa: 6 },
  { name: 'Jul', disepakati: 73, proses: 21, sengketa: 6 },
  { name: 'Agu', disepakati: 74, proses: 21, sengketa: 5 },
  { name: 'Sep', disepakati: 75, proses: 20, sengketa: 5 },
  { name: 'Okt', disepakati: 75, proses: 20, sengketa: 5 },
];

export const chartDataWilayah = [
  { name: 'Sumatra', kabupaten: 154 },
  { name: 'Jawa', kabupaten: 119 },
  { name: 'Kalimantan', kabupaten: 56 },
  { name: 'Sulawesi', kabupaten: 82 },
  { name: 'Papua', kabupaten: 43 },
  { name: 'Bali & Nusa Tenggara', kabupaten: 22 },
  { name: 'Maluku', kabupaten: 19 }
];

// GeoJSON data untuk peta (simplified Indonesia boundaries)
export const indonesiaGeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'Aceh',
        kode: '11',
        status: 'Disepakati'
      },
      geometry: {
        type: 'Point',
        coordinates: [96.749397, 4.695135]
      }
    },
    {
      type: 'Feature',
      properties: {
        name: 'Sumatera Utara',
        kode: '12',
        status: 'Disepakati'
      },
      geometry: {
        type: 'Point',
        coordinates: [99.545929, 2.115340]
      }
    },
    {
      type: 'Feature',
      properties: {
        name: 'Sumatera Barat',
        kode: '13',
        status: 'Dalam Proses'
      },
      geometry: {
        type: 'Point',
        coordinates: [100.352463, -0.949800]
      }
    },
    {
      type: 'Feature',
      properties: {
        name: 'DKI Jakarta',
        kode: '31',
        status: 'Disepakati'
      },
      geometry: {
        type: 'Point',
        coordinates: [106.845599, -6.208763]
      }
    },
    {
      type: 'Feature',
      properties: {
        name: 'Jawa Barat',
        kode: '32',
        status: 'Disepakati'
      },
      geometry: {
        type: 'Point',
        coordinates: [107.668887, -7.090911]
      }
    },
    {
      type: 'Feature',
      properties: {
        name: 'Jawa Tengah',
        kode: '33',
        status: 'Dalam Proses'
      },
      geometry: {
        type: 'Point',
        coordinates: [110.140259, -7.150975]
      }
    },
    {
      type: 'Feature',
      properties: {
        name: 'Bali',
        kode: '51',
        status: 'Disepakati'
      },
      geometry: {
        type: 'Point',
        coordinates: [115.188919, -8.409518]
      }
    },
    {
      type: 'Feature',
      properties: {
        name: 'Papua',
        kode: '91',
        status: 'Sengketa'
      },
      geometry: {
        type: 'Point',
        coordinates: [138.080353, -4.269928]
      }
    }
  ]
};