export type Job = {
    id: string;
    jobTitle: string;
    jobType: string;
    experienceLevel: string;
    onSiteRemote: string;
    city: string;
    country: string;
    companyName: string;
    imgUrl?: string;
    companyId: string;
    companySize: string;
    date: string;
    interviewQuestions?: string[];
    jobDescription: string;
    jobVideo?: string;
}