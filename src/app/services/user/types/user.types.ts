export type User = {
    mainInfo?: MainInfo;
    jobs?: Job[];
    schools?: School[];
    projects?: Project[];
};

type MainInfo = {
    name?: string;
    country?: string;
    city?: string;
    birthdate?: string;
    email?: string;
    imageUrl?: string;
    studiedAt?: string;
    worksAt?: string;
}
type School = {
    school?: string;
    schoolDegree?: string;
    schoolStartDate?: string;
    schoolEndDate?: string;
    schoolDescription?: string;
    schoolVideo?: string;
}

type Job = {
    company?: string;
    workPosition?: string;
    workStartDate?: string;
    workEndDate?: string;
    workDescription?: string;
    workVideo?: string;
}

type Project = {
    projectName?: string;
    projectStartDate?: string;
    projectEndDate?: string;
    projectDescription?: string;
    projectVideo?: string;
}