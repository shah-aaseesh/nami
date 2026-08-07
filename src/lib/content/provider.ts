import type {
  AboutCopy,
  AcademicLevel,
  AdmissionCall,
  Affiliation,
  CampusLifePillar,
  GalleryItem,
  HomeCopy,
  InstitutionProfile,
  LeadershipProfile,
  Partner,
  Programme,
  Stat,
  Testimonial,
  Update,
} from "./types";

export class ContentSourceUnavailableError extends Error {
  readonly source: string;

  constructor(source: string, options?: ErrorOptions) {
    super(`Content source unavailable: ${source}`, options);
    this.name = "ContentSourceUnavailableError";
    this.source = source;
  }
}

export type ContentProvider = {
  readonly source: string;
  getInstitution(): Promise<InstitutionProfile>;
  getStats(): Promise<readonly Stat[]>;
  getAcademicLevels(): Promise<readonly AcademicLevel[]>;
  getProgrammes(): Promise<readonly Programme[]>;
  getAffiliations(): Promise<readonly Affiliation[]>;
  getPartners(): Promise<readonly Partner[]>;
  getCampusLife(): Promise<readonly CampusLifePillar[]>;
  getAdmissionCalls(): Promise<readonly AdmissionCall[]>;
  getUpdates(limit?: number): Promise<readonly Update[]>;
  getTestimonials(): Promise<readonly Testimonial[]>;
  getLeadership(): Promise<LeadershipProfile>;
  getGallery(): Promise<readonly GalleryItem[]>;
  getHomeCopy(): Promise<HomeCopy>;
  getAboutCopy(): Promise<AboutCopy>;
};
