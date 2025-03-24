import { useEffect, useState } from "react";
import { Project } from "./types/Project";

function ProjectList() {
    //we want to use the Project object to store the data as it comes in

    //use useState to store the Project object in an array
    const [projects, setProjects] = useState<Project[]>([]);

    //make this variable here because we want it to use state
    const [pageSize, setPageSize] = useState<number>(10);

    //for page number tracker
    const [pageNum, setPageNum] = useState<number>(1);

    const[totalItems, setTotalItems] = useState<number>(0);

    const[totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => { //useEffect only goes and gets data when needed instead of all the time
        const fetchProjects = async() => {
            const response = await fetch(`https://localhost:5000/water/allprojects?pageSize=${pageSize}&pageNum=${pageNum}`,
                {
                    credentials: 'include', //allows us to pass a cookie through
                }

            ); //this goes and looks for the data(json) and passes parameters up to .net
            const data = await response.json(); //this holds the data. Gets the json out of the response
            setProjects(data.projects); //set projects to hold the data. projects is the first item in the json object that we are getting her
            setTotalItems(data.totalNumProjects);
            setTotalPages(Math.ceil(totalItems/pageSize));
        };

        fetchProjects(); //call fetchProjects

    }, [pageSize, pageNum, totalItems]); //This is called the dependency array. can put what to watch for when we want the useEffect to run again

    return(
        <>
            <h1>Water Projects</h1>
            <br/>

            {projects.map((p) => //take the data and spread it out with .map. A foreach loop essentially

            //each card gets the unique identifier of p.projectId
                <div id="projectCard" className='card' key={p.projectId}> 
                
                    <h3 className="card-title">{p.projectName}</h3>

                    <div className="card-body">
                    <ul className="list-unstyled">
                        <li>
                            <strong>Project Type:</strong> 
                            {p.projectType}</li>
                        <li>
                            <strong>Regional Program: </strong>
                            {p.projectRegionalProgram}</li>
                        <li>
                            <strong>Impact: </strong>
                            {p.projectImpact} Individuals Served</li>
                        <li>
                            <strong>Project Phase: </strong>
                            {p.projectPhase}</li>
                        <li>
                            <strong>Project Status: </strong>
                            {p.projectFunctionalityStatus}</li>
                    </ul>
                    </div>
                </div>
        
        )}

        <button disabled={pageNum===1} onClick={() => setPageNum(pageNum - 1)}>Previous</button>

        {
            [...Array(totalPages)].map((_, i) => (
                <button key={i + 1} onClick={() => setPageNum(i + 1)} disabled={pageNum=== (i+1)}>
                    {i + 1}
                </button>
            ))
        }

        <button disabled={pageNum===totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button>


        <br/>
        {/* getting pagination into our page */}
        <label>
            Results per page: 
            {/* using inline function below */}
            <select value={pageSize} 
            onChange={(p) => {
                setPageSize(Number(p.target.value))
                setPageNum(1) //resetting pagenum back to one
            
                }}
                >
                <option value='5'>5</option>
                <option value='10'>10</option>
                <option value='20'>20</option>
            </select>
        </label>
        </>
    );
}

export default ProjectList;