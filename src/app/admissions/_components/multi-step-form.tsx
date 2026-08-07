"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Icon } from "@/components/ui/icon";
import { H2, H3, P } from "@/components/ui/typography";
import { ArrowRightIcon, CalendarIcon, CheckIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);

const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
);

const STEPS = [
  "Course Details",
  "Student Details",
  "Parent Details",
  "Qualifications",
  "Employment History",
  "Additional Info & Signatures",
];

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // --- Form State ---
  const [formData, setFormData] = useState({
    program: "",
    proposedCourse: "",
    title: "",
    surname: "",
    firstName: "",
    dob: null as Date | null,
    nationality: "",
    telephone: "",
    email: "",
    photo: null as File | null,
    specialNeeds: false,
    fatherName: "",
    fatherContact: "",
    fatherEmail: "",
    fatherJob: "",
    motherName: "",
    motherContact: "",
    motherEmail: "",
    motherJob: "",
    secondaryContact: "",
    relationship: "",
    qualifications: [{ id: 1, place: "", dates: "", awards: "", dateObtained: null as Date | null }],
    pendingQualifications: "",
    employment: [{ id: 1, dates: "", employer: "", position: "", duties: "" }],
    personalStatement: "",
    howDidYouHear: [] as string[],
    criminalRecord: null as File | null,
    signature: "",
    signatureDate: null as Date | null,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addQualification = () => {
    setFormData(prev => ({
      ...prev,
      qualifications: [...prev.qualifications, { id: Date.now(), place: "", dates: "", awards: "", dateObtained: null }]
    }));
  };

  const removeQualification = (id: number) => {
    setFormData(prev => ({
      ...prev,
      qualifications: prev.qualifications.filter(q => q.id !== id)
    }));
  };

  const updateQualification = (id: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      qualifications: prev.qualifications.map(q => q.id === id ? { ...q, [field]: value } : q)
    }));
  };

  const addEmployment = () => {
    setFormData(prev => ({
      ...prev,
      employment: [...prev.employment, { id: Date.now(), dates: "", employer: "", position: "", duties: "" }]
    }));
  };

  const removeEmployment = (id: number) => {
    setFormData(prev => ({
      ...prev,
      employment: prev.employment.filter(e => e.id !== id)
    }));
  };

  const updateEmployment = (id: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      employment: prev.employment.map(e => e.id === id ? { ...e, [field]: value } : e)
    }));
  };

  const goToStep = (step: number) => {
    if (step < 0 || step >= STEPS.length || step === currentStep) return;
    
    gsap.to(formRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.2,
      onComplete: () => {
        setCurrentStep(step);
        gsap.fromTo(formRef.current, 
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );
      }
    });
  };

  const renderStepContent = () => {
    switch(currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <H3 className="text-xl font-display text-ink mb-6">Course Details</H3>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label>Program</Label>
                <Select onValueChange={(val) => handleInputChange("program", val)} value={formData.program}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="school">School Level (I-VII)</SelectItem>
                    <SelectItem value="plus2">+2 Programs</SelectItem>
                    <SelectItem value="alevel">Cambridge A-Level</SelectItem>
                    <SelectItem value="bachelor">Bachelor Programs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Proposed Course/s</Label>
                <Input 
                  placeholder="e.g. Science, Management, BSc Computing..." 
                  value={formData.proposedCourse}
                  onChange={(e) => handleInputChange("proposedCourse", e.target.value)}
                />
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <H3 className="text-xl font-display text-ink mb-6">Student Details</H3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="flex flex-col gap-2">
                <Label>First Name</Label>
                <Input value={formData.firstName} onChange={(e) => handleInputChange("firstName", e.target.value)} />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Surname</Label>
                <Input value={formData.surname} onChange={(e) => handleInputChange("surname", e.target.value)} />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Date of Birth</Label>
                <Popover>
                  <PopoverTrigger render={
                    <Button variant="outline" className={cn("w-full h-12 bg-surface border-border hover:bg-surface justify-start text-left font-normal text-base text-ink px-4 py-2", !formData.dob && "text-ink-muted")}>
                      <Icon icon={CalendarIcon} className="mr-2 h-4 w-4" />
                      {formData.dob ? format(formData.dob, "PPP") : <span>Pick a date</span>}
                    </Button>
                  } />
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={formData.dob ?? undefined} onSelect={(date) => handleInputChange("dob", date)} />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Nationality</Label>
                <Input value={formData.nationality} onChange={(e) => handleInputChange("nationality", e.target.value)} />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Telephone Number</Label>
                <Input type="tel" value={formData.telephone} onChange={(e) => handleInputChange("telephone", e.target.value)} />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Email Address</Label>
                <Input type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <Label>Photo Upload</Label>
                <Input type="file" accept="image/*" onChange={(e) => handleInputChange("photo", e.target.files?.[0] || null)} />
              </div>
              <div className="flex items-start space-x-3 md:col-span-2 mt-2">
                <Checkbox 
                  id="specialNeeds" 
                  checked={formData.specialNeeds}
                  onCheckedChange={(checked) => handleInputChange("specialNeeds", checked)}
                />
                <Label htmlFor="specialNeeds" className="leading-snug cursor-pointer font-normal">
                  Do you have any special needs or medical conditions we should be aware of?
                </Label>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8">
            <H3 className="text-xl font-display text-ink mb-6">Parent / Guardian Details</H3>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-ink-muted text-sm uppercase tracking-wider">Father's Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Label>Name</Label>
                  <Input value={formData.fatherName} onChange={(e) => handleInputChange("fatherName", e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Contact Number</Label>
                  <Input type="tel" value={formData.fatherContact} onChange={(e) => handleInputChange("fatherContact", e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Email</Label>
                  <Input type="email" value={formData.fatherEmail} onChange={(e) => handleInputChange("fatherEmail", e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Job Designation</Label>
                  <Input value={formData.fatherJob} onChange={(e) => handleInputChange("fatherJob", e.target.value)} />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-border/50">
              <h4 className="font-semibold text-ink-muted text-sm uppercase tracking-wider">Mother's Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Label>Name</Label>
                  <Input value={formData.motherName} onChange={(e) => handleInputChange("motherName", e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Contact Number</Label>
                  <Input type="tel" value={formData.motherContact} onChange={(e) => handleInputChange("motherContact", e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Email</Label>
                  <Input type="email" value={formData.motherEmail} onChange={(e) => handleInputChange("motherEmail", e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Job Designation</Label>
                  <Input value={formData.motherJob} onChange={(e) => handleInputChange("motherJob", e.target.value)} />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-border/50">
              <h4 className="font-semibold text-ink-muted text-sm uppercase tracking-wider">Emergency / Secondary Contact</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Label>Secondary Contact Number</Label>
                  <Input type="tel" value={formData.secondaryContact} onChange={(e) => handleInputChange("secondaryContact", e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Relationship to Student</Label>
                  <Input value={formData.relationship} onChange={(e) => handleInputChange("relationship", e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <H3 className="text-xl font-display text-ink">Qualifications Achieved</H3>
              <Button type="button" variant="outline" size="sm" onClick={addQualification} className="gap-2 shrink-0">
                <PlusIcon className="size-4" /> Add 
              </Button>
            </div>
            
            <div className="space-y-6">
              {formData.qualifications.map((qual, index) => (
                <div key={qual.id} className="p-5 rounded-xl border border-border bg-surface-muted/50 relative">
                  {formData.qualifications.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeQualification(qual.id)}
                      className="absolute top-4 right-4 text-ink-muted hover:text-red-500 transition-colors"
                    >
                      <TrashIcon className="size-4" />
                    </button>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="flex flex-col gap-2">
                      <Label>Place of Study</Label>
                      <Input value={qual.place} onChange={(e) => updateQualification(qual.id, "place", e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Dates Attended</Label>
                      <Input placeholder="e.g. 2018 - 2022" value={qual.dates} onChange={(e) => updateQualification(qual.id, "dates", e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Awards / Grades</Label>
                      <Input placeholder="e.g. GPA 3.8 / A+" value={qual.awards} onChange={(e) => updateQualification(qual.id, "awards", e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Date Obtained</Label>
                      <Popover>
                        <PopoverTrigger render={
                          <Button variant="outline" className={cn("w-full h-12 bg-surface border-border hover:bg-surface justify-start text-left font-normal text-base text-ink px-4 py-2", !qual.dateObtained && "text-ink-muted")}>
                            <Icon icon={CalendarIcon} className="mr-2 h-4 w-4" />
                            {qual.dateObtained ? format(qual.dateObtained, "PPP") : <span>Pick a date</span>}
                          </Button>
                        } />
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={qual.dateObtained ?? undefined} onSelect={(date) => updateQualification(qual.id, "dateObtained", date)} />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-border/50">
              <H3 className="text-lg font-display text-ink">Qualifications Pending</H3>
              <div className="flex flex-col gap-2">
                <Label>Are you currently awaiting any results?</Label>
                <Textarea 
                  placeholder="Please list any exams taken for which results are pending..."
                  value={formData.pendingQualifications}
                  onChange={(e) => handleInputChange("pendingQualifications", e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <H3 className="text-xl font-display text-ink">Employment History</H3>
              <Button type="button" variant="outline" size="sm" onClick={addEmployment} className="gap-2 shrink-0">
                <PlusIcon className="size-4" /> Add 
              </Button>
            </div>
            
            <div className="space-y-6">
              {formData.employment.map((emp) => (
                <div key={emp.id} className="p-5 rounded-xl border border-border bg-surface-muted/50 relative">
                  {formData.employment.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeEmployment(emp.id)}
                      className="absolute top-4 right-4 text-ink-muted hover:text-red-500 transition-colors"
                    >
                      <TrashIcon className="size-4" />
                    </button>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="flex flex-col gap-2">
                      <Label>Employer Name & Address</Label>
                      <Input value={emp.employer} onChange={(e) => updateEmployment(emp.id, "employer", e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Dates (From - To)</Label>
                      <Input placeholder="e.g. Jan 2021 - Present" value={emp.dates} onChange={(e) => updateEmployment(emp.id, "dates", e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Position Held</Label>
                      <Input value={emp.position} onChange={(e) => updateEmployment(emp.id, "position", e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <Label>Brief Description of Duties</Label>
                      <Textarea value={emp.duties} onChange={(e) => updateEmployment(emp.id, "duties", e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-8">
            <H3 className="text-xl font-display text-ink mb-6">Additional Info & Signatures</H3>
            
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label>Personal Statement</Label>
                <P className="text-xs text-ink-muted">Please provide a brief statement supporting your application.</P>
                <Textarea 
                  value={formData.personalStatement}
                  onChange={(e) => handleInputChange("personalStatement", e.target.value)}
                  className="min-h-[120px]"
                />
              </div>

              <div className="flex flex-col gap-3 pt-6">
                <Label>How did you hear of NAMI?</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Social Media', 'Friends / Family', 'School / College', 'Advertisement', 'Website', 'Other'].map(option => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`hear-${option}`} 
                        checked={formData.howDidYouHear.includes(option)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleInputChange("howDidYouHear", [...formData.howDidYouHear, option]);
                          } else {
                            handleInputChange("howDidYouHear", formData.howDidYouHear.filter(o => o !== option));
                          }
                        }}
                      />
                      <Label htmlFor={`hear-${option}`} className="font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{option}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-6">
                <Label>Criminal Convictions</Label>
                <P className="text-xs text-ink-muted">Please upload your Police Record Certification if applicable.</P>
                <Input type="file" onChange={(e) => handleInputChange("criminalRecord", e.target.files?.[0] || null)} />
              </div>

              <div className="space-y-4 pt-8 border-t border-border/50">
                <H3 className="text-lg font-display text-ink">Declaration</H3>
                <P className="text-sm text-ink-muted">
                  By signing below, I confirm that the information provided in this application is accurate and complete to the best of my knowledge.
                </P>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="flex flex-col gap-2">
                    <Label>Student Signature (Type Name)</Label>
                    <Input value={formData.signature} onChange={(e) => handleInputChange("signature", e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger render={
                        <Button variant="outline" className={cn("w-full h-12 bg-surface border-border hover:bg-surface justify-start text-left font-normal text-base text-ink px-4 py-2", !formData.signatureDate && "text-ink-muted")}>
                          <Icon icon={CalendarIcon} className="mr-2 h-4 w-4" />
                          {formData.signatureDate ? format(formData.signatureDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      } />
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={formData.signatureDate ?? undefined} onSelect={(date) => handleInputChange("signatureDate", date)} />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl" ref={containerRef}>
      <div className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Left Sidebar / Progress */}
        <div className="bg-surface-muted w-full md:w-64 lg:w-80 p-6 md:p-8 shrink-0 border-b md:border-b-0 md:border-r border-border">
          <div className="sticky top-8">
            <H2 className="font-display text-xl font-semibold text-ink mb-8">Application Form</H2>
            <ul className="space-y-6">
              {STEPS.map((step, index) => {
                const isActive = index === currentStep;
                const isPast = index < currentStep;
                
                return (
                  <li key={step} className="flex items-center gap-4 relative group">
                    {/* Vertical line connector */}
                    {index !== STEPS.length - 1 && (
                      <div className={cn(
                        "absolute left-[13px] top-8 w-[2px] h-8 -z-10 transition-colors duration-500",
                        isPast ? "bg-accent" : "bg-border"
                      )} />
                    )}
                    
                    <button 
                      type="button"
                      onClick={() => isPast && goToStep(index)}
                      disabled={!isPast && !isActive}
                      className={cn(
                        "flex items-center justify-center size-7 rounded-full text-xs font-semibold shrink-0 transition-all duration-300 outline-none",
                        isActive ? "bg-accent text-white ring-4 ring-accent/20 scale-110" : 
                        isPast ? "bg-accent text-white cursor-pointer hover:scale-110" : "bg-surface text-ink-muted border border-border"
                      )}
                    >
                      {isPast ? <Icon icon={CheckIcon} className="size-3" /> : index + 1}
                    </button>
                    <button
                      type="button" 
                      onClick={() => isPast && goToStep(index)}
                      disabled={!isPast && !isActive}
                      className={cn(
                        "text-sm font-medium text-left transition-colors duration-300 outline-none",
                        isActive ? "text-ink" : 
                        isPast ? "text-ink cursor-pointer group-hover:text-accent" : "text-ink-muted"
                      )}>
                      {step}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 p-6 md:p-10 lg:p-12 flex flex-col justify-between">
          <div ref={formRef} className="flex-1">
            {renderStepContent()}
          </div>
          
          {/* Navigation Buttons */}
          <div className="mt-12 pt-6 border-t border-border flex items-center justify-between">
            <Button 
              type="button"
              variant="outline" 
              onClick={() => goToStep(currentStep - 1)}
              disabled={currentStep === 0}
              className="px-6"
            >
              Previous
            </Button>
            
            {currentStep < STEPS.length - 1 ? (
              <Button type="button" onClick={() => goToStep(currentStep + 1)} className="gap-2 px-6">
                Next Step <Icon icon={ArrowRightIcon} className="size-4" />
              </Button>
            ) : (
              <Button type="button" className="gap-2 px-6 bg-accent hover:bg-accent/90 text-white">
                Submit Application <Icon icon={CheckIcon} className="size-4" />
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
