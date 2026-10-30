import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { DeleteConfirmModal } from "./delete-confirm-modal";

const noop = () => {};

it("has no accessibility violations", async () => {
  // Render with the modal already open — that's the state we care about
  const { baseElement } = render(
    <DeleteConfirmModal open onCancel={noop} onConfirm={noop} />
  );

  // axe() scans the rendered DOM; fails with a readable report if unclean
  expect(await axe(baseElement)).toHaveNoViolations();
});