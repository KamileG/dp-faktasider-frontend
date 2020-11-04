import styled from "styled-components/macro";
import { Input } from "nav-frontend-skjema";

export const KalkulatorStyle = styled.div`
  margin: 3rem 0;
  .ReactCollapse--collapse {
    transition: height 0.3s;
  }
  .ReactCollapse--content {
    text-align: center;
  }
`;

export const ResultatTable = styled.table`
  margin: 0.5rem auto 1rem;
  text-align: right;
  td {
    padding: 0.2rem 0.5rem;
    vertical-align: middle;
  }
  tr:nth-last-child(3) ~ tr {
    font-weight: 600;
  }
  tr:nth-last-child(2) {
    td {
      padding-top: 0.6rem;
    }
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  label {
    font-weight: normal;
  }
`;

export const GrunnlagInput = styled(Input)`
  input {
    width: 5.5rem;
  }
`;

export function toKR(kr: number) {
  return kr.toLocaleString("nb-NO", { maximumFractionDigits: 2, minimumFractionDigits: 2 }) + " kr";
}
