import { FormTransferAsset } from "./FormTransferAsset";
import { ReviewAsset } from "./ReviewAsset";

export const STEPS = [
  {
    id: 0,
    name: "Send Asset",
    label: "",
    Component: FormTransferAsset,
  },
  {
    id: 0,
    name: "Review Transaction",
    label: "",
    Component: ReviewAsset,
  },
];
