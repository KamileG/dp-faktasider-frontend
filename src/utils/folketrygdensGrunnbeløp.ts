import useProjectData from "../hooks/graphQl/useProjectData";

export function useGrunnbellop() {
  const G = useProjectData().folketrygdensGrunnbellop;

  return {
    GtoNOK: (g: number) => (g * G).toLocaleString("nb-NO", { maximumFractionDigits: 2, minimumFractionDigits: 2 }),
    G: G,
  };
}
