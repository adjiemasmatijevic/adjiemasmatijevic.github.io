import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { dataProvinsi } from '../mockData';
import { Search, MapPin, Download, Filter } from 'lucide-react';

const MasterWilayah = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Semua');

  const filteredData = dataProvinsi.filter(provinsi => {
    const matchSearch = provinsi.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       provinsi.kode.includes(searchTerm);
    const matchStatus = selectedStatus === 'Semua' || provinsi.statusPenegasan === selectedStatus;
    return matchSearch && matchStatus;
  });

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
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Master Data Wilayah</h1>
        <p className="text-slate-600">Data provinsi, kabupaten, kecamatan, dan kelurahan/desa</p>
      </div>

      {/* Filters & Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <Input
                placeholder="Cari nama provinsi atau kode..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Status Filter */}
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

            {/* Export Button */}
            <Button variant="outline" className="gap-2">
              <Download size={18} />
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="text-blue-600" />
            Data Provinsi
          </CardTitle>
          <CardDescription>
            Menampilkan {filteredData.length} dari {dataProvinsi.length} provinsi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold">Kode</TableHead>
                  <TableHead className="font-semibold">Nama Provinsi</TableHead>
                  <TableHead className="font-semibold">Ibukota</TableHead>
                  <TableHead className="font-semibold">Luas (km²)</TableHead>
                  <TableHead className="font-semibold">Populasi</TableHead>
                  <TableHead className="font-semibold">Kab/Kota</TableHead>
                  <TableHead className="font-semibold">Status Penegasan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((provinsi) => (
                  <TableRow key={provinsi.id} className="hover:bg-slate-50 transition-colors">
                    <TableCell className="font-medium">{provinsi.kode}</TableCell>
                    <TableCell className="font-semibold text-slate-800">{provinsi.nama}</TableCell>
                    <TableCell className="text-slate-600">{provinsi.ibukota}</TableCell>
                    <TableCell className="text-slate-600">{provinsi.luas.toLocaleString('id-ID')}</TableCell>
                    <TableCell className="text-slate-600">{provinsi.populasi.toLocaleString('id-ID')}</TableCell>
                    <TableCell className="text-slate-600">
                      {provinsi.jumlahKabupaten + provinsi.jumlahKota}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(provinsi.statusPenegasan)}>
                        {provinsi.statusPenegasan}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-green-700 mb-1">Total Disepakati</p>
              <p className="text-3xl font-bold text-green-800">
                {dataProvinsi.filter(p => p.statusPenegasan === 'Disepakati').length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-yellow-700 mb-1">Dalam Proses</p>
              <p className="text-3xl font-bold text-yellow-800">
                {dataProvinsi.filter(p => p.statusPenegasan === 'Dalam Proses').length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-red-700 mb-1">Sengketa</p>
              <p className="text-3xl font-bold text-red-800">
                {dataProvinsi.filter(p => p.statusPenegasan === 'Sengketa').length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MasterWilayah;