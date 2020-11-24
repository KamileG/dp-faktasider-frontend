import React from "react";
import { getPubliseringsTidspunkt } from "../../../gatsby-utils/getPubliseringstidspunkt";
import { render } from "../../testUtils/customized-testing-library";
import SistOppdatert from "./SistOppdatert";
import { rawFaktasideDataMock } from "../../../__mocks__/rawFaktasideDataMock";

describe("Sist oppdatert funker finfint med internasjonalisering", () => {
  test("På norsk", () => {
    const publiseringsTidspunkt = getPubliseringsTidspunkt(rawFaktasideDataMock);
    const result = render(<SistOppdatert publiseringsTidspunkt={publiseringsTidspunkt} />);

    result.getByText(/10. juli 2020 12:54/i);
  });

  test("På engelsk", () => {
    const publiseringsTidspunkt = getPubliseringsTidspunkt(rawFaktasideDataMock);
    const result = render(<SistOppdatert publiseringsTidspunkt={publiseringsTidspunkt} />, undefined, "en");

    result.getByText(/July 10th 2020 12:54/i);
  });
});
