import React from 'react';

interface BattleTypeDropdownProps {
  selection: string;
  setSelection: (value: string) => void;
}

const BattleTypeDropdown: React.FC<BattleTypeDropdownProps> = ({ selection, setSelection }) => {
  return (
    <select
      value={selection}
      onChange={(e) => setSelection(e.target.value)}
      className="text-orange-400 bg-gray-800 border-2 border-gray-600 rounded-lg p-2 mb-20 w-64"
      data-testid="battle-type-dropdown"
    >
      <option value="CHOOSE BATTLE TYPE">CHOOSE BATTLE TYPE</option>
      <option value="THE FINAL BATTLE">THE FINAL BATTLE</option>
      <option value="DUEL">DUEL</option>
      <option value="ENCOUNTER">ENCOUNTER</option>
    </select>
  );
};

export default BattleTypeDropdown;
