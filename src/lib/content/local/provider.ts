import type { ContentProvider } from "../provider";
import { aboutCopy } from "./about-copy";
import { academicLevels, programmes } from "./academics";
import { admissionCalls } from "./admissions";
import { affiliations } from "./affiliations";
import { campusLife } from "./campus-life";
import { homeCopy } from "./home-copy";
import { institution } from "./institution";
import { partners } from "./partners";
import { stats } from "./stats";
import { testimonials } from "./testimonials";
import { updates } from "./updates";

export const localContentProvider: ContentProvider = {
  source: "local",
  getInstitution: () => Promise.resolve(institution),
  getStats: () => Promise.resolve(stats),
  getAcademicLevels: () => Promise.resolve(academicLevels),
  getProgrammes: () => Promise.resolve(programmes),
  getAffiliations: () => Promise.resolve(affiliations),
  getPartners: () => Promise.resolve(partners),
  getCampusLife: () => Promise.resolve(campusLife),
  getAdmissionCalls: () => Promise.resolve(admissionCalls),
  getUpdates: (limit) =>
    Promise.resolve(limit === undefined ? updates : updates.slice(0, limit)),
  getTestimonials: () => Promise.resolve(testimonials),
  getHomeCopy: () => Promise.resolve(homeCopy),
  getAboutCopy: () => Promise.resolve(aboutCopy),
};
