import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface SolarSystem {
  name: string;
  numPanels: number;
  batteryCapacity: number;
  inverterCapacity: number;
  location: string;
  latitude: string;
  longitude: string;
  systemType: string;
  aiOptimizationGoal: string;
}

export const SolarOnboarding: React.FC<{ onComplete: (systems: SolarSystem[]) => void }> = ({ onComplete }) => {
  const [systems, setSystems] = useState<SolarSystem[]>([]);
  const [current, setCurrent] = useState<SolarSystem>({
    name: '',
    numPanels: 1,
    batteryCapacity: 0,
    inverterCapacity: 0,
    location: '',
    latitude: '',
    longitude: '',
    systemType: '',
    aiOptimizationGoal: ''
  });
  const [step, setStep] = useState(0);
  const [adding, setAdding] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrent({ ...current, [e.target.name]: e.target.value });
  };

  const handleAddSystem = async () => {
    // Save to Supabase backend (replace with your actual table/insert logic)
    try {
      // Example: await supabase.from('solar_systems').insert([{ ...current, user_id: authState.user?.id }]);
    } catch (e) {
      // Handle error
    }
    setSystems([...systems, current]);
    setCurrent({ name: '', numPanels: 1, batteryCapacity: 0, inverterCapacity: 0, location: '', latitude: '', longitude: '', systemType: '', aiOptimizationGoal: '' });
    setAdding(false);
  };

  const handleFinish = () => {
    onComplete(systems);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Add Your Solar System / Appiary</h2>
        <p className="mb-6 text-gray-600">Enter details for each solar/minigrid/appiary system you own. All fields are required for AI optimization.</p>
        {systems.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Systems Added:</h3>
            <ul className="list-disc ml-6 text-sm text-gray-700">
              {systems.map((sys, idx) => (
                <li key={idx}>{sys.name} - {sys.numPanels} panels, {sys.batteryCapacity}kWh battery, {sys.inverterCapacity}kW inverter, {sys.location}, {sys.latitude}, {sys.longitude}, {sys.systemType}, Goal: {sys.aiOptimizationGoal}</li>
              ))}
            </ul>
          </div>
        )}
        {adding ? (
          <div className="space-y-4">
            <input name="name" value={current.name} onChange={handleChange} placeholder="System Name (e.g. Home Solar, Apiary 1)" className="w-full border rounded p-2" required />
            <input name="numPanels" type="number" value={current.numPanels} onChange={handleChange} placeholder="Number of Solar Panels" className="w-full border rounded p-2" required />
            <input name="batteryCapacity" type="number" value={current.batteryCapacity} onChange={handleChange} placeholder="Battery Capacity (kWh)" className="w-full border rounded p-2" required />
            <input name="inverterCapacity" type="number" value={current.inverterCapacity} onChange={handleChange} placeholder="Inverter Capacity (kW)" className="w-full border rounded p-2" required />
            <input name="location" value={current.location} onChange={handleChange} placeholder="Location (City, Area)" className="w-full border rounded p-2" required />
            <input name="latitude" value={current.latitude} onChange={handleChange} placeholder="Latitude" className="w-full border rounded p-2" required />
            <input name="longitude" value={current.longitude} onChange={handleChange} placeholder="Longitude" className="w-full border rounded p-2" required />
            <input name="systemType" value={current.systemType} onChange={handleChange} placeholder="System Type (Solar, Apiary, Minigrid)" className="w-full border rounded p-2" required />
            <input name="aiOptimizationGoal" value={current.aiOptimizationGoal} onChange={handleChange} placeholder="AI Optimization Goal (e.g. Maximize Output, Minimize Cost)" className="w-full border rounded p-2" required />
            <div className="flex justify-between mt-4">
              <button onClick={handleAddSystem} className="bg-green-600 text-white px-4 py-2 rounded">Add System</button>
              <button onClick={() => setAdding(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setAdding(true)} className="bg-green-500 text-white px-4 py-2 rounded mb-4">Add New System</button>
        )}
        <div className="flex justify-end mt-8">
          <button onClick={handleFinish} className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold">Finish & Generate Data</button>
        </div>
      </div>
    </div>
  );
};
