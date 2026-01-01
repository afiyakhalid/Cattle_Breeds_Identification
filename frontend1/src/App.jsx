// import React from "react";

// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Home from "./pages/Home";
// import PredictionPage from "./pages/PredictionPage";
// import LibraryPage from "./pages/LibraryPage";
// import HistoryPage from "./pages/HistoryPage";
// import VisualizationPage from "./pages/VisualizationPage";
// import HealthPage from "./pages/HealthPage";
// import AnalyticsPage from "./pages/AnalyticsPage";

// const App = () => (
//   <Router>
//     <Switch>
//       <Route path="/" exact component={Home} />
//       <Route path="/predict" component={PredictionPage} />
//       <Route path="/library" component={LibraryPage} />
//       <Route path="/history" component={HistoryPage} />
//       <Route path="/visualization" component={VisualizationPage} />
//       <Route path="/health" component={HealthPage} />
//       <Route path="/analytics" component={AnalyticsPage} />
//     </Switch>
//   </Router>
// );

// export default App;
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Updated import
import Home from "./pages/Home";
import PredictionPage from "./pages/PredictionPage";
import LibraryPage from "./pages/LibraryPage";
import HistoryPage from "./pages/HistoryPage";
import VisualizationPage from "./pages/VisualizationPage";
import HealthPage from "./pages/HealthPage";
import AnalyticsPage from "./pages/AnalyticsPage";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/predict" element={<PredictionPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/visualization" element={<VisualizationPage />} />
      <Route path="/health" element={<HealthPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
    </Routes>
  </Router>
);

export default App;