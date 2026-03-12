import priceList from "@/data/price_list.json";

type ObjectType = "apartment" | "house";
type RepairType = "cosmetic" | "euro" | "capital";
type ApartmentState = "new" | "secondary";
type FloorMaterial = "laminate" | "tile" | "parquet";
type CeilingType = "paint" | "stretch";

export interface CalculatorParams {
  objectType: ObjectType;
  area: number;
  ceilingHeight?: number;
  rooms?: number;
  bathrooms?: number;
  housePackage?: string;
  repairType?: RepairType;
  apartmentState?: ApartmentState;
  floorMaterial?: FloorMaterial;
  ceilingType?: CeilingType;
}

export interface CalculatorResult {
  wallArea: number;
  floorArea: number;
  ceilingArea: number;
  items: { name: string; quantity: number; unit: string; priceByn: number; sumByn: number }[];
  subtotalByn: number;
  markup: number;
  totalByn: number;
  totalUsd: number;
}

const apt = priceList.apartmentRenovation as {
  demolition: { name: string; unit: string; priceByn: number }[];
  walls: Record<string, { name: string; unit: string; priceByn: number }>;
  floor: Record<string, { name: string; unit: string; priceByn: number }>;
  ceiling: Record<string, { name: string; unit: string; priceByn: number }>;
  systems: Record<string, { name: string; unit: string; priceByn: number; perApartment?: boolean }>;
  doors: { name: string; unit: string; priceByn: number };
  plinth: { name: string; unit: string; priceByn: number };
};

function calculateWallArea(area: number, ceilingHeight: number): number {
  return 8 * ceilingHeight * Math.sqrt(area);
}

function addItem(
  items: CalculatorResult["items"],
  name: string,
  quantity: number,
  unit: string,
  priceByn: number
): void {
  if (quantity <= 0) return;
  const sumByn = Math.round(quantity * priceByn * 100) / 100;
  items.push({
    name,
    quantity: Math.round(quantity * 100) / 100,
    unit,
    priceByn,
    sumByn,
  });
}

export function calculateCost(params: CalculatorParams): CalculatorResult {
  const usdRate = priceList.usdRate as number;
  const markup = (priceList.defaultMarkup as number) || 0.35;

  if (params.objectType === "house") {
    const houseData = priceList.houseConstruction as {
      packages: { id: string; name?: string; pricePerSqm: number }[];
    };
    const packageId = params.housePackage || "blocks_full";
    const pkg = houseData.packages.find((p) => p.id === packageId);
    const pricePerSqm = pkg?.pricePerSqm ?? 1800;
    const totalByn = params.area * pricePerSqm;
    return {
      wallArea: 0,
      floorArea: params.area,
      ceilingArea: 0,
      items: [
        {
          name: pkg?.name ?? "Дом под ключ",
          quantity: params.area,
          unit: "м²",
          priceByn: pricePerSqm,
          sumByn: totalByn,
        },
      ],
      subtotalByn: totalByn,
      markup,
      totalByn: totalByn * (1 + markup),
      totalUsd: (totalByn * (1 + markup)) / usdRate,
    };
  }

  const area = params.area;
  const ceilingHeight = params.ceilingHeight ?? 2.7;
  const rooms = params.rooms ?? 2;
  const bathrooms = params.bathrooms ?? 1;
  const repairType = params.repairType ?? "euro";
  const apartmentState = params.apartmentState ?? "new";
  const floorMaterial = params.floorMaterial ?? "laminate";
  const ceilingType = params.ceilingType ?? "paint";

  const wallArea = calculateWallArea(area, ceilingHeight);
  const floorArea = area;
  const ceilingArea = area;
  const plinthLength = Math.ceil(4 * Math.sqrt(area) + (rooms + bathrooms) * 2);

  const electricPoints =
    repairType === "cosmetic" ? Math.max(4, rooms * 2 + bathrooms * 2) : Math.max(6, rooms * 4 + bathrooms * 5);

  const items: CalculatorResult["items"] = [];

  if (repairType === "capital" && apartmentState === "secondary") {
    addItem(items, apt.demolition[0].name, wallArea, apt.demolition[0].unit, apt.demolition[0].priceByn);
    addItem(items, apt.demolition[1].name, floorArea, apt.demolition[1].unit, apt.demolition[1].priceByn);
  }

  if (repairType === "cosmetic") {
    addItem(items, apt.walls.wallpaper.name, wallArea, apt.walls.wallpaper.unit, apt.walls.wallpaper.priceByn);
  } else {
    addItem(items, apt.walls.plaster.name, wallArea, apt.walls.plaster.unit, apt.walls.plaster.priceByn);
    addItem(items, apt.walls.putty.name, wallArea, apt.walls.putty.unit, apt.walls.putty.priceByn);
    addItem(items, apt.walls.paint.name, wallArea, apt.walls.paint.unit, apt.walls.paint.priceByn);
  }

  const bathTileArea = bathrooms * 4;
  const livingFloorArea = floorArea - bathTileArea;

  if (repairType !== "cosmetic") {
    addItem(items, apt.floor.screed.name, floorArea, apt.floor.screed.unit, apt.floor.screed.priceByn);
    addItem(items, apt.floor.tileBathroom.name, bathTileArea, apt.floor.tileBathroom.unit, apt.floor.tileBathroom.priceByn);
    const floorMat = apt.floor[floorMaterial] ?? apt.floor.laminate;
    addItem(items, floorMat.name, Math.max(0, livingFloorArea), floorMat.unit, floorMat.priceByn);
  } else {
    const floorMatCosmetic = apt.floor.laminateNoScreed ?? apt.floor.laminate;
    addItem(items, floorMatCosmetic.name, Math.max(0, livingFloorArea), floorMatCosmetic.unit, floorMatCosmetic.priceByn);
  }

  if (repairType === "cosmetic") {
    addItem(items, apt.ceiling.paint.name, ceilingArea, apt.ceiling.paint.unit, apt.ceiling.paint.priceByn);
  } else if (ceilingType === "stretch") {
    addItem(items, apt.ceiling.stretch.name, ceilingArea, apt.ceiling.stretch.unit, apt.ceiling.stretch.priceByn);
  } else {
    addItem(items, apt.ceiling.putty.name, ceilingArea, apt.ceiling.putty.unit, apt.ceiling.putty.priceByn);
    addItem(items, apt.ceiling.paint.name, ceilingArea, apt.ceiling.paint.unit, apt.ceiling.paint.priceByn);
  }

  addItem(items, apt.systems.electricPoint.name, electricPoints, apt.systems.electricPoint.unit, apt.systems.electricPoint.priceByn);
  if (repairType !== "cosmetic") {
    const panel = apt.systems.electricPanel;
    if (panel?.perApartment) addItem(items, panel.name, 1, panel.unit, panel.priceByn);
  }
  if (repairType !== "cosmetic") {
    addItem(items, apt.systems.plumbingKit.name, bathrooms, apt.systems.plumbingKit.unit, apt.systems.plumbingKit.priceByn);
  }

  if (repairType === "capital" && apartmentState === "secondary") {
    const plumbingLength = (rooms + bathrooms) * 3;
    addItem(items, apt.systems.plumbingReplacement.name, plumbingLength, apt.systems.plumbingReplacement.unit, apt.systems.plumbingReplacement.priceByn);
  }

  if (repairType !== "cosmetic") {
    addItem(items, apt.doors.name, rooms, apt.doors.unit, apt.doors.priceByn);
  }
  addItem(items, apt.plinth.name, plinthLength, apt.plinth.unit, apt.plinth.priceByn);

  const subtotalByn = items.reduce((sum, i) => sum + i.sumByn, 0);
  const totalByn = subtotalByn * (1 + markup);

  return {
    wallArea: Math.round(wallArea * 100) / 100,
    floorArea,
    ceilingArea,
    items,
    subtotalByn: Math.round(subtotalByn * 100) / 100,
    markup,
    totalByn: Math.round(totalByn * 100) / 100,
    totalUsd: Math.round((totalByn / usdRate) * 100) / 100,
  };
}
