import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Progress } from '../components/ui/progress';
import { dataMonitoring } from '../mockData';
import { Search, CheckSquare, MessageSquare, Upload } from 'lucide-react';

const Monitoring = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Semua');

  const filteredData = dataMonitoring.filter(item => {
    const matchSearch = item.provinsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.kabupaten.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = selectedStatus === 'Semua' || item.statusPenegasan === selectedStatus;
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

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Monitoring & Validasi</h1>
        <p className="text-slate-600">Pemantauan status penegasan batas per daerah</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <Input
                placeholder="Cari provinsi atau kabupaten..."
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
          </div>
        </CardContent>
      </Card>

      {/* Monitoring Table */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="text-blue-600" />
            Status Monitoring
          </CardTitle>
          <CardDescription>
            Menampilkan {filteredData.length} dari {dataMonitoring.length} wilayah dalam monitoring
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold">Provinsi</TableHead>
                  <TableHead className="font-semibold">Kabupaten</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Progress</TableHead>
                  <TableHead className="font-semibold">Tanggal Penegasan</TableHead>
                  <TableHead className="font-semibold">Last Update</TableHead>
                  <TableHead className="font-semibold">Validator</TableHead>
                  <TableHead className="font-semibold">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id} className="hover:bg-slate-50 transition-colors">
                    <TableCell className="font-semibold text-slate-800">{item.provinsi}</TableCell>
                    <TableCell className="text-slate-600">{item.kabupaten}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(item.statusPenegasan)}>
                        {item.statusPenegasan}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-600">Progress</span>
                          <span className="font-semibold">{item.progress}%</span>
                        </div>
                        <Progress value={item.progress} className="h-2 bg-slate-200">
                          <div className={`h-full ${getProgressColor(item.progress)} rounded-full transition-all`} />
                        </Progress>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600">{item.tanggalPenegasan}</TableCell>
                    <TableCell className="text-slate-600 text-xs">{item.lastUpdate}</TableCell>
                    <TableCell className="text-slate-600 text-sm">{item.validator}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Upload size={14} />
                          Upload
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <MessageSquare size={14} />
                          Catatan
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Activity Log */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Riwayat Aktivitas Terbaru</CardTitle>
          <CardDescription>Log pembaruan dan validasi data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800">Validasi Batas Aceh Besar - Selesai</p>
                <p className="text-xs text-slate-600 mt-1">Tim Validasi Regional I - 2024-11-15 09:30</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800">Upload Dokumen Survei GPS - Papua</p>
                <p className="text-xs text-slate-600 mt-1">Tim Validasi Regional VII - 2024-11-14 16:45</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800">Pembaruan Data Kode Wilayah - Jawa Tengah</p>
                <p className="text-xs text-slate-600 mt-1">Admin Pusat - 2024-11-14 14:20</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Monitoring;