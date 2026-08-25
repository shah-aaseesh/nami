import type { ContentProvider } from "../provider";
import { aboutCopy } from "./about-copy";
import { academicLevels, programmes, vocationalApproval } from "./academics";
import { admissionCalls } from "./admissions";
import { affiliations } from "./affiliations";
import { vacancies } from "./careers";
import { campusLife } from "./college-life";
import { gallery } from "./gallery";
import { homeCopy } from "./home-copy";
import { institution } from "./institution";
import { leadership } from "./leadership";
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
  getVocationalApproval: () => Promise.resolve(vocationalApproval),
  getAffiliations: () => Promise.resolve(affiliations),
  getPartners: () => Promise.resolve(partners),
  getCampusLife: () => Promise.resolve(campusLife),
  getAdmissionCalls: () => Promise.resolve(admissionCalls),
  getUpdates: (limit) =>
    Promise.resolve(limit === undefined ? updates : updates.slice(0, limit)),
  getTestimonials: () => Promise.resolve(testimonials),
  getLeadership: () => Promise.resolve(leadership),
  getGallery: () => Promise.resolve(gallery),
  getVacancies: () => Promise.resolve(vacancies),
  getHomeCopy: () => Promise.resolve(homeCopy),
  getAboutCopy: () => Promise.resolve(aboutCopy),
};
