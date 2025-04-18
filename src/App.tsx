import { useEffect, useState } from "react";
import { GeoList } from "./core/providers/geo/GeoList";
import { PlinkoGame } from "./widgets/Plinko/Plinko";

import { GeoState } from "./core/providers/geo/GeoContext";
import { GeoProvider } from "./core/providers/geo/GeoProvider";
import { FinalBank } from "./widgets/FinalBank";
import { Toaster } from "./components/ui/sonner";
import { Preloader } from "./widgets/Preloader";

// Todo: переместить лоадер в игру
enum WidgetState {
  GEO,
  LOAD,
  GAME,
  BANK,
}

function App() {
  const [geo, setGeo] = useState<GeoState>(GeoList[0]);
  const [widget, setWidget] = useState<WidgetState>(WidgetState.LOAD);

  const nextWidget = () => {
    setWidget((widget) => widget + 1);
  };
  useEffect(() => {
    const geo = document.documentElement.dataset.geo;
    setGeo(GeoList[Number(geo) ?? 0])
  }, []);

  return (
    <GeoProvider geo={geo}>
      <main className="h-screen flex flex-col bg-gradient">
        {/* {widget === WidgetState.GEO && <GeoSelector onSelectGeo={selectGeo} />} */}
        {widget === WidgetState.LOAD && <Preloader onFinish={nextWidget} />}
        {widget === WidgetState.GAME && <PlinkoGame onFinish={nextWidget} />}
        {widget === WidgetState.BANK && <FinalBank />}

        <Toaster position="top-center" className="pointer-events-auto" />
      </main>
    </GeoProvider>
  );
}

export default App;
