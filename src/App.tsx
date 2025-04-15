import { useState } from "react";
import { GeoList } from "./core/providers/geo/GeoList";
import { Plinko } from "./widgets/Plinko/Plinko";
import { GeoSelector } from "./widgets/GeoSelector";
import { GeoState } from "./core/providers/geo/GeoContext";
import { GeoProvider } from "./core/providers/geo/GeoProvider";
import { Final } from "./widgets/Final";

function App() {
  const [geo, setGeo] = useState<GeoState>(GeoList[0]);
  const [hasGeo, setHasGeo] = useState(false);
  const [final, setFinal] = useState(false);

  const selectGeo = (geo: GeoState) => {
    setHasGeo(true);
    setGeo(geo);
  };

  const finishGame = () => {
    setFinal(true);
  };

  return (
    <GeoProvider geo={geo}>
      <main className="h-screen flex flex-col">
        {!hasGeo && <GeoSelector onSelectGeo={selectGeo} />}

        {hasGeo && <Plinko onFinish={finishGame} />}
        {final && <Final />}
      </main>
    </GeoProvider>
  );
}

export default App;
