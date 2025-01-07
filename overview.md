import React, { useState } from 'react';
import { Box } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AirshipExperience = () => {
  const [selectedTimeline, setSelectedTimeline] = useState('chronological');
  const [selectedPerspective, setSelectedPerspective] = useState('default');

  const timelineTypes = [
    { id: 'chronological', name: 'Chronological Timeline', description: 'Linear progression through JTrue\'s life work' },
    { id: 'geographical', name: 'Geographical Timeline', description: 'Spatial mapping of experiences and insights' },
    { id: 'temporal', name: 'Temporal Timeline', description: 'Non-linear exploration of interconnected moments' }
  ];

  const perspectives = [
    { id: 'default', name: 'Default Stag View', fov: 120 },
    { id: 'elevated', name: 'Elevated Perspective', fov: 160 },
    { id: 'ground', name: 'Ground Level', fov: 90 }
  ];

  return (
    <div className="space-y-6 p-6 bg-slate-50 rounded-lg">
      <Card>
        <CardHeader>
          <CardTitle>Airship Interactive Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Timeline Navigation</h3>
              <div className="space-y-4">
                {timelineTypes.map(timeline => (
                  <div 
                    key={timeline.id}
                    className={`p-3 rounded cursor-pointer transition-colors ${
                      selectedTimeline === timeline.id ? 'bg-blue-100' : 'bg-gray-50 hover:bg-blue-50'
                    }`}
                    onClick={() => setSelectedTimeline(timeline.id)}
                  >
                    <h4 className="font-medium">{timeline.name}</h4>
                    <p className="text-sm text-gray-600">{timeline.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Stag Perspective</h3>
              <div className="space-y-4">
                {perspectives.map(perspective => (
                  <div 
                    key={perspective.id}
                    className={`p-3 rounded cursor-pointer transition-colors ${
                      selectedPerspective === perspective.id ? 'bg-green-100' : 'bg-gray-50 hover:bg-green-50'
                    }`}
                    onClick={() => setSelectedPerspective(perspective.id)}
                  >
                    <h4 className="font-medium">{perspective.name}</h4>
                    <p className="text-sm text-gray-600">FOV: {perspective.fov}°</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Interactive Elements</h3>
              <div className="grid grid-cols-3 gap-4">
                {['Slideshows', 'YouTube Lives', 'Audio Files', 'Podcasts', 'Media Files', 'User Uploads'].map(item => (
                  <div key={item} className="flex items-center justify-center p-4 bg-gray-50 rounded">
                    <Box className="mr-2" size={20} />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AirshipExperience;