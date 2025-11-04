import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { dataIntegrasi } from '../mockData';
import { Database, RefreshCw, Download, Settings, CheckCircle, XCircle } from 'lucide-react';

const Integrasi = () => {
  const [syncing, setSyncing] = useState(null);

  const handleSync = (id) => {
    setSyncing(id);
    setTimeout(() => setSyncing(null), 2000);
  };

  const getStatusBadge = (status) => {
    if (status === 'Aktif') {
      return 'bg-green-100 text-green-800 border-green-300';
    }
    return 'bg-red-100 text-red-800 border-red-300';
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Integrasi Data</h1>
        <p className="text-slate-600">Penghubung sistem batas wilayah dengan sistem eksternal</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-blue-700 mb-1">Total API</p>
              <p className="text-3xl font-bold text-blue-800">{dataIntegrasi.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-green-700 mb-1">Aktif</p>
              <p className="text-3xl font-bold text-green-800">
                {dataIntegrasi.filter(d => d.status === 'Aktif').length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-red-700 mb-1">Error</p>
              <p className="text-3xl font-bold text-red-800">
                {dataIntegrasi.filter(d => d.status === 'Error').length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-purple-700 mb-1">Total Records</p>
              <p className="text-3xl font-bold text-purple-800">
                {dataIntegrasi.reduce((sum, d) => sum + d.records, 0).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API Integration Table */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="text-blue-600" />
            Status Integrasi API
          </CardTitle>
          <CardDescription>
            Monitoring dan sinkronisasi data dengan sistem eksternal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold">Nama API</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Last Sync</TableHead>
                  <TableHead className="font-semibold">Records</TableHead>
                  <TableHead className="font-semibold">Endpoint</TableHead>
                  <TableHead className="font-semibold">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataIntegrasi.map((api) => (
                  <TableRow key={api.id} className="hover:bg-slate-50 transition-colors">
                    <TableCell className="font-semibold text-slate-800">{api.namaAPI}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(api.status)}>
                        {api.status === 'Aktif' ? (
                          <CheckCircle size={14} className="mr-1" />
                        ) : (
                          <XCircle size={14} className="mr-1" />
                        )}
                        {api.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600">{api.lastSync}</TableCell>
                    <TableCell className="text-slate-600 font-medium">
                      {api.records.toLocaleString('id-ID')}
                    </TableCell>
                    <TableCell className="text-slate-600 text-xs">{api.endpoint}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-1"
                          onClick={() => handleSync(api.id)}
                          disabled={syncing === api.id}
                        >
                          <RefreshCw size={14} className={syncing === api.id ? 'animate-spin' : ''} />
                          {syncing === api.id ? 'Syncing...' : 'Sync'}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings size={14} />
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

      {/* Export Options */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="text-blue-600" />
            Export Data
          </CardTitle>
          <CardDescription>
            Download data dalam berbagai format untuk integrasi eksternal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-24 flex flex-col gap-2">
              <Download size={24} />
              <div className="text-center">
                <p className="font-semibold">GeoJSON</p>
                <p className="text-xs text-slate-600">Format geospasial</p>
              </div>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col gap-2">
              <Download size={24} />
              <div className="text-center">
                <p className="font-semibold">CSV</p>
                <p className="text-xs text-slate-600">Data tabular</p>
              </div>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col gap-2">
              <Download size={24} />
              <div className="text-center">
                <p className="font-semibold">WFS</p>
                <p className="text-xs text-slate-600">Web Feature Service</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Integrasi;