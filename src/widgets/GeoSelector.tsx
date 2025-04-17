import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GeoState } from "@/core/providers/geo/GeoContext";
import { GeoList } from "@/core/providers/geo/GeoList";
import { FC } from "react";

interface Props {
  onSelectGeo: (geo: GeoState) => void;
}

export const GeoSelector: FC<Props> = ({ onSelectGeo }) => {
  return (
    <Dialog open >
      <DialogContent className='dialog'>
        <DialogHeader>
          <DialogTitle>
            <header className="text-4xl text-amber-400">Select Your Geo</header>
          </DialogTitle>
        </DialogHeader>


        {GeoList.map((geo) => (
          <Button className='bg-transparent' key={geo.country} onClick={() => onSelectGeo(geo)}>{geo.emoji} {geo.language}</Button>
        ))}

      </DialogContent>
    </Dialog>
  );
};
