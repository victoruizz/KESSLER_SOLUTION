import { useKesslerContext } from "../context/KesslerProvider";

export function useKessler() {
  return useKesslerContext();
}
