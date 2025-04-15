import { useState } from "react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "./components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import { GeoList } from "./core/providers/geo/GeoList";
import { Plinko } from "./widgets/Plinko/Plinko";
import { GeoSelector } from "./widgets/GeoSelector";
import { GeoState } from "./core/providers/geo/GeoContext";
import { GeoProvider } from "./core/providers/geo/GeoProvider";

function App() {
  const [geo, setGeo] = useState<GeoState>(GeoList[0]);
  const [hasGeo, setHasGeo] = useState(false);

  const selectGeo = (geo: GeoState) => {
    setHasGeo(true);
    setGeo(geo);
  };

  return (
    <GeoProvider geo={geo}>
      <main className="h-screen flex flex-col">
        {!hasGeo && <GeoSelector onSelectGeo={selectGeo} />}

        {hasGeo && <Plinko />}
      </main>
    </GeoProvider>
  );
}

export default App;
