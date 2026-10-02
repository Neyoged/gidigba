import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type MapPoint = { city: string; country: string; n: number; lat: number; lng: number };

export type MovementStats = {
  members: number;
  countries: number;
  cities: number;
  top_cities: { city: string; country: string; n: number }[];
  points: MapPoint[];
};

export const statsQuery = queryOptions({
  queryKey: ["movement-stats"],
  queryFn: async (): Promise<MovementStats> => {
    const { data, error } = await supabase.rpc("movement_stats");
    if (error) throw error;
    return data as unknown as MovementStats;
  },
  staleTime: 30_000,
});
