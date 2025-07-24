import React, { useState } from 'react';
import { Settings, X, RotateCcw, MessageCircle } from 'lucide-react';
import { NavigationStep } from '../../types';

interface NavigationInterfaceProps {
  navigationStep: NavigationStep;
  upcomingSteps: NavigationStep[];
  estimatedTime: number;
  destination: string;
  routeType: string;
  spokenLanguage: string;
  aiResponse: string;
  onSettingsClick: () => void;
  onCancelClick: () => void;
  onRerouteClick: () => void;
  onAskAI: (question: string) => void;
}

const NavigationInterface: React.FC<NavigationInterfaceProps> = ({
  navigationStep,
  upcomingSteps,
  estimatedTime,
  destination,
  routeType,
  spokenLanguage,
  aiResponse,
  onSettingsClick,
  onCancelClick,
  onRerouteClick,
  onAskAI
}) => {
  const [aiQuestion, setAiQuestion] = useState('');

  const handleAskAI = () => {
    if (aiQuestion.trim()) {
      onAskAI(aiQuestion);
      setAiQuestion('');
    }
  };

  const renderArrow = (arrowType: string) => {
    const arrowMap: { [key: string]: string } = {
      'right': '→',
      'left': '←',
      'straight': '↑',
      'roundabout': '⟲',
      'destination': '🏁',
      'default': '•'
    };
    return arrowMap[arrowType] || arrowMap['default'];
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Current Instruction - Main Focus */}
        <div className="bg-white rounded-xl shadow-xl p-8 border-l-8 border-blue-600">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-5xl font-bold text-gray-800 mb-2">
                {navigationStep.instruction}
              </h1>
              <h2 className="text-3xl text-gray-700 mb-2">
                {navigationStep.street}
              </h2>
              <p className="text-2xl text-gray-600 font-semibold">
                {navigationStep.distance}
              </p>
            </div>
            <div className="text-8xl ml-8 text-blue-600">
              {renderArrow(navigationStep.arrow)}
            </div>
          </div>

          {navigationStep.laneGuidance && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-4">
              <p className="text-blue-800 text-lg">
                <strong>Lane Guidance:</strong> {navigationStep.laneGuidance}
              </p>
            </div>
          )}

          {navigationStep.pathDescription && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
              <p className="text-green-800 text-lg">
                <strong>Path Description:</strong> {navigationStep.pathDescription}
              </p>
            </div>
          )}
        </div>

        {/* Upcoming Steps */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📍</span>
            Coming Up
          </h3>
          <div className="space-y-4">
            {upcomingSteps.map((step, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-3xl mr-4 text-gray-600">
                  {renderArrow(step.arrow)}
                </span>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-800">{step.instruction}</p>
                  <p className="text-gray-600">{step.street} • {step.distance}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trip Information */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-gray-500 text-sm uppercase tracking-wide">ETA</p>
              <p className="text-2xl font-bold text-gray-800">
                {new Date(Date.now() + estimatedTime * 60000).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 text-sm uppercase tracking-wide">Time Left</p>
              <p className="text-2xl font-bold text-gray-800">{estimatedTime} min</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 text-sm uppercase tracking-wide">Destination</p>
              <p className="text-lg font-semibold text-gray-800">{destination}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 text-sm uppercase tracking-wide">Route</p>
              <p className="text-lg font-semibold text-gray-800">{routeType}</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-500 text-sm uppercase tracking-wide">Language</p>
            <p className="text-xl font-semibold text-gray-800">{spokenLanguage}</p>
          </div>
        </div>

        {/* AI Response */}
        {aiResponse && (
          <div className="bg-purple-50 border-l-4 border-purple-400 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-purple-800 mb-2 flex items-center">
              <MessageCircle className="mr-2" size={24} />
              AI Assistant
            </h3>
            <p className="text-lg text-purple-900">{aiResponse}</p>
          </div>
        )}

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <button
              onClick={onSettingsClick}
              className="flex items-center justify-center py-4 px-6 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold text-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-gray-400"
            >
              <Settings className="mr-2" size={20} />
              Settings
            </button>
            <button
              onClick={onCancelClick}
              className="flex items-center justify-center py-4 px-6 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold text-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-red-300"
            >
              <X className="mr-2" size={20} />
              Cancel
            </button>
            <button
              onClick={onRerouteClick}
              className="flex items-center justify-center py-4 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold text-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <RotateCcw className="mr-2" size={20} />
              Reroute
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              placeholder="Ask AI for help..."
              className="flex-1 p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-purple-500"
              onKeyPress={(e) => e.key === 'Enter' && handleAskAI()}
            />
            <button
              onClick={handleAskAI}
              className="px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300"
            >
              <MessageCircle size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationInterface;