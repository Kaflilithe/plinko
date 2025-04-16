import { useCallback, useEffect, useState } from "react";
import { GeoList } from "./core/providers/geo/GeoList";
import { Plinko } from "./widgets/Plinko/Plinko";
import { GeoSelector } from "./widgets/GeoSelector";
import { GeoState } from "./core/providers/geo/GeoContext";
import { GeoProvider } from "./core/providers/geo/GeoProvider";
import { Final } from "./widgets/Final";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { Notification } from "./widgets/Notification";

function App() {
  const [geo, setGeo] = useState<GeoState>(GeoList[0]);
  const [hasGeo, setHasGeo] = useState(false);
  const [final, setFinal] = useState(false);

  const selectGeo = (geo: GeoState) => {
    setHasGeo(true);
    setGeo(geo);
  };

  const finishGame = useCallback(() => {
    console.log("finish game!");
    toast.custom(
      (id) => (
        <Notification
          onClick={() => {
            toast.dismiss(id);
            showFinal();
          }}
        />
      ),
      {
        duration: Infinity,
      },
    );
  }, []);

  const showFinal = () => {
    setFinal(true);
  };

  return (
    <GeoProvider geo={geo}>
      <main className="h-screen flex flex-col">
        {!hasGeo && <GeoSelector onSelectGeo={selectGeo} />}

        {hasGeo && <Plinko onFinish={finishGame} />}
        {final && <Final />}

        <Toaster position="top-center" className="pointer-events-auto" />
      </main>
    </GeoProvider>
  );
}

export default App;
