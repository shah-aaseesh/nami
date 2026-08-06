import { placeholderText } from "../placeholder-registry";
import type { ContentLink } from "../types";

export const gokarneshworStreetAddress = placeholderText(
  "institution.campuses[gokarneshwor].streetAddress",
  "address",
  "Placeholder Marg, House No. 00",
);

export const newBaneshworStreetAddress = placeholderText(
  "institution.campuses[new-baneshwor].streetAddress",
  "address",
  "Placeholder Sadak, House No. 00",
);

export const gokarneshworMapUrl = placeholderText(
  "institution.campuses[gokarneshwor].mapUrl",
  "map",
  "https://maps.example/placeholder/gokarneshwor",
);

export const newBaneshworMapUrl = placeholderText(
  "institution.campuses[new-baneshwor].mapUrl",
  "map",
  "https://maps.example/placeholder/new-baneshwor",
);

export const plusTwoAdmissionLink: ContentLink = {
  label: "View admission notice",
  href: placeholderText(
    "admissionCalls[admission-plus-two].link.href",
    "link",
    "https://nami.example/admissions/plus-two",
  ),
  destination: "external",
};

export const bachelorMasterAdmissionLink: ContentLink = {
  label: "View admission notice",
  href: placeholderText(
    "admissionCalls[admission-bachelor-master].link.href",
    "link",
    "https://nami.example/admissions/bachelor-master",
  ),
  destination: "external",
};
