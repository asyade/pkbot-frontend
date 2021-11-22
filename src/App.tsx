import { render } from "react-dom";
import { useEffect, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import SideMenu from './components/SideMenu'
import Market from "./pages/Market"
import './index.css'
import  MarketProvider, { MarketContext } from "./contexts/MarketContext";

function App() {
  const marketContext = useContext(MarketContext)
  
  useEffect(() => {
    marketContext?.loadMarkets();
  });

  return(
    <MarketProvider>
      <div className="MainContainer">
        <SideMenu></SideMenu>
        <div className="PageCotnainer">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Market />}>
                {/* <Route path="teams" element={<Teams />}> */}
                  {/* <Route path=":teamId" element={<Team />} /> */}
                  {/* <Route path="new" element={<NewTeamForm />} /> */}
                  {/* <Route index element={<LeagueStandings />} /> */}
                {/* </Route> */}
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </MarketProvider>
  )
}

export default App