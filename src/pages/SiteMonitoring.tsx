import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Zap, 
  Sun, 
  Thermometer,
  Droplets,
  Wind,
  Activity,
  AlertTriangle,
  CheckCircle,
  Settings,
  Camera,
  Wifi,
  Battery,
  Eye,
  Filter,
  Search,
  RefreshCw,
  Download,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Minimize2,
  Navigation,
  Layers,
  Info,
  TrendingUp,
  Clock,
  MapIcon,
  Grid3X3,
  Satellite,
  Map as MapIconLucide
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { MetricCard } from '../components/ui/MetricCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { mockSites } from '../utils/mockData';
import { Site } from '../types';

interface SiteDetail extends Site {
  weatherData: {
    windSpeed: number;
    cloudCover: number;
    uvIndex: number;
    pressure: number;
  };
  equipment: {
    inverters: { id: string; status: string; load: number; temp: number }[];
    panels: { id: string; status: string; efficiency: number; angle: number }[];
    batteries: { id: string; status: string; charge: number; health: number }[];
  };
  connectivity: {
    signalStrength: number;
    lastUpdate: Date;
    dataQuality: number;
  };
}

interface MapLayer {
  id: string;
  name: string;
  visible: boolean;
  color: string;
}

export const SiteMonitoring: React.FC = () => {
  const [selectedSite, setSelectedSite] = useState<SiteDetail | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'map' | 'detail'>('map');
  const [mapStyle, setMapStyle] = useState<'satellite' | 'terrain' | 'hybrid'>('hybrid');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLiveMode, setIsLiveMode] = useState(true);
  const [sites, setSites] = useState<SiteDetail[]>([]);
  const [mapLayers, setMapLayers] = useState<MapLayer[]>([
    { id: 'sites', name: 'Solar Sites', visible: true, color: '#22c55e' },
    { id: 'weather', name: 'Weather Data', visible: true, color: '#3b82f6' },
    { id: 'grid', name: 'Power Grid', visible: false, color: '#f59e0b' },
    { id: 'transmission', name: 'Transmission Lines', visible: false, color: '#8b5cf6' }
  ]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSiteInfo, setShowSiteInfo] = useState(true);

  useEffect(() => {
    generateDetailedSites();
    if (isLiveMode) {
      const interval = setInterval(generateDetailedSites, 5000);
      return () => clearInterval(interval);
    }
  }, [isLiveMode]);

  const generateDetailedSites = () => {
    const detailedSites: SiteDetail[] = mockSites.map(site => ({
      ...site,
      weatherData: {
        windSpeed: 5 + Math.random() * 15,
        cloudCover: Math.random() * 100,
        uvIndex: Math.random() * 11,
        pressure: 1000 + Math.random() * 50
      },
      equipment: {
        inverters: Array.from({ length: 3 }, (_, i) => ({
          id: `INV-${i + 1}`,
          status: Math.random() > 0.1 ? 'online' : 'warning',
          load: 70 + Math.random() * 25,
          temp: 35 + Math.random() * 20
        })),
        panels: Array.from({ length: 4 }, (_, i) => ({
          id: `PNL-${i + 1}`,
          status: Math.random() > 0.05 ? 'online' : 'maintenance',
          efficiency: 85 + Math.random() * 10,
          angle: 30 + Math.random() * 20
        })),
        batteries: Array.from({ length: 2 }, (_, i) => ({
          id: `BAT-${i + 1}`,
          status: Math.random() > 0.08 ? 'online' : 'warning',
          charge: 60 + Math.random() * 35,
          health: 90 + Math.random() * 8
        }))
      },
      connectivity: {
        signalStrength: 70 + Math.random() * 25,
        lastUpdate: new Date(),
        dataQuality: 85 + Math.random() * 12
      }
    }));
    setSites(detailedSites);
    if (!selectedSite && detailedSites.length > 0) {
      setSelectedSite(detailedSites[0]);
    }
  };

  const filteredSites = sites.filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || site.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const toggleLayer = (layerId: string) => {
    setMapLayers(prev => prev.map(layer => 
      layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
    ));
  };

  const getSiteStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#22c55e';
      case 'warning': return '#f59e0b';
      case 'maintenance': return '#3b82f6';
      case 'offline': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'maintenance': return <Settings className="w-4 h-4" />;
      case 'offline': return <Zap className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const renderInteractiveMap = () => (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'h-[600px]'} bg-gradient-to-br from-blue-900 via-blue-800 to-green-800 rounded-2xl overflow-hidden shadow-2xl`}>
      {/* Map Background with Animated Grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/90 to-green-800/90"></div>
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-20 space-y-2">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
          <div className="flex items-center space-x-2 mb-3">
            <Layers className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">Map Layers</span>
          </div>
          <div className="space-y-2">
            {mapLayers.map((layer) => (
              <label key={layer.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={layer.visible}
                  onChange={() => toggleLayer(layer.id)}
                  className="rounded border-white/30"
                />
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: layer.color }}
                />
                <span className="text-white text-xs">{layer.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
          <div className="flex items-center space-x-2 mb-3">
            <MapIconLucide className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">Map Style</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {[
              { id: 'satellite', name: 'Satellite', icon: Satellite },
              { id: 'terrain', name: 'Terrain', icon: MapIconLucide },
              { id: 'hybrid', name: 'Hybrid', icon: Layers }
            ].map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setMapStyle(id as any)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs transition-all ${
                  mapStyle === id 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map Controls - Right Side */}
      <div className="absolute top-4 right-4 z-20 space-y-2">
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 text-white hover:bg-white/20 transition-all"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
        
        <button
          onClick={() => setShowSiteInfo(!showSiteInfo)}
          className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 text-white hover:bg-white/20 transition-all"
        >
          <Info className="w-4 h-4" />
        </button>

        <button className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 text-white hover:bg-white/20 transition-all">
          <Navigation className="w-4 h-4" />
        </button>
      </div>

      {/* Site Markers */}
      <div className="absolute inset-0 z-10">
        {filteredSites.map((site, index) => {
          const x = 15 + (index * 20) + Math.sin(index) * 10;
          const y = 20 + (index * 15) + Math.cos(index) * 8;
          const isSelected = selectedSite?.id === site.id;
          
          return (
            <div
              key={site.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 hover:scale-110 ${
                isSelected ? 'z-30 scale-125' : 'z-20'
              }`}
              style={{
                left: `${x}%`,
                top: `${y}%`,
              }}
              onClick={() => setSelectedSite(site)}
            >
              {/* Site Marker with Pulse Animation */}
              <div className="relative">
                {/* Pulse Ring */}
                <div 
                  className={`absolute inset-0 rounded-full animate-ping ${
                    site.status === 'online' ? 'bg-green-400' :
                    site.status === 'warning' ? 'bg-yellow-400' :
                    site.status === 'maintenance' ? 'bg-blue-400' : 'bg-red-400'
                  }`}
                  style={{ 
                    width: '60px', 
                    height: '60px',
                    left: '-15px',
                    top: '-15px'
                  }}
                />
                
                {/* Main Marker */}
                <div 
                  className={`relative w-8 h-8 rounded-full border-3 shadow-2xl transition-all duration-300 ${
                    isSelected ? 'border-white shadow-white/50' : 'border-white/80'
                  }`}
                  style={{ 
                    backgroundColor: getSiteStatusColor(site.status),
                    boxShadow: `0 0 20px ${getSiteStatusColor(site.status)}40`
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    {getStatusIcon(site.status)}
                  </div>
                </div>

                {/* Site Info Popup */}
                {(isSelected || showSiteInfo) && (
                  <div className={`absolute top-10 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
                    isSelected ? 'opacity-100 scale-100' : 'opacity-80 scale-95'
                  }`}>
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/30 min-w-[280px]">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-gray-900 text-lg">{site.name}</h3>
                        <StatusBadge status={site.status} size="sm" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-xl">
                          <div className="flex items-center space-x-2 mb-1">
                            <Zap className="w-4 h-4 text-green-600" />
                            <span className="text-xs text-green-700 font-medium">Output</span>
                          </div>
                          <div className="text-lg font-bold text-green-800">
                            {(site.currentOutput / 1000).toFixed(1)} MW
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-xl">
                          <div className="flex items-center space-x-2 mb-1">
                            <Activity className="w-4 h-4 text-blue-600" />
                            <span className="text-xs text-blue-700 font-medium">Efficiency</span>
                          </div>
                          <div className="text-lg font-bold text-blue-800">
                            {site.efficiency.toFixed(0)}%
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <Thermometer className="w-3 h-3 text-red-500" />
                            <span className="text-gray-600">Temperature</span>
                          </div>
                          <span className="font-medium">{site.sensors[0]?.temperature.toFixed(1)}°C</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <Sun className="w-3 h-3 text-yellow-500" />
                            <span className="text-gray-600">Irradiance</span>
                          </div>
                          <span className="font-medium">{Math.round(site.sensors[0]?.solarIrradiance || 0)} W/m²</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <Wind className="w-3 h-3 text-gray-500" />
                            <span className="text-gray-600">Wind Speed</span>
                          </div>
                          <span className="font-medium">{site.weatherData.windSpeed.toFixed(1)} m/s</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <Wifi className="w-3 h-3 text-blue-500" />
                            <span className="text-gray-600">Signal</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-blue-500 h-1.5 rounded-full transition-all duration-300" 
                                style={{ width: `${site.connectivity.signalStrength}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium">{Math.round(site.connectivity.signalStrength)}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewMode('detail');
                          }}
                          className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View Details</span>
                        </button>
                        <button className="flex items-center space-x-1 text-xs text-gray-600 hover:text-gray-800 font-medium">
                          <Camera className="w-3 h-3" />
                          <span>Live Feed</span>
                        </button>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>Live</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Weather Overlay (if enabled) */}
      {mapLayers.find(l => l.id === 'weather')?.visible && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Animated weather patterns */}
          <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-blue-400/20 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-yellow-400/20 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/2 w-28 h-28 bg-green-400/20 rounded-full animate-pulse delay-2000"></div>
        </div>
      )}

      {/* Grid Lines (if enabled) */}
      {mapLayers.find(l => l.id === 'grid')?.visible && (
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full">
            <defs>
              <pattern id="powerGrid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#powerGrid)" />
          </svg>
        </div>
      )}

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 z-20">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <h4 className="text-white text-sm font-semibold mb-3 flex items-center">
            <Info className="w-4 h-4 mr-2" />
            Site Status Legend
          </h4>
          <div className="space-y-2">
            {[
              { status: 'Online', color: '#22c55e', icon: CheckCircle },
              { status: 'Warning', color: '#f59e0b', icon: AlertTriangle },
              { status: 'Maintenance', color: '#3b82f6', icon: Settings },
              { status: 'Offline', color: '#ef4444', icon: Zap }
            ].map(({ status, color, icon: Icon }) => (
              <div key={status} className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: color }}
                >
                  <Icon className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="text-white text-xs">{status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Data Indicator */}
      {isLiveMode && (
        <div className="absolute bottom-4 right-4 z-20">
          <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 border border-white/20 flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-medium">LIVE</span>
            <div className="text-white text-xs">
              {filteredSites.length} sites monitored
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderSiteGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredSites.map((site) => (
        <Card 
          key={site.id} 
          className="hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-2 hover:border-primary-200"
          onClick={() => {
            setSelectedSite(site);
            setViewMode('detail');
          }}
        >
          <div className="relative">
            {/* Site Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 text-lg">{site.name}</h3>
              <StatusBadge status={site.status} size="sm" />
            </div>

            {/* Live Indicator */}
            {isLiveMode && (
              <div className="absolute top-2 right-2 flex items-center space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500">LIVE</span>
              </div>
            )}

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-800">
                  {(site.currentOutput / 1000).toFixed(1)}
                </div>
                <div className="text-xs text-green-600 font-medium">MW Output</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <Activity className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-800">
                  {site.efficiency.toFixed(0)}%
                </div>
                <div className="text-xs text-blue-600 font-medium">Efficiency</div>
              </div>
            </div>

            {/* Environmental Data */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Thermometer className="w-4 h-4 text-red-500" />
                  <span>Temperature</span>
                </div>
                <span className="font-medium">{site.sensors[0]?.temperature.toFixed(1)}°C</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Sun className="w-4 h-4 text-yellow-500" />
                  <span>Irradiance</span>
                </div>
                <span className="font-medium">{Math.round(site.sensors[0]?.solarIrradiance || 0)} W/m²</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Wifi className="w-4 h-4 text-blue-500" />
                  <span>Signal</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${site.connectivity.signalStrength}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium">{Math.round(site.connectivity.signalStrength)}%</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors">
                <Eye className="w-3 h-3" />
                <span>View Details</span>
              </button>
              <button className="flex items-center space-x-1 text-xs text-gray-600 hover:text-gray-800 font-medium transition-colors">
                <Camera className="w-3 h-3" />
                <span>Live Feed</span>
              </button>
              <div className="flex items-center space-x-1 text-xs text-green-600">
                <TrendingUp className="w-3 h-3" />
                <span>+5.2%</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderSiteDetail = () => {
    if (!selectedSite) return null;

    const chartData = selectedSite.sensors.slice(-12).map(sensor => ({
      time: sensor.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      output: sensor.powerOutput / 1000,
      temperature: sensor.temperature,
      irradiance: sensor.solarIrradiance / 10,
      efficiency: selectedSite.efficiency
    }));

    return (
      <div className="space-y-6">
        {/* Site Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setViewMode('map')}
              className="p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all"
            >
              ← Back to Map
            </button>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{selectedSite.name}</h2>
              <p className="text-gray-600">Detailed monitoring and control</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <StatusBadge status={selectedSite.status} />
            <button className="p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Current Output"
            value={(selectedSite.currentOutput / 1000).toFixed(1)}
            unit="MW"
            icon={Zap}
            color="primary"
            change={{ value: 5.2, type: 'increase' }}
          />
          <MetricCard
            title="Efficiency"
            value={selectedSite.efficiency.toFixed(1)}
            unit="%"
            icon={Activity}
            color="success"
          />
          <MetricCard
            title="Temperature"
            value={selectedSite.sensors[0]?.temperature.toFixed(1)}
            unit="°C"
            icon={Thermometer}
            color="warning"
          />
          <MetricCard
            title="Signal Strength"
            value={Math.round(selectedSite.connectivity.signalStrength)}
            unit="%"
            icon={Wifi}
            color="grid"
          />
        </div>

        {/* Performance Chart */}
        <Card title="Real-time Performance" subtitle="Live monitoring data with enhanced visualization">
          <div className="h-96 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="outputGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="output" 
                  stroke="#22c55e" 
                  fill="url(#outputGradient)"
                  strokeWidth={3}
                />
                <Line type="monotone" dataKey="efficiency" stroke="#3b82f6" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Equipment Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inverters */}
          <Card title="Inverter Status" subtitle="Power conversion systems">
            <div className="space-y-4">
              {selectedSite.equipment.inverters.map((inverter) => (
                <div key={inverter.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border hover:shadow-md transition-all">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${
                      inverter.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'
                    }`} />
                    <span className="font-medium text-gray-900">{inverter.id}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">{inverter.load.toFixed(0)}% Load</div>
                    <div className="text-xs text-gray-500">{inverter.temp.toFixed(1)}°C</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Solar Panels */}
          <Card title="Panel Arrays" subtitle="Solar collection systems">
            <div className="space-y-4">
              {selectedSite.equipment.panels.map((panel) => (
                <div key={panel.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border hover:shadow-md transition-all">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${
                      panel.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-blue-500'
                    }`} />
                    <span className="font-medium text-gray-900">{panel.id}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">{panel.efficiency.toFixed(1)}% Eff</div>
                    <div className="text-xs text-gray-500">{panel.angle.toFixed(0)}° Angle</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Battery Storage */}
          <Card title="Battery Storage" subtitle="Energy storage systems">
            <div className="space-y-4">
              {selectedSite.equipment.batteries.map((battery) => (
                <div key={battery.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border hover:shadow-md transition-all">
                  <div className="flex items-center space-x-3">
                    <Battery className={`w-5 h-5 ${
                      battery.status === 'online' ? 'text-green-500' : 'text-yellow-500'
                    }`} />
                    <span className="font-medium text-gray-900">{battery.id}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">{battery.charge.toFixed(0)}% Charge</div>
                    <div className="text-xs text-gray-500">{battery.health.toFixed(0)}% Health</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                <MapPin className="w-12 h-12" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Site Monitoring</h1>
                <p className="text-green-100">Real-time monitoring and control of all solar installations</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsLiveMode(!isLiveMode)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  isLiveMode 
                    ? 'bg-red-500/80 hover:bg-red-500 backdrop-blur-sm' 
                    : 'bg-green-500/80 hover:bg-green-500 backdrop-blur-sm'
                }`}
              >
                {isLiveMode ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isLiveMode ? 'Pause' : 'Resume'} Live</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      {viewMode !== 'detail' && (
        <Card>
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search sites..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Status</option>
                <option value="online">Online</option>
                <option value="warning">Warning</option>
                <option value="maintenance">Maintenance</option>
                <option value="offline">Offline</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'map' ? 'bg-white text-gray-900 shadow-md' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <MapIcon className="w-4 h-4 mr-2 inline" />
                  Map View
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'grid' ? 'bg-white text-gray-900 shadow-md' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4 mr-2 inline" />
                  Grid View
                </button>
              </div>
              <button className="p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all">
                <Download className="w-4 h-4" />
              </button>
              <button 
                onClick={generateDetailedSites}
                className="p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* Content */}
      {viewMode === 'map' && renderInteractiveMap()}
      {viewMode === 'grid' && renderSiteGrid()}
      {viewMode === 'detail' && renderSiteDetail()}
    </div>
  );
};