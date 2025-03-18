import { useEffect, useState } from "react";
import { Project } from "./types/Project";

function ProjectList() {
    //we want to use the Project object to store the data as it comes in

    //use useState to store the Project object in an array
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => { //useEffect only goes and gets data when needed instead of all the time
        const fetchProjects = async() => {
            const response = await fetch('https://localhost:5000/water/allprojects'); //this goes and looks for the data(json)
            const data = await response.json(); //this holds the data. Gets the json out of the response
            setProjects(data); //set projects to hold the data
        };

        fetchProjects(); //call fetchProjects

    }, []); //feed in an empty array if nothing is fetched

    return(
        <>
            <h1>Water Projects</h1>
            <br/>

            {projects.map((p) => //take the data and spread it out with .map. A foreach loop essentially
                <div id="projectCard">
                    <h3>{p.projectName}</h3>

                    <ul>
                        <li>Project Type: {p.projectType}</li>
                        <li>Regional Program: {p.projectRegionalProgram}</li>
                        <li>Impact: {p.projectImpact} Individuals Served</li>
                        <li>Project Phase: {p.projectPhase}</li>
                        <li>Project Status: {p.projectFunctionalityStatus}</li>
                    </ul>

                </div>
        
        )}

        </>
    );
}

export default ProjectList;