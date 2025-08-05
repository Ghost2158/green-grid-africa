import React from 'react';
import { MapPin, Zap, AlertTriangle, Wrench } from 'lucide-react';
import { SiteStatus } from '../../types';
import { Card, CardContent } from '../ui/Card';

interface SiteMapProps {
  sites: SiteStatus[];
}

export const SiteMap: React.FC<SiteMapProps> = ({ sites }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <Zap className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'maintenance': return <Wrench className="w-4 h-4 text-blue-500" />;
      default: return <MapPin className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'border-green-500 bg-green-50';
      case 'warning': return 'border-yellow-500 bg-yellow-50';
      case 'maintenance': return 'border-blue-500 bg-blue-50';
      default: return 'border-red-500 bg-red-50';
    }
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-80 overflow-hidden">
          {/* Simplified map background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 opacity-50"></div>
          
          {/* Site markers */}
          <div className="relative h-full">
            {sites.map((site, index) => (
              <div
                key={site.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${getStatusColor(site.status)} border-2 rounded-lg p-3 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer`}
                style={{
                  left: `${20 + (index * 20)}%`,
                  top: `${30 + (index * 15)}%`,
                }}
              >
                <div className="flex items-center space-x-2">
                  {getStatusIcon(site.status)}
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{site.name}</p>
                    <p className="text-xs text-gray-600">{site.currentOutput}kW / {site.capacity}kW</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg">
            <h4 className="text-xs font-semibold text-gray-800 mb-2">Site Status</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Zap className="w-3 h-3 text-green-500" />
                <span className="text-xs text-gray-600">Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-3 h-3 text-yellow-500" />
                <span className="text-xs text-gray-600">Warning</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wrench className="w-3 h-3 text-blue-500" />
                <span className="text-xs text-gray-600">Maintenance</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};