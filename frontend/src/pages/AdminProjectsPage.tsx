import { useEffect, useState } from "react";
import { Project } from "../types/Project";
import { deleteProject, fetchProjects } from "../api/ProjectsAPI";
import Pagination from "../components/Pagination";
import NewProjectForm from "../components/NewProjectForm";
import EditProjectForm from "../components/EditProjectForm";

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

    const [showForm, setShowForm] = useState(false); //letting React infer the data type

    const [editingProject, setEditingProject] = useState<Project | null>(null);


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

const handleDelete = async(projectId: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this project?')
    if(!confirmDelete) return;

    try {
        await deleteProject(projectId);
        setProjects(projects.filter((p) =>p.projectId !== projectId));
    } 
    catch (error) {
    alert('Failed to delete project. Please try again.')
}
};

if (loading) return <p>Loading projects...</p>
if (error) return <p className="text-red-500">Error: {error}</p> 

return ( //this return is what the page is going to look like
    <div>
        <h1>Admin - Projects</h1>

        {!showForm && (
            <button 
                className="btn btn-success mb-3"
                onClick={() => setShowForm(true)}
                >
                    Add Project
                </button>
        )}

        {showForm && ( //the && is saying if showForm is true, do all this stuff:
            <NewProjectForm 
                onSuccess={() => {
                setShowForm(false); 
                fetchProjects(pageSize, pageNum, []).then((data) => 
                    setProjects(data.projects)
            );
        }}
        onCancel={() => setShowForm(false)}
        />
    )}

    {editingProject && (
        <EditProjectForm project={editingProject} onSuccess={() => {
            fetchProjects(pageSize, pageNum, []).then((data) => setProjects(data.projects));
        }}
        onCancel={() => setEditingProject(null)}
        />
    )}


        <table className="table table-bordered table-striped">
        <thead className="table-dark">
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
                            <button className="btn btn-primary btn-sm w-100 mb-1"
                            onClick={() => setEditingProject(p)}>
                                Edit
                            </button>
                            <button className="btn btn-danger btn-sm w-100"
                            onClick={() => handleDelete(p.projectId)}>
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