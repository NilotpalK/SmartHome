import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import FanCard from "./components/FanCard.jsx";
import BulbCard from "./components/BulbCard.jsx";
import LedCard from "./components/LedCard.jsx";
import AcCard from "./components/AcCard.jsx";
import CardWrapper from "./components/CardWrapper.jsx";



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

      {/*<FanCard teamId="your_team_id" device="Fan" />*/}
      {/*<BulbCard teamId="your_team_id" device="Bulb"/>*/}
      {/*<LedCard teamId="your_team_id" device="Led"/>*/}
      {/*<AcCard teamId="your_team_id" device="AC"/>*/}
      <CardWrapper/>




  </React.StrictMode>,
)
