import React, { useState, useMemo } from 'react';
import { STATE_COLLEGES_DATA, getOrCreateStateData, CollegeInfo } from '../data/stateCollegesData';
import indiaSvgData from '../data/indiaStateSvgPaths.json';
import {
  MapPin,
  Building2,
  Users,
  Search,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Sparkles,
  ExternalLink,
  ChevronRight,
  SlidersHorizontal,
  Info
} from 'lucide-react';

interface StateCollegeLocatorProps {
  onNavigateToInstitution?: (institutionId: number) => void;
}

export const StateCollegeLocator: React.FC<StateCollegeLocatorProps> = ({ onNavigateToInstitution }) => {
  const [selectedState, setSelectedState] = useState<string>('Delhi');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [selectedCollegeModal, setSelectedCollegeModal] = useState<CollegeInfo | null>(null);

  const statePaths: Record<string, string> = (indiaSvgData as any).paths || {};
  const stateCenters: Record<string, [number, number]> = (indiaSvgData as any).centers || {};

  // List of all states available in the GeoJSON
  const allStateNames = useMemo(() => {
    return Object.keys(statePaths).sort((a, b) => a.localeCompare(b));
  }, [statePaths]);

  // Current state data
  const currentStateData = useMemo(() => {
    return getOrCreateStateData(selectedState);
  }, [selectedState]);

  // Filtered colleges in current state
  const filteredColleges = useMemo(() => {
    let list = currentStateData.colleges;

    if (filterType !== 'ALL') {
      list = list.filter((c) => c.type.toLowerCase().includes(filterType.toLowerCase()));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q) ||
          c.district.toLowerCase().includes(q) ||
          c.aicte_id.toLowerCase().includes(q)
      );
    }

    return list;
  }, [currentStateData, searchQuery, filterType]);

  // Global search match check (if user types college in search bar that belongs to another state)
  const handleGlobalSearch = (val: string) => {
    setSearchQuery(val);
    if (!val.trim()) return;
    const q = val.toLowerCase();

    // Check if Bhagwan Parshuram or BPIT searched
    if (q.includes('bhagwan') || q.includes('parshuram') || q.includes('bpit')) {
      setSelectedState('Delhi');
      return;
    }

    // Check across all defined states
    for (const [stName, stData] of Object.entries(STATE_COLLEGES_DATA)) {
      const found = stData.colleges.some(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q) ||
          c.aicte_id.toLowerCase().includes(q)
      );
      if (found) {
        setSelectedState(stName);
        break;
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-sm p-4 shadow-2xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 bg-[#0b2545]/10 text-[#0b2545] rounded">
              <MapPin className="w-5 h-5 text-[#0b2545]" />
            </span>
            <h2 className="text-xl font-bold text-[#0b2545] tracking-tight">
              National GIS State College Locator
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Interactive GeoJSON spatial mapping of AICTE approved colleges and enrolled student capacity across India
          </p>
        </div>

        {/* State Selector Dropdown & Search */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleGlobalSearch(e.target.value)}
              placeholder="Search college, BPIT, city, AICTE ID..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
            />
          </div>

          <select
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSearchQuery('');
            }}
            className="py-1.5 px-3 text-xs bg-white border border-slate-300 rounded font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
          >
            {allStateNames.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Stats for Selected State */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* State Colleges */}
        <div className="bg-white border border-slate-200 p-4 rounded shadow-2xs border-l-4 border-l-[#0b2545]">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Approved Colleges</span>
            <Building2 className="w-4 h-4 text-[#0b2545]" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">
            {currentStateData.total_colleges.toLocaleString()}
          </div>
          <div className="text-[11px] text-[#0b2545] font-medium mt-0.5">
            in {currentStateData.state_name}
          </div>
        </div>

        {/* State Students */}
        <div className="bg-white border border-slate-200 p-4 rounded shadow-2xs border-l-4 border-l-blue-600">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Enrolled Students</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">
            {currentStateData.total_students.toLocaleString()}
          </div>
          <div className="text-[11px] text-blue-700 font-medium mt-0.5">
            Active APAAR Verified
          </div>
        </div>

        {/* Sanctioned Seats */}
        <div className="bg-white border border-slate-200 p-4 rounded shadow-2xs border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Sanctioned Intake</span>
            <GraduationCap className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">
            {currentStateData.sanctioned_intake.toLocaleString()}
          </div>
          <div className="text-[11px] text-amber-700 font-medium mt-0.5">
            Approved Seat Ceiling
          </div>
        </div>

        {/* Intake Compliance Rate */}
        <div className="bg-white border border-slate-200 p-4 rounded shadow-2xs border-l-4 border-l-indigo-600">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Intake Compliance</span>
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-indigo-900 tracking-tight">
            {currentStateData.compliance_rate}%
          </div>
          <div className="text-[11px] text-indigo-700 font-medium mt-0.5">
            Statutory AICTE Norms
          </div>
        </div>
      </div>

      {/* Main Dual Grid: GeoJSON Vector Map & State Colleges Listing */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive GeoJSON India Map (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded shadow-2xs p-4 space-y-3">
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <div>
              <h3 className="font-bold text-[#0b2545] text-sm flex items-center gap-1.5">
                <span>GeoJSON State Boundary Map</span>
              </h3>
              <p className="text-[11px] text-slate-500">
                Click any state polygon to locate colleges &amp; inspect enrollment
              </p>
            </div>
            {hoveredState && (
              <span className="text-xs bg-[#0b2545] text-white px-2 py-0.5 rounded font-semibold animate-pulse">
                {hoveredState}
              </span>
            )}
          </div>

          {/* SVG Map Container */}
          <div className="relative bg-[#f0f7ff]/60 border border-blue-100 rounded p-2 flex items-center justify-center overflow-hidden">
            <svg
              viewBox="0 0 800 850"
              className="w-full h-auto max-h-[500px] select-none"
              style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.05))' }}
            >
              <g className="india-states">
                {Object.entries(statePaths).map(([stName, pathStr]) => {
                  const isSelected = stName === selectedState;
                  const isHovered = stName === hoveredState;

                  return (
                    <path
                      key={stName}
                      d={pathStr}
                      onClick={() => {
                        setSelectedState(stName);
                        setSearchQuery('');
                      }}
                      onMouseEnter={() => setHoveredState(stName)}
                      onMouseLeave={() => setHoveredState(null)}
                      className="cursor-pointer transition-all duration-200"
                      fill={
                        isSelected
                          ? '#0b2545'
                          : isHovered
                          ? '#2563eb'
                          : '#cbd5e1'
                      }
                      stroke={isSelected ? '#d97706' : '#ffffff'}
                      strokeWidth={isSelected ? '2.5' : '1'}
                      style={{
                        outline: 'none',
                        opacity: isSelected ? 1 : isHovered ? 0.95 : 0.8
                      }}
                    >
                      <title>{stName}</title>
                    </path>
                  );
                })}
              </g>

              {/* State Centers / Pin on Selected State */}
              {stateCenters[selectedState] && (
                <g
                  transform={`translate(${stateCenters[selectedState][0]}, ${stateCenters[selectedState][1]})`}
                  className="pointer-events-none"
                >
                  <circle r="14" fill="#d97706" opacity="0.3" className="animate-ping" />
                  <circle r="7" fill="#d97706" stroke="#ffffff" strokeWidth="2" />
                  <text
                    y="-12"
                    textAnchor="middle"
                    fill="#0b2545"
                    fontSize="13"
                    fontWeight="bold"
                    className="bg-white"
                  >
                    {selectedState}
                  </text>
                </g>
              )}
            </svg>

            {/* Map Legend */}
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs p-2 rounded border border-slate-200 text-[10px] space-y-1 shadow-xs">
              <div className="font-semibold text-slate-700">Map Legend</div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#0b2545]"></span>
                <span className="text-slate-600">Selected State ({selectedState})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#2563eb]"></span>
                <span className="text-slate-600">Hover Focus</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#cbd5e1]"></span>
                <span className="text-slate-600">State Territories</span>
              </div>
            </div>
          </div>

          {/* Quick State Chips */}
          <div className="flex flex-wrap gap-1 text-[11px]">
            <span className="text-slate-500 font-medium py-0.5">Quick Jump:</span>
            {['Delhi', 'Uttar Pradesh', 'Punjab', 'Haryana', 'Rajasthan', 'Maharashtra'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedState(st)}
                className={`px-2 py-0.5 rounded transition ${
                  selectedState === st
                    ? 'bg-[#0b2545] text-white font-semibold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Colleges in Selected State (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded shadow-2xs overflow-hidden">
          {/* Header Strip with Filters */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h3 className="font-bold text-[#0b2545] text-sm flex items-center gap-1.5">
                <span>Institutions in {selectedState}</span>
                <span className="bg-[#0b2545] text-white text-[11px] px-2 py-0.2 rounded font-bold">
                  {filteredColleges.length} Listed
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Statutory student registrations, intake quota &amp; regulatory ratings
              </p>
            </div>

            {/* Filter by Type */}
            <div className="flex items-center space-x-1 text-xs">
              <span className="text-slate-500 flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3" /> Type:
              </span>
              <button
                onClick={() => setFilterType('ALL')}
                className={`px-2 py-0.5 rounded font-medium ${
                  filterType === 'ALL'
                    ? 'bg-[#0b2545] text-white'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('autonomous')}
                className={`px-2 py-0.5 rounded font-medium ${
                  filterType === 'autonomous'
                    ? 'bg-[#0b2545] text-white'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Autonomous
              </button>
              <button
                onClick={() => setFilterType('university')}
                className={`px-2 py-0.5 rounded font-medium ${
                  filterType === 'university'
                    ? 'bg-[#0b2545] text-white'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                University
              </button>
            </div>
          </div>

          {/* College Cards List */}
          <div className="p-4 space-y-3.5 max-h-[620px] overflow-y-auto">
            {filteredColleges.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm">
                <Building2 className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p>No colleges found matching "{searchQuery}".</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-2 text-xs text-[#0b2545] font-semibold hover:underline"
                >
                  Clear search query
                </button>
              </div>
            ) : (
              filteredColleges.map((college) => {
                const fillPercent = Math.min(
                  100,
                  Math.round((college.student_count / college.approved_intake) * 100)
                );

                return (
                  <div
                    key={college.id}
                    className={`border rounded p-3.5 transition-all ${
                      college.featured
                        ? 'border-blue-300 bg-blue-50/40 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-sm hover:text-[#0b2545]">
                            {college.name}
                          </h4>
                          {college.featured && (
                            <span className="flex items-center gap-1 bg-[#0b2545] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                              <Sparkles className="w-3 h-3 text-amber-400" /> Flagship Prototype Campus
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                          <span className="font-mono text-[11px] bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                            {college.aicte_id}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-slate-500">
                            <MapPin className="w-3 h-3 text-blue-700" />
                            {college.city}, {college.district}
                          </span>
                          <span>•</span>
                          <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[11px]">
                            {college.type}
                          </span>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-end gap-1.5 flex-shrink-0">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3" />
                          {college.compliance_status}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500">
                          Rating: <strong className="text-slate-800">{college.rating}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar & Seat Intake Summary */}
                    <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div className="w-full sm:w-2/3 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-600 font-medium">Enrolled Students / Sanctioned Seats:</span>
                          <span className="font-mono font-bold text-slate-800">
                            {college.student_count} / {college.approved_intake} ({fillPercent}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-[#0b2545] h-full rounded-full transition-all duration-300"
                            style={{ width: `${fillPercent}%` }}
                          ></div>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedCollegeModal(college)}
                        className="text-xs font-semibold text-[#0b2545] hover:text-[#133863] flex items-center space-x-1 hover:underline"
                      >
                        <span>Inspect Profile</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* College Inspection Modal */}
      {selectedCollegeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-md shadow-xl border border-slate-300 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95">
            <div className="bg-[#0b2545] text-white p-4 flex justify-between items-center">
              <div>
                <span className="text-[11px] text-blue-200 uppercase tracking-wider font-semibold">
                  Institutional Profile &amp; Quota Matrix
                </span>
                <h3 className="font-bold text-base mt-0.5 leading-snug">
                  {selectedCollegeModal.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCollegeModal(null)}
                className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded border border-slate-200">
                <div>
                  <span className="text-slate-500 font-medium">AICTE Unique ID:</span>
                  <div className="font-mono font-bold text-slate-800 mt-0.5">
                    {selectedCollegeModal.aicte_id}
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">State / District:</span>
                  <div className="font-semibold text-slate-800 mt-0.5">
                    {selectedCollegeModal.state} ({selectedCollegeModal.district})
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">Established:</span>
                  <div className="font-semibold text-slate-800 mt-0.5">
                    {selectedCollegeModal.established_year}
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">Regulatory Grade:</span>
                  <div className="font-semibold text-[#0b2545] mt-0.5">
                    {selectedCollegeModal.rating}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 mb-1">Intake Compliance &amp; Dedup Status</h4>
                <p className="text-slate-600 leading-relaxed">
                  All {selectedCollegeModal.student_count} registered students are cross-verified against the National APAAR Registry for the academic year 2026–27 with zero pending identity conflicts.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  onClick={() => setSelectedCollegeModal(null)}
                  className="px-4 py-2 border border-slate-300 rounded font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Close
                </button>
                {selectedCollegeModal.id === 'bpit-delhi' && onNavigateToInstitution && (
                  <button
                    onClick={() => {
                      setSelectedCollegeModal(null);
                      onNavigateToInstitution(1);
                    }}
                    className="px-4 py-2 bg-[#0b2545] text-white rounded font-bold hover:bg-[#133863] shadow-xs"
                  >
                    Open BPIT Institution Portal
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
