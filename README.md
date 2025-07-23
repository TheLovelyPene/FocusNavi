# FocusNavi
A more accessible way to navigate
Navigation App

This is a simple React-based navigation application prototype that demonstrates a basic GPS-like interface with dynamic route instructions and customizable audio settings. It simulates different routing scenarios based on user preferences.
Features

    Real-time Navigation Simulation: Displays current and upcoming turn-by-turn instructions.

    Dynamic Routing: Simulates different routes (fastest, avoid highways, avoid tolls, avoid both) based on predefined preferences.

    Estimated Time & ETA: Shows estimated time remaining and arrival time.

    Audio Settings: A modal interface to adjust navigation volume, voice type, and speech rate.

    Responsive Design: Built with Tailwind CSS to adapt to different screen sizes.

    Cancel & Reroute Options: Buttons to simulate canceling navigation or requesting a new route.

Technologies Used

    React: A JavaScript library for building user interfaces.

    Tailwind CSS: A utility-first CSS framework for rapid UI development.

    JavaScript (ES6+): For application logic and state management.


Project Structure

navigation-app/
├── public/
│   └── index.html         # Main HTML file
├── src/
│   ├── components/
│   │   ├── AudioSettings.js     # Component for audio preferences
│   │   └── NavigationInterface.js # Main navigation display component
│   ├── App.js             # Main application component
│   └── index.js           # React entry point
└── package.json           # Project dependencies and scripts

Future Improvements

    Integrate with a real mapping API (e.g., Google Maps, Mapbox) for actual navigation data.

    Add more route preference options (e.g., avoid ferries, shortest route).

    Implement persistent storage for audio and route preferences.

    Enhance visual feedback for current location and upcoming turns on a map.

    Improve accessibility features.
