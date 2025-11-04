import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { chartDataStatus, chartDataWilayah } from '../mockData';
import { BarChart3, Download, FileText, TrendingUp } from 'lucide-react';

const Analisis = () => {
  const [reportType, setReportType] = useState('monthly');

  const pieData = [
    { name: 'Disepakati', value: 75, color: '#22c55e' },
    { name: 'Dalam Proses', value: 20, color: '#eab308' },
    { name: 'Sengketa', value: 5, color: '#ef4444' }
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Analisis & Pelaporan</h1>
        <p className="text-slate-600">Analisis tematik dan laporan perkembangan penegasan batas</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-blue-50 hover:border-blue-300">
          <Download size={24} className="text-blue-600" />
          <span className="font-semibold">Download Laporan PDF</span>
        </Button>
        <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-green-50 hover:border-green-300">
          <FileText size={24} className="text-green-600" />
          <span className="font-semibold">Export ke Excel</span>
        </Button>
        <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-purple-50 hover:border-purple-300">
          <BarChart3 size={24} className="text-purple-600" />
          <span className="font-semibold">Dashboard Interaktif</span>
        </Button>
      </div>

      {/* Trend Chart */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="text-blue-600" />
            Perkembangan Status Penegasan Batas
          </CardTitle>
          <CardDescription>Trend perubahan status penegasan batas per bulan (2024)</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartDataStatus}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="disepakati" 
                stroke="#22c55e" 
                strokeWidth={3}
                name="Disepakati (%)"
                dot={{ fill: '#22c55e', r: 5 }}
              />
              <Line 
                type="monotone" 
                dataKey="proses" 
                stroke="#eab308" 
                strokeWidth={3}
                name="Dalam Proses (%)"
                dot={{ fill: '#eab308', r: 5 }}
              />
              <Line 
                type="monotone" 
                dataKey="sengketa" 
                stroke="#ef4444" 
                strokeWidth={3}
                name="Sengketa (%)"
                dot={{ fill: '#ef4444', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Two Column Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Distribusi Kabupaten per Pulau</CardTitle>
            <CardDescription>Jumlah kabupaten/kota berdasarkan wilayah kepulauan</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartDataWilayah}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="kabupaten" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Proporsi Status Penegasan</CardTitle>
            <CardDescription>Persentase status penegasan batas nasional</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Report */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Ringkasan Analisis</CardTitle>
          <CardDescription>Insight dan rekomendasi berdasarkan data terkini</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Pencapaian Positif</h3>
              <p className="text-sm text-green-700">
                Status penegasan batas yang telah disepakati meningkat dari 65% di awal tahun menjadi 75% per Oktober 2024. 
                Tren ini menunjukkan akselerasi proses penegasan batas di berbagai wilayah.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">Area yang Memerlukan Perhatian</h3>
              <p className="text-sm text-yellow-700">
                Wilayah dengan status "Dalam Proses" masih mencapai 20%. Diperlukan percepatan koordinasi antar daerah 
                untuk menyelesaikan proses kesepakatan batas.
              </p>
            </div>
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">Prioritas Penanganan</h3>
              <p className="text-sm text-red-700">
                Sengketa batas sebesar 5% memerlukan penanganan khusus melalui mediasi dan fasilitasi tingkat pusat. 
                Fokus utama adalah wilayah Papua dan beberapa daerah perbatasan provinsi.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analisis;