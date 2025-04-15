import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <header className="text-xl">Select Your Geo</header>
          </DialogTitle>
        </DialogHeader>

        <Command className="bg-transparent">
          <CommandList>
            {GeoList.map((geo) => (
              <CommandItem key={geo.country} onSelect={() => onSelectGeo(geo)}>
                {geo.emoji} {geo.language}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};
