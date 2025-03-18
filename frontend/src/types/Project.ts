export interface Project {
    //matches JSON names exactly. This is what the JSON object coming in looks like
    projectId: number;
    projectName: string;
    projectType: string;
    projectRegionalProgram: string;
    projectImpact: number;
    projectPhase: string;
    projectFunctionalityStatus: string;

}