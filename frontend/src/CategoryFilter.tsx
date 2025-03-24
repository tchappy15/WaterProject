import { useEffect, useState } from "react";

function CategoryFilter ()
{
    const [categories, setCatgories] = useState<string[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try{
            const response = await fetch('https://localhost:5000/water/getprojecttypes');
            const data = await response.json(); //grab the json out of the response
            console.log('Fetched categories:', data); 

            setCatgories(data) //use the data we get to update categories
            }
            catch (error){
                console.error('Error feching categories', error);
            }
        }

        fetchCategories(); //call the fetchCategories function
    }, []) //dependency array that watches for changes in certain variables

    return (
        <div> {/* Using div's since it is easier to style */}
            <h5>Project Types</h5>
            <div> {/* going into the array one element at a time, calling it c */}
            {categories.map((c) => ( 
                    <div key={c}>
                        <input type='checkbox' id={c} value={c} />
                        <label htmlFor={c}>{c}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryFilter;