import { useEffect, useState } from "react";
import { Project } from "../types/Project";
import { fetchProjects } from "../api/ProjectsAPI";
import Pagination from "../components/Pagination";

const AdminProjectsPage = () => {
    //use useState to store the Project object in an array
    const [projects, setProjects] = useState<Project[]>([]);

    //make this variable here because we want it to use state
    const [pageSize, setPageSize] = useState<number>(10);

    //for page number tracker
    const [pageNum, setPageNum] = useState<number>(1);

    const[totalPages, setTotalPages] = useState<number>(0);

    // const navigate = useNavigate();

    const [error, setError] = useState<string | null>(null);

    const [loading, setLoading] = useState(true);


useEffect(()=> {
    const loadProjects= async() => {
        try {
            const data = await fetchProjects(pageSize,pageNum, []);
            setProjects(data.projects);
            setTotalPages(Math.ceil(data.totalNumProjects / pageSize));
        } catch(err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }

    loadProjects(); //call the function that we just created
}, [pageSize, pageNum]);

if (loading) return <p>Loading projects...</p>
if (error) return <p className="text-red-500">Error: {error}</p> 

return ( //this return is what the page is going to look like
    <div>
        <h1>Admin - Projects</h1>
        <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Regional Program</th>
                <th>Impact</th>
                <th>Phase</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {
                projects.map((p) => (
                    <tr key = {p.projectId}>
                        <td>{p.projectId}</td>
                        <td>{p.projectName}</td>
                        <td>{p.projectType}</td>
                        <td>{p.projectRegionalProgram}</td>
                        <td>{p.projectImpact}</td>
                        <td>{p.projectPhase}</td>
                        <td>{p.projectFunctionalityStatus}</td>
                        <td>
                            <button onClick={() => console.log(`Edit project ${p.projectId}`)}>
                                Edit
                            </button>
                            <button onClick={() => console.log(`Delete project ${p.projectId}`)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))
            }
        </tbody>
        </table>

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
    </div>
)


};

export default AdminProjectsPage;