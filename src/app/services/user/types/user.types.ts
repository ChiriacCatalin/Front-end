export type User = {
    name?: string;
    country?: string;
    city?: string;
    birthdate?: string;
    email?: string;
    imageUrl?: string;
    studiedAt?: string;
    worksAt?: string;
    jobs?: Job[];
    schools?: School[];
    projects?: Project[];
};


interface School {
    school?: string;
    schoolDegree?: string;
    schoolStartDate?: string;
    schoolEndDate?: string;
    schoolDescription?: string;
    schoolVideo?: string;
}

interface Job {
    company?: string;
    workPosition?: string;
    workStartDate?: string;
    workEndDate?: string;
    workDescription?: string;
    workVideo?: string;
}

interface Project{
    projectName?: string;
    projectStartDate?: string;
    projectEndDate?: string;
    projectDescription?: string;
    projectVideo?: string;
}