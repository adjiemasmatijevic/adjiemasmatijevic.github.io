import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { statistikNasional, dataProvinsi } from '../mockData';
import { Map, FileCheck, AlertCircle, TrendingUp } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Dashboard = () => {
  const stats = statistikNasional;
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    setMapReady(true);
  }, []);

  const statsCards = [
    { title: 'Provinsi', value: stats.provinsi, icon: Map, color: 'bg-blue-500' },
    { title: 'Kabupaten/Kota', value: stats.kabupaten, icon: Map, color: 'bg-green-500' },
    { title: 'Kecamatan', value: stats.kecamatan.toLocaleString(), icon: Map, color: 'bg-purple-500' },
    { title: 'Kelurahan/Desa', value: stats.kelurahan.toLocaleString(), icon: Map, color: 'bg-orange-500' }
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard Utama</h1>
        <p className="text-slate-600">Gambaran umum status batas wilayah nasional</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon size={24} className="text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Status Penegasan & Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Penegasan */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="text-blue-600" />
              Status Penegasan Batas
            </CardTitle>
            <CardDescription>Persentase status penegasan batas wilayah</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Sudah Disepakati</span>
                <span className="text-sm font-bold text-green-600">{stats.statusPenegasan.disepakati}%</span>
              </div>
              <Progress value={stats.statusPenegasan.disepakati} className="h-3 bg-slate-200">
                <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all" />
              </Progress>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Dalam Proses</span>
                <span className="text-sm font-bold text-yellow-600">{stats.statusPenegasan.dalamProses}%</span>
              </div>
              <Progress value={stats.statusPenegasan.dalamProses} className="h-3 bg-slate-200">
                <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full transition-all" />
              </Progress>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Sengketa</span>
                <span className="text-sm font-bold text-red-600">{stats.statusPenegasan.sengketa}%</span>
              </div>
              <Progress value={stats.statusPenegasan.sengketa} className="h-3 bg-slate-200">
                <div className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all" />
              </Progress>
            </div>
          </CardContent>
        </Card>

        {/* Progress Integrasi */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="text-blue-600" />
              Progress Integrasi Kode Wilayah
            </CardTitle>
            <CardDescription>Integrasi data kode wilayah dengan geospasial</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-32">
              <div className="text-center">
                <div className="text-6xl font-bold text-blue-600 mb-2">{stats.progressIntegrasi}%</div>
                <p className="text-sm text-slate-600">Data Terintegrasi</p>
              </div>
            </div>
            <Progress value={stats.progressIntegrasi} className="h-3 bg-slate-200 mt-4">
              <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all" />
            </Progress>
          </CardContent>
        </Card>
      </div>

      {/* Peta Overview */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="text-blue-600" />
            Peta Overview Wilayah Indonesia
          </CardTitle>
          <CardDescription>Kondisi status penegasan batas per provinsi</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 rounded-lg overflow-hidden border border-slate-200">
            {mapReady && (
              <MapContainer
                center={[-2.5, 118]}
                zoom={5}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                {dataProvinsi.map((provinsi) => (
                  <Marker key={provinsi.id} position={[provinsi.koordinat.lat, provinsi.koordinat.lng]}>
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-bold text-slate-800">{provinsi.nama}</h3>
                        <p className="text-sm text-slate-600">Kode: {provinsi.kode}</p>
                        <p className="text-sm text-slate-600">Ibukota: {provinsi.ibukota}</p>
                        <p className={`text-sm font-semibold mt-1 ${
                          provinsi.statusPenegasan === 'Disepakati' ? 'text-green-600' :
                          provinsi.statusPenegasan === 'Dalam Proses' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          Status: {provinsi.statusPenegasan}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;