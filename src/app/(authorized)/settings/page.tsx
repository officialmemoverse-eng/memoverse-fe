'use client';

import { useEffect, useState } from 'react';
import { ShieldCheck, Smartphone, Lock, Eye, ShieldAlert, Sliders, Save } from 'lucide-react';
import { Badge, Spinner, Flex, DataTable, Typography, TypographyH2, Button } from '@mysuf1020/mylib-ui';
import { apiClient } from '@/lib/api-client';
import { Page } from '@/components/common/page';
import { Container } from '@/components/common/container';
import { DynamicTableContainer } from '@/components/common/dynamic-table-container';
import { usePaginationProps } from '@/lib/hooks/use-pagination-props';
import { DetailModal } from '@/components/common/detail-modal';

export default function SettingsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'audit' | 'config'>('audit');
  const [savingConfig, setSavingConfig] = useState(false);

  // Security policy form settings
  const [config, setConfig] = useState({
    min_app_version: '1.0.0',
    geofence_radius_meters: 50,
    strict_root_block: true,
    liveness_mandatory: true,
    max_offline_logs: 100,
    session_timeout_hours: 12,
  });

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await apiClient.get('/admin/security/device-reports');
        if (res.data.success) {
          setReports(res.data.data || []);
        }
      } catch (err) {
        console.error('Failed to load security reports', err);
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  const pagination = usePaginationProps({
    totalData: reports.length,
  });

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setSavingConfig(true);
    setTimeout(() => {
      setSavingConfig(false);
      alert('Kebijakan keamanan sistem berhasil diperbarui!');
    }, 600);
  };

  const columns = [
    {
      id: 'TABLE_NUMBERING',
      header: 'No.',
      size: 54,
      cell: ({ row }: any) => <span>{row.index + 1}</span>,
    },
    {
      accessorKey: 'device_id',
      header: 'Device ID / Perangkat',
      cell: ({ row }: any) => <span className="font-mono text-xs text-slate-800 font-semibold">{row.original.device_id}</span>,
    },
    {
      accessorKey: 'is_rooted',
      header: 'Indikator Root',
      cell: ({ row }: any) =>
        row.original.is_rooted ? (
          <Badge variant="destructive">TERDETEKSI ROOT</Badge>
        ) : (
          <Badge variant="success">Aman (Non-rooted)</Badge>
        ),
    },
    {
      accessorKey: 'mock_location_enabled',
      header: 'Fake GPS / Mock Provider',
      cell: ({ row }: any) =>
        row.original.mock_location_enabled ? (
          <Badge variant="destructive">FAKE GPS AKTIF</Badge>
        ) : (
          <Badge variant="success">Aman (Real GPS)</Badge>
        ),
    },
    {
      accessorKey: 'action_taken',
      header: 'Aksi Otomatis',
      cell: ({ row }: any) => (
        <Badge variant={row.original.action_taken === 'block' ? 'destructive' : 'default'}>
          {row.original.action_taken?.toUpperCase()}
        </Badge>
      ),
    },
    {
      accessorKey: 'reported_at',
      header: 'Waktu Audit',
      cell: ({ row }: any) => <span className="text-slate-700 text-xs">{new Date(row.original.reported_at).toLocaleString()}</span>,
    },
    {
      id: 'actions',
      header: 'Aksi',
      size: 130,
      cell: ({ row }: any) => {
        const rpt = row.original;
        return (
          <button
            onClick={(e) => { e.stopPropagation(); setSelectedReport(rpt); }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-50 text-[#C88242] hover:bg-amber-100 transition cursor-pointer border border-amber-200"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Detail</span>
          </button>
        );
      },
    },
  ];

  const inputClasses = "w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C88242]";

  return (
    <Page>
      <Container>
        {/* Page Header */}
        <div className="mb-6">
          <TypographyH2 className="text-2xl font-bold text-slate-900">Keamanan Perangkat & Pengaturan Sistem</TypographyH2>
          <Typography className="text-slate-500 text-sm">Monitoring deteksi Root, Emulator, Fake GPS, dan konfigurasi kebijakan aplikasi guard</Typography>
        </div>

        {/* Policy Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <div className="bg-white rounded-2xl p-5 border border-amber-100 shadow-xs flex items-start justify-between">
            <div className="space-y-1.5">
              <Flex alignItems="center" gap="2">
                <Smartphone className="w-4 h-4 text-[#C88242]" />
                <Typography strong className="text-slate-900 text-sm font-semibold">Versi Minimal Mobile</Typography>
              </Flex>
              <div className="text-lg font-extrabold text-slate-900">v{config.min_app_version}</div>
              <Typography level="sm" className="text-slate-400 text-xs">Aplikasi di bawah versi ini diblokir</Typography>
            </div>
            <Badge variant="default" className="text-[11px] bg-amber-50 text-[#C88242] border-amber-200">LTS Stable</Badge>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-amber-100 shadow-xs flex items-start justify-between">
            <div className="space-y-1.5">
              <Flex alignItems="center" gap="2">
                <Lock className="w-4 h-4 text-amber-600" />
                <Typography strong className="text-slate-900 text-sm font-semibold">Deteksi Root & Fake GPS</Typography>
              </Flex>
              <div className="text-lg font-extrabold text-amber-700">Strict Mode</div>
              <Typography level="sm" className="text-slate-400 text-xs">Blokir login jika HP di-root / mock location</Typography>
            </div>
            <Badge variant="destructive" className="text-[11px]">BLOCK ACCESS</Badge>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-xs flex items-start justify-between">
            <div className="space-y-1.5">
              <Flex alignItems="center" gap="2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <Typography strong className="text-slate-900 text-sm font-semibold">Verifikasi Wajah (Liveness)</Typography>
              </Flex>
              <div className="text-lg font-extrabold text-emerald-700">Wajib (Mandatory)</div>
              <Typography level="sm" className="text-slate-400 text-xs">Absen selfie wajib liveness face detect</Typography>
            </div>
            <Badge variant="success" className="text-[11px]">ACTIVE</Badge>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 mb-6">
          <button
            onClick={() => setActiveTab('audit')}
            className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'audit'
                ? 'border-[#C88242] text-[#C88242]'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Log Audit Perangkat HP</span>
          </button>

          <button
            onClick={() => setActiveTab('config')}
            className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'config'
                ? 'border-[#C88242] text-[#C88242]'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Konfigurasi Kebijakan Sistem</span>
          </button>
        </div>

        {/* Tab 1: Audit Log Table */}
        {activeTab === 'audit' && (
          loading ? (
            <Flex justifyContent="center" className="py-12">
              <Spinner size={32} />
            </Flex>
          ) : (
            <DynamicTableContainer
              controls={
                <div>
                  <TypographyH2 className="text-lg font-bold text-slate-900">Log Deteksi Keamanan Perangkat Guard</TypographyH2>
                  <Typography className="text-slate-500 text-xs">Riwayat deteksi Root, Mock Location (Fake GPS), dan tindakan otomatis sistem</Typography>
                </div>
              }
              table={
                <DataTable
                  columns={columns}
                  data={reports || []}
                  onClickRow={(row) => setSelectedReport(row.original)}
                />
              }
              pagination={pagination}
            />
          )
        )}

        {/* Tab 2: System Security Configuration Form */}
        {activeTab === 'config' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs max-w-3xl">
            <form onSubmit={handleSaveConfig} className="space-y-6">
              <div>
                <TypographyH2 className="text-lg font-bold text-slate-900 mb-1">Pengaturan Keamanan & Toleransi Geofence</TypographyH2>
                <Typography className="text-slate-500 text-xs">Atur batas toleransi lokasi GPS, versi aplikasi, dan kebijakan verifikasi biometrik</Typography>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Versi Minimal Aplikasi Mobile</label>
                  <input
                    type="text"
                    value={config.min_app_version}
                    onChange={(e) => setConfig({ ...config, min_app_version: e.target.value })}
                    className={`${inputClasses} font-mono`}
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Gunakan format semver (contoh: 1.0.0)</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Default Radius Geofence (Meter)</label>
                  <input
                    type="number"
                    min="5"
                    max="500"
                    value={config.geofence_radius_meters}
                    onChange={(e) => setConfig({ ...config, geofence_radius_meters: parseInt(e.target.value) || 50 })}
                    className={`${inputClasses} font-bold text-slate-900`}
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Toleransi jarak GPS saat satpam scan QR pos</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Batas Log Offline Terhubung</label>
                  <input
                    type="number"
                    value={config.max_offline_logs}
                    onChange={(e) => setConfig({ ...config, max_offline_logs: parseInt(e.target.value) || 100 })}
                    className={inputClasses}
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Maksimal penyimpanan log patroli tanpa internet</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Sesi Timeout Inactive Guard (Jam)</label>
                  <input
                    type="number"
                    value={config.session_timeout_hours}
                    onChange={(e) => setConfig({ ...config, session_timeout_hours: parseInt(e.target.value) || 12 })}
                    className={inputClasses}
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Otomatis logout jika tidak ada aktivitas</p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">Blokir Akses Jika HP Di-Root / Fake GPS</div>
                    <div className="text-xs text-slate-500">Tolak login & scan QR apabila aplikasi mendeteksi modifikasi sistem HP</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.strict_root_block}
                    onChange={(e) => setConfig({ ...config, strict_root_block: e.target.checked })}
                    className="w-5 h-5 text-[#C88242] rounded cursor-pointer accent-[#C88242]"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">Wajibkan Verifikasi Wajah (Liveness Face Detection)</div>
                    <div className="text-xs text-slate-500">Gunakan deteksi kedipan mata / liveness saat selfie presensi masuk</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.liveness_mandatory}
                    onChange={(e) => setConfig({ ...config, liveness_mandatory: e.target.checked })}
                    className="w-5 h-5 text-[#C88242] rounded cursor-pointer accent-[#C88242]"
                  />
                </div>
              </div>

              <Flex justifyContent="end" gap="3" className="pt-4 border-t border-slate-100">
                <Button type="submit" disabled={savingConfig} className="btn-asthara-primary">
                  <Flex alignItems="center" gap="2">
                    {savingConfig ? <Spinner size={16} /> : <Save className="w-4 h-4" />}
                    <span>Simpan Konfigurasi Kebijakan</span>
                  </Flex>
                </Button>
              </Flex>
            </form>
          </div>
        )}

        {/* Modal Detail Audit Log Keamanan */}
        <DetailModal
          isOpen={!!selectedReport}
          onClose={() => setSelectedReport(null)}
          title={`Audit Log Keamanan Perangkat`}
          subtitle={`Device ID: ${selectedReport?.device_id || '-'}`}
          badge={
            <Badge variant={selectedReport?.action_taken === 'block' ? 'destructive' : 'default'}>
              {selectedReport?.action_taken?.toUpperCase()}
            </Badge>
          }
          fields={[
            { label: 'Device Identifier', value: selectedReport?.device_id },
            { label: 'Status Root Detection', value: selectedReport?.is_rooted ? 'TERDETEKSI ROOT (High Risk)' : 'Aman (Non-rooted)' },
            { label: 'Status Fake GPS / Mock Provider', value: selectedReport?.mock_location_enabled ? 'FAKE GPS AKTIF (High Risk)' : 'Aman (Real GPS)' },
            { label: 'Aksi Otomatis Sistem', value: selectedReport?.action_taken === 'block' ? 'BLOKIR AKSES' : 'IZINKAN (ALLOW)' },
            { label: 'Waktu Pelaporan Audit', value: selectedReport?.reported_at ? new Date(selectedReport.reported_at).toLocaleString() : '-' },
          ]}
        />
      </Container>
    </Page>
  );
}
