//the API folder has common API calls in it to keep things organized

import { Project } from "../types/Project";

interface FetchProjectsResponse {
    projects: Project[];
    totalNumProjects: number;

}

export const fetchProjects = async (
    pageSize: number,
    pageNum: number,
    selectedCategories: string[]
): Promise<FetchProjectsResponse> => {
    
    try{
    const categoryParams = selectedCategories.map((cat) => `projectTypes=${encodeURIComponent(cat)}`).join('&');

            const response = await fetch(`https://localhost:5000/water/allprojects?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`,
                {
                    credentials: 'include', //allows us to pass a cookie through
                }

            ); //this goes and looks for the data(json) and passes parameters up to .net

            if (!response.ok) { //putting in error handling so that if we get errors it is less of a mystery why
                throw new Error('Failed to fetch projects');
            }

        return await response.json(); 
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}