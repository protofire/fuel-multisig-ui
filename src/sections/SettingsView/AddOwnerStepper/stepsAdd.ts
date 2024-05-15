import { AddOwnerStep } from "./AddOwnerStep";
import { ConfirmAddOwnerStep } from "./ConfirmAddOwnerStep";

export const steps = [
  {
    id: 1,
    name: "Add owner",
    label: "",
    Component: AddOwnerStep,
  },
  {
    id: 2,
    name: "Confirm",
    label: "",
    Component: ConfirmAddOwnerStep,
  },
];
