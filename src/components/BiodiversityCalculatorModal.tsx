import React, { useState } from 'react';
import { Calculator, X, Plus, Trash2, Sparkles, Info, HelpCircle } from 'lucide-react';
import { useToast } from './Toast';

interface SpeciesSample {
  name: string;
  count: number;
}

interface BiodiversityCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BiodiversityCalculatorModal: React.FC<BiodiversityCalculatorModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useToast();
  const [samples, setSamples] = useState<SpeciesSample[]>([
    { name: 'Panthera tigris sumatrae', count: 12 },
    { name: 'Pongo tapanuliensis', count: 8 },
    { name: 'Leucopsar rothschildi', count: 24 },
    { name: 'Rafflesia arnoldii', count: 5 },
    { name: 'Varanus komodoensis', count: 18 },
  ]);
  const [newSpeciesName, setNewSpeciesName] = useState('');
  const [newSpeciesCount, setNewSpeciesCount] = useState<number | ''>('');

  if (!isOpen) return null;

  const totalIndividuals = samples.reduce((acc, curr) => acc + curr.count, 0);
  const speciesRichness = samples.filter((s) => s.count > 0).length;

  // Shannon-Wiener Index: H' = - sum(pi * ln(pi))
  let shannonIndex = 0;
  let simpsonIndex = 0;

  if (totalIndividuals > 0) {
    samples.forEach((s) => {
      if (s.count > 0) {
        const p = s.count / totalIndividuals;
        shannonIndex -= p * Math.log(p);
        simpsonIndex += p * p;
      }
    });
  }

  // Pielou Evenness: E = H' / ln(S)
  const pielouEvenness = speciesRichness > 1 ? shannonIndex / Math.log(speciesRichness) : 0;

  const handleAddSample = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpeciesName.trim() || !newSpeciesCount || newSpeciesCount <= 0) {
      showToast('Masukkan nama taksa dan jumlah individu yang valid.', 'warning');
      return;
    }
    setSamples([...samples, { name: newSpeciesName.trim(), count: Number(newSpeciesCount) }]);
    setNewSpeciesName('');
    setNewSpeciesCount('');
    showToast(`Taksa "${newSpeciesName}" berhasil ditambahkan ke sampel.`, 'success');
  };

  const handleRemoveSample = (index: number) => {
    setSamples(samples.filter((_, i) => i !== index));
  };

  const getShannonInterpretation = (h: number) => {
    if (h > 3.0) return { label: 'Tinggi (Ekosistem Sangat Stabil)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (h >= 1.0) return { label: 'Sedang (Ekosistem Cukup Stabil)', color: 'text-amber-800 bg-amber-50 border-amber-200' };
    return { label: 'Rendah (Ekosistem Tertekan / Rentan)', color: 'text-red-700 bg-red-50 border-red-200' };
  };

  const interpretation = getShannonInterpretation(shannonIndex);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#062e23]/10 max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#062e23]/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#062e23] to-[#1a5948] text-[#d4a373] flex items-center justify-center font-bold shadow-md">
              <Calculator size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#062e23]">
                Kalkulator Indeks Ekologi & Keanekaragaman
              </h2>
              <p className="text-xs text-[#2d5a4c]/70">Analisis Kuantitatif Shannon-Wiener ($H'$), Simpson ($D$), & Kemerataan Pielou ($E$)</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-[#e8ede6] transition-colors">
            <X size={20} className="text-[#062e23]" />
          </button>
        </div>

        {/* Live Metrics Result Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass-card gradient-border p-4 text-center rounded-2xl">
            <div className="text-[10px] font-bold text-[#2d5a4c] uppercase tracking-wider">Shannon-Wiener ($H'$)</div>
            <div className="text-3xl font-serif font-bold text-[#062e23] my-1">{shannonIndex.toFixed(3)}</div>
            <div className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border inline-block ${interpretation.color}`}>
              {interpretation.label}
            </div>
          </div>

          <div className="glass-card gradient-border p-4 text-center rounded-2xl">
            <div className="text-[10px] font-bold text-[#2d5a4c] uppercase tracking-wider">Simpson Dominansi ($D$)</div>
            <div className="text-3xl font-serif font-bold text-amber-900 my-1">{simpsonIndex.toFixed(3)}</div>
            <div className="text-[10px] text-[#2d5a4c]/70 font-semibold">1 - D = {(1 - simpsonIndex).toFixed(3)} (Keanekaragaman)</div>
          </div>

          <div className="glass-card gradient-border p-4 text-center rounded-2xl">
            <div className="text-[10px] font-bold text-[#2d5a4c] uppercase tracking-wider">Kemerataan Pielou ($E$)</div>
            <div className="text-3xl font-serif font-bold text-emerald-800 my-1">{pielouEvenness.toFixed(3)}</div>
            <div className="text-[10px] text-[#2d5a4c]/70 font-semibold">{speciesRichness} Taksa ($S$) • {totalIndividuals} Individu ($N$)</div>
          </div>
        </div>

        {/* Sample Inputs */}
        <div className="space-y-4">
          <form onSubmit={handleAddSample} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Nama Spesies (contoh: Pongo tapanuliensis)..."
              value={newSpeciesName}
              onChange={(e) => setNewSpeciesName(e.target.value)}
              className="input-glow flex-1 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#062e23] bg-[#f9faf6] focus:outline-none"
            />
            <input
              type="number"
              placeholder="Jumlah Individu..."
              value={newSpeciesCount}
              onChange={(e) => setNewSpeciesCount(e.target.value ? Number(e.target.value) : '')}
              className="input-glow w-full sm:w-36 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#062e23] bg-[#f9faf6] focus:outline-none"
            />
            <button
              type="submit"
              className="shimmer-btn bg-[#062e23] hover:bg-[#1a5948] text-[#d4a373] px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 shadow-md"
            >
              <Plus size={16} />
              <span>Tambah Sampel</span>
            </button>
          </form>

          {/* Sample Table */}
          <div className="border border-[#062e23]/10 rounded-2xl overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#e8ede6] text-[#062e23] font-bold">
                <tr>
                  <th className="p-3">Nama Taksa Spesies</th>
                  <th className="p-3">Jumlah ($n_i$)</th>
                  <th className="p-3">Proporsi ($p_i$)</th>
                  <th className="p-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#062e23]/10">
                {samples.map((s, i) => {
                  const pi = totalIndividuals > 0 ? (s.count / totalIndividuals).toFixed(4) : '0';
                  return (
                    <tr key={i} className="hover:bg-[#f9faf6]">
                      <td className="p-3 font-serif italic font-semibold text-[#062e23]">{s.name}</td>
                      <td className="p-3 font-bold">{s.count}</td>
                      <td className="p-3 font-mono text-[#2d5a4c]">{pi}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleRemoveSample(i)}
                          className="p-1 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
