import React from 'react';
import { CamoProgress, Weapon } from '../types';
import { Trophy, Diamond, Flame, Skull, Lock } from 'lucide-react';

interface Props {
  weapon: Weapon;
  progress: CamoProgress;
  onToggleCamo: (camo: keyof CamoProgress) => void;
  isLocked: boolean;
}

export function WeaponCard({ weapon, progress, onToggleCamo, isLocked }: Props) {
  return (
    <div className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl ${isLocked ? 'opacity-75' : ''}`}>
      <div className="relative p-4">
        {isLocked && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
            <div className="flex items-center gap-2 text-white">
              <Lock className="w-5 h-5" />
              <span>Unlocks at {weapon["Desbloqueia em"]}</span>
            </div>
          </div>
        )}
        <div className="flex items-center gap-4">
          <img src={weapon.Icon} alt={weapon.Arma} className="w-16 h-16 object-contain" />
          <div>
            <h3 className="text-lg font-bold text-white">{weapon.Arma}</h3>
            <p className="text-gray-400">{weapon.Categoria}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          <button
            onClick={() => onToggleCamo('gold')}
            disabled={isLocked}
            className={`flex flex-col items-center p-2 rounded transition-colors ${
              progress.gold ? 'bg-yellow-500/20 text-yellow-500' : 'bg-gray-700/50 text-gray-400'
            }`}
          >
            <Trophy className="w-5 h-5" />
            <span className="text-xs mt-1">Gold</span>
          </button>
          <button
            onClick={() => onToggleCamo('diamond')}
            disabled={isLocked || !progress.gold}
            className={`flex flex-col items-center p-2 rounded transition-colors ${
              progress.diamond ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-700/50 text-gray-400'
            }`}
          >
            <Diamond className="w-5 h-5" />
            <span className="text-xs mt-1">Diamond</span>
          </button>
          <button
            onClick={() => onToggleCamo('darkSpice')}
            disabled={isLocked || !progress.diamond}
            className={`flex flex-col items-center p-2 rounded transition-colors ${
              progress.darkSpice ? 'bg-orange-500/20 text-orange-500' : 'bg-gray-700/50 text-gray-400'
            }`}
          >
            <Flame className="w-5 h-5" />
            <span className="text-xs mt-1">Dark Spine</span>
          </button>
          <button
            onClick={() => onToggleCamo('darkMatter')}
            disabled={isLocked || !progress.darkSpice}
            className={`flex flex-col items-center p-2 rounded transition-colors ${
              progress.darkMatter ? 'bg-purple-500/20 text-purple-500' : 'bg-gray-700/50 text-gray-400'
            }`}
          >
            <Skull className="w-5 h-5" />
            <span className="text-xs mt-1">Dark Matter</span>
          </button>
        </div>
      </div>
    </div>
  );
}