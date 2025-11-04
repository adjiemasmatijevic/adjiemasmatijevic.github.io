import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { dataProvinsi } from '../mockData';
import { MapPin, Layers, ZoomIn, ZoomOut } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const PetaInteraktif = () => {
  const [mapReady, setMapReady] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('Semua');

  useEffect(() => {
    setMapReady(true);
  }, []);

  const filteredProvinsi = selectedStatus === 'Semua' 
    ? dataProvinsi 
    : dataProvinsi.filter(p => p.statusPenegasan === selectedStatus);

  const getMarkerColor = (status) => {
    switch(status) {
      case 'Disepakati': return '#22c55e';
      case 'Dalam Proses': return '#eab308';
      case 'Sengketa': return '#ef4444';
      default: return '#64748b';
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      'Disepakati': 'bg-green-100 text-green-800 border-green-300',
      'Dalam Proses': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Sengketa': 'bg-red-100 text-red-800 border-red-300'
    };
    return variants[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Peta Interaktif Batas Wilayah</h1>
          <p className="text-slate-600">Visualisasi geospasial batas wilayah nasional</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
          <Layers size={18} />
          Layer Controls
        </Button>
      </div>

      {/* Filter Status */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-slate-700">Filter Status:</span>
            <div className="flex gap-2">
              {['Semua', 'Disepakati', 'Dalam Proses', 'Sengketa'].map(status => (
                <Button
                  key={status}
                  variant={selectedStatus === status ? 'default' : 'outline'}
                  onClick={() => setSelectedStatus(status)}
                  size="sm"
                  className="transition-all"
                >
                  {status}
                </Button>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm text-slate-600">Menampilkan: </span>
              <span className="text-sm font-bold text-blue-600">{filteredProvinsi.length} provinsi</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Map */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="text-blue-600" />
            Peta Wilayah Indonesia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[600px] rounded-lg overflow-hidden border-2 border-slate-200 shadow-inner">
            {mapReady && (
              <MapContainer
                center={[-2.5, 118]}
                zoom={5}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
              >
                <LayersControl position="topright">
                  <LayersControl.BaseLayer checked name="OpenStreetMap">
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                  </LayersControl.BaseLayer>
                  <LayersControl.BaseLayer name="Satellite">
                    <TileLayer
                      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                      attribution='&copy; Esri'
                    />
                  </LayersControl.BaseLayer>
                </LayersControl>

                {filteredProvinsi.map((provinsi) => (
                  <Marker 
                    key={provinsi.id} 
                    position={[provinsi.koordinat.lat, provinsi.koordinat.lng]}
                  >
                    <Popup>
                      <div className="p-3 min-w-[250px]">
                        <h3 className="font-bold text-lg text-slate-800 mb-2">{provinsi.nama}</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Kode:</span>
                            <span className="font-semibold">{provinsi.kode}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Ibukota:</span>
                            <span className="font-semibold">{provinsi.ibukota}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Luas:</span>
                            <span className="font-semibold">{provinsi.luas.toLocaleString('id-ID')} km²</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Populasi:</span>
                            <span className="font-semibold">{provinsi.populasi.toLocaleString('id-ID')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Kab/Kota:</span>
                            <span className="font-semibold">
                              {provinsi.jumlahKabupaten + provinsi.jumlahKota}
                            </span>
                          </div>
                          <div className="pt-2 border-t">
                            <Badge className={getStatusBadge(provinsi.statusPenegasan)}>
                              {provinsi.statusPenegasan}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg">Legenda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-sm text-slate-700">Disepakati</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span className="text-sm text-slate-700">Dalam Proses</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-sm text-slate-700">Sengketa</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PetaInteraktif;