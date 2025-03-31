import { useEffect, useState } from "react";
import { Project } from "../types/Project";
import { useNavigate } from "react-router-dom";
import { fetchProjects } from "../api/ProjectsAPI";
import Pagination from "./Pagination";

function ProjectList({selectedCategories}: {selectedCategories: string[]}) {
    //we want to use the Project object to store the data as it comes in

    //use useState to store the Project object in an array
    const [projects, setProjects] = useState<Project[]>([]);

    //make this variable here because we want it to use state
    const [pageSize, setPageSize] = useState<number>(10);

    //for page number tracker
    const [pageNum, setPageNum] = useState<number>(1);

    const[totalPages, setTotalPages] = useState<number>(0);

    const navigate = useNavigate();

    const [error, setError] = useState<string | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => { //useEffect only goes and gets data when needed instead of all the time
        const loadProjects = async() => {

            try{
                setLoading(true);
                const data = await fetchProjects(pageSize, pageNum, selectedCategories); //have to pass these 3 things in since that's how we defined fetchProjects in the ProjectsAPI
            

            setProjects(data.projects); //set projects to hold the data. projects is the first item in the json object that we are getting her
            setTotalPages(Math.ceil(data.totalNumProjects/pageSize));
        } catch (error) {
            setError((error as Error).message);
        } finally { //finally is used to execute stuff EVEN IF there is an error
            setLoading(false);
        }
    };

        loadProjects(); //call loadProjects

    }, [pageSize, pageNum, selectedCategories]); //This is called the dependency array. can put what to watch for when we want the useEffect to run again

    if (loading) return <p>Loading projects...</p>
    if (error) return <p className="text-red-500">Error: {error}</p>

    return(
        <>
            
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

                    <button className="btn btn-success" 
                    onClick={() => navigate(`/donate/${p.projectName}/${p.projectId}`)}> {/*pass in the project name for whichever one we clicked donate for */}
                        Donate
                    </button>
                    </div>
                </div>
         
        )}
        <Pagination 
            currentPage={pageNum}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setPageNum}
            onPageSizeChange={(newSize) => {
                setPageSize(newSize);
                setPageNum(1);
            }}
        />
        </>
    );
}

export default ProjectList;