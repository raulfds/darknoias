import React from 'react';
import { WeaponProgress } from '../types';
import { Trophy, Diamond, Flame, Skull } from 'lucide-react';

interface Props {
  progress: WeaponProgress;
  totalWeapons: number;
}

export function ProgressHeader({ progress, totalWeapons }: Props) {
  const getCamoCount = (camoType: keyof typeof progress[string]) => {
    return Object.values(progress).filter(weapon => weapon[camoType]).length;
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <h1 className="text-2xl font-bold mb-3 text-center">Black Ops 6 Camo Tracker</h1>
        <div className="grid grid-cols-4 gap-4">
          <div className="flex items-center justify-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="font-medium">Gold: {getCamoCount('gold')}/{totalWeapons}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Diamond className="w-5 h-5 text-blue-400" />
            <span className="font-medium">Diamond: {getCamoCount('diamond')}/{totalWeapons}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="font-medium">Dark Spice: {getCamoCount('darkSpice')}/{totalWeapons}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Skull className="w-5 h-5 text-purple-500" />
            <span className="font-medium">Dark Matter: {getCamoCount('darkMatter')}/{totalWeapons}</span>
          </div>
        </div>
      </div>
    </div>
  );
}