import React, { useState, useEffect } from 'react';
import NavigationInterface from './components/ui/NavigationInterface';
import AudioSettings from './components/ui/AudioSettings';
import { NavigationStep, AudioSettings as AudioSettingsType } from './types';
import './styles/globals.css';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [routePreferences] = useState({
    avoidTolls: false,
    avoidHighways: false,
    preferAccessiblePaths: true
  });
  const [audioSettings, setAudioSettings] = useState<AudioSettingsType>({
    volume: 80,
    voiceType: 'standard',
    speechRate: 1.0,
    language: 'English'
  });
  const [aiResponse, setAiResponse] = useState('');

  // Navigation data simulation
  const getNavigationSteps = (): NavigationStep[] => [
    {
      instruction: 'Turn right',
      street: 'Main Street',
      distance: '200 meters',
      arrow: 'right',
      pathDescription: 'Wide sidewalk with tactile paving and good lighting',
      laneGuidance: 'Move to the rightmost lane before turning',
      intersectionType: 'standard'
    },
    {
      instruction: 'Continue straight',
      street: 'Main Street',
      distance: '400 meters',
      arrow: 'straight',
      pathDescription: 'Pedestrian crossing with audible signal and countdown timer',
      laneGuidance: 'Stay in current lane',
      intersectionType: 'standard'
    },
    {
      instruction: 'Take the second exit',
      street: 'Park Avenue',
      distance: '150 meters',
      arrow: 'roundabout',
      pathDescription: 'Roundabout with pedestrian islands and clear signage',
      laneGuidance: 'Use the right lane to take the second exit',
      intersectionType: 'roundabout'
    },
    {
      instruction: 'Turn left',
      street: 'Oak Street',
      distance: '300 meters',
      arrow: 'left',
      pathDescription: 'Crosswalk with countdown timer and accessible ramp',
      laneGuidance: 'Move to the leftmost lane before turning',
      intersectionType: 'standard'
    },
    {
      instruction: 'You have arrived',
      street: 'Community Center',
      distance: '0 meters',
      arrow: 'destination',
      pathDescription: 'Accessible entrance with ramp and automatic doors',
      laneGuidance: '',
      intersectionType: 'destination'
    }
  ];

  const getEstimatedTime = () => {
    const totalSteps = getNavigationSteps().length;
    const stepsRemaining = totalSteps - currentStep;
    return Math.max(stepsRemaining * 2, 1);
  };

  // Auto-advance navigation for demo
  useEffect(() => {
    if (currentStep < getNavigationSteps().length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // Event handlers
  const handleCancel = () => {
    setCurrentStep(0);
    setAiResponse('Navigation cancelled. You can start a new route anytime.');
  };

  const handleReroute = () => {
    setAiResponse('Calculating alternative route...');
    setTimeout(() => {
      setAiResponse('Alternative route found. Updated directions will prioritize accessible paths.');
    }, 2000);
  };

  const handleAskAI = (question: string) => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('language') || lowerQuestion.includes('speak')) {
      if (lowerQuestion.includes('spanish')) {
        setAudioSettings(prev => ({ ...prev, language: 'Spanish' }));
        setAiResponse('Language changed to Spanish. ¡Continuemos con la navegación!');
      } else if (lowerQuestion.includes('french')) {
        setAudioSettings(prev => ({ ...prev, language: 'French' }));
        setAiResponse('Language changed to French. Continuons la navigation!');
      } else if (lowerQuestion.includes('english')) {
        setAudioSettings(prev => ({ ...prev, language: 'English' }));
        setAiResponse('Language changed to English. Continuing navigation.');
      } else {
        setAiResponse('Available languages: English, Spanish, French. Just say "change to Spanish" for example.');
      }
    } else if (lowerQuestion.includes('reroute') || lowerQuestion.includes('alternative')) {
      handleReroute();
    } else if (lowerQuestion.includes('cancel') || lowerQuestion.includes('stop')) {
      handleCancel();
    } else if (lowerQuestion.includes('eta') || lowerQuestion.includes('time') || lowerQuestion.includes('arrive')) {
      setAiResponse(`You should arrive in approximately ${getEstimatedTime()} minutes.`);
    } else if (lowerQuestion.includes('where') || lowerQuestion.includes('location')) {
      setAiResponse(`You're currently on ${getNavigationSteps()[currentStep].street}, heading to Community Center.`);
    } else if (lowerQuestion.includes('help') || lowerQuestion.includes('commands')) {
      setAiResponse('I can help with: changing language, rerouting, estimated arrival time, current location, or canceling navigation.');
    } else {
      setAiResponse("I can help with navigation, language settings, rerouting, or time estimates. What would you like to know?");
    }
  };

  const handleSaveSettings = (settings: AudioSettingsType) => {
    setAudioSettings(settings);
    setShowSettings(false);
    setAiResponse('Audio settings updated successfully!');
  };

  const currentNavigationStep = getNavigationSteps()[currentStep];
  const upcomingSteps = getNavigationSteps().slice(currentStep + 1, currentStep + 3);

  return (
    <div className="app-container bg-gray-100 min-h-screen">
      {showSettings ? (
        <AudioSettings
          onSave={handleSaveSettings}
          initialSettings={audioSettings}
        />
      ) : (
        <NavigationInterface
          navigationStep={currentNavigationStep}
          upcomingSteps={upcomingSteps}
          estimatedTime={getEstimatedTime()}
          destination="Community Center"
          routeType={routePreferences.preferAccessiblePaths ? 'Accessible Route' : 'Standard Route'}
          spokenLanguage={audioSettings.language}
          aiResponse={aiResponse}
          onSettingsClick={() => setShowSettings(true)}
          onCancelClick={handleCancel}
          onRerouteClick={handleReroute}
          onAskAI={handleAskAI}
        />
      )}
    </div>
  );
}

export default App;