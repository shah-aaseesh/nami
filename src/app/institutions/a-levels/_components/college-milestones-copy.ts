import {
  auditoriumGathering,
  scienceLaboratory,
} from "@/lib/content/local/images";
import type { CollegeMilestonesCopy } from "./college-milestones";

// PLACEHOLDER, not final: both milestone photographs below are stand-ins awaiting client material.
export const collegeMilestonesCopy: CollegeMilestonesCopy = {
  eyebrow: "Milestones",
  heading: "The Cambridge programme, year by year.",
  milestones: [
    {
      year: 2014,
      title: "The Cambridge A Level begins",
      body: "NAMI College starts teaching the Cambridge International A Level, administered by Cambridge Assessment International Education, University of Cambridge, United Kingdom.",
      photo: scienceLaboratory,
    },
    {
      year: 2024,
      title: "An examination centre in its own right",
      body: "In June 2024 NAMI College is accredited as a Cambridge International Home Centre in Nepal, and holds independent Cambridge Assessment International Education examination centre status.",
      photo: auditoriumGathering,
    },
  ],
};
