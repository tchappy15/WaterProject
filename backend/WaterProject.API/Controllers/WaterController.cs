using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class WaterController : ControllerBase
    {
        private WaterDbContext _waterContext;

        public WaterController(WaterDbContext temp)=> _waterContext = temp;

        //the way we work: provide data using API's, send it back and forth using JSON objects, and that's how we connected in and get the data
        
//this is our routing:
        [HttpGet("AllProjects")] //give names so we can route. So this one is at /Water/AllProjects
        public IActionResult GetProjects(int pageSize = 10, int pageNum = 1) //slug is passing this to us. If we don't get anything default 5
        {

            string? favProjType = Request.Cookies["FavoriteProjectType"];
            Console.WriteLine("~~COOKIE~~\n" + favProjType);

            //cookie:
            HttpContext.Response.Cookies.Append("FavoriteProjectType", "Borehole Well and Hand Pump", new CookieOptions
            {
                HttpOnly = true, //this cookie can only be seen by the server
                Secure = true,
                SameSite = SameSiteMode.Strict, //sets option if we want to allow cookies from other sites. Strict means not allowed
                Expires = DateTime.Now.AddMinutes(1),
            }
                );

            var something = _waterContext.Projects
                .Skip((pageNum-1) * pageSize)
                .Take(pageSize)
                .ToList();
            
            var totalNumProjects = _waterContext.Projects.Count();

            var someObject = new //to return multiple things, we put them in an object and then return that object
            {
                Projects = something,
                TotalNumProjects = totalNumProjects
            };

            return Ok(someObject); //returning a json object
        }


        //building a 2nd route that gets just a list of categories. For our filter
        [HttpGet("GetProjectTypes")]
        public IActionResult GetProjectTypes ()
        {
            var projectTypes = _waterContext.Projects
                .Select(p => p.ProjectType)
                .Distinct()
                .ToList();

            return Ok(projectTypes);
        }

    }
}
