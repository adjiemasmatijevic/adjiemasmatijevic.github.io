import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { dataDokumen } from '../mockData';
import { Search, FileText, Download, Eye, Upload } from 'lucide-react';

const MasterDokumen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJenis, setSelectedJenis] = useState('Semua');

  const jenisOptions = ['Semua', 'Berita Acara Kesepakatan Batas', 'Permendagri Penetapan', 'Surat Keputusan'];

  const filteredData = dataDokumen.filter(doc => {
    const matchSearch = doc.nomor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       doc.wilayahTerkait.toLowerCase().includes(searchTerm.toLowerCase());
    const matchJenis = selectedJenis === 'Semua' || doc.jenis === selectedJenis;
    return matchSearch && matchJenis;
  });

  const getStatusBadge = (status) => {
    const variants = {
      'Final': 'bg-green-100 text-green-800 border-green-300',
      'Draft': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Dalam Proses': 'bg-blue-100 text-blue-800 border-blue-300'
    };
    return variants[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Master Data Dokumen</h1>
        <p className="text-slate-600">Repositori dokumen resmi penegasan batas wilayah</p>
      </div>

      {/* Filters & Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <Input
                placeholder="Cari nomor dokumen atau wilayah..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Upload Button */}
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
              <Upload size={18} />
              Upload Dokumen
            </Button>
          </div>

          {/* Jenis Filter */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {jenisOptions.map(jenis => (
              <Button
                key={jenis}
                variant={selectedJenis === jenis ? 'default' : 'outline'}
                onClick={() => setSelectedJenis(jenis)}
                size="sm"
                className="transition-all"
              >
                {jenis}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="text-blue-600" />
            Dokumen Resmi
          </CardTitle>
          <CardDescription>
            Menampilkan {filteredData.length} dari {dataDokumen.length} dokumen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold">Nomor</TableHead>
                  <TableHead className="font-semibold">Jenis Dokumen</TableHead>
                  <TableHead className="font-semibold">Tanggal</TableHead>
                  <TableHead className="font-semibold">Wilayah Terkait</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((doc) => (
                  <TableRow key={doc.id} className="hover:bg-slate-50 transition-colors">
                    <TableCell className="font-medium">{doc.nomor}</TableCell>
                    <TableCell className="text-slate-600">{doc.jenis}</TableCell>
                    <TableCell className="text-slate-600">
                      {new Date(doc.tanggal).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </TableCell>
                    <TableCell className="font-semibold text-slate-800">{doc.wilayahTerkait}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(doc.status)}>
                        {doc.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Eye size={16} />
                          Lihat
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Download size={16} />
                          Unduh
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

      {/* Document Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 mb-1">Total Dokumen</p>
                <p className="text-3xl font-bold text-blue-800">{dataDokumen.length}</p>
              </div>
              <FileText size={32} className="text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 mb-1">Final</p>
                <p className="text-3xl font-bold text-green-800">
                  {dataDokumen.filter(d => d.status === 'Final').length}
                </p>
              </div>
              <FileText size={32} className="text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-700 mb-1">Draft</p>
                <p className="text-3xl font-bold text-yellow-800">
                  {dataDokumen.filter(d => d.status === 'Draft').length}
                </p>
              </div>
              <FileText size={32} className="text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MasterDokumen;