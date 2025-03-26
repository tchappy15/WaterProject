import { useState } from "react";
import CookieConsent from "react-cookie-consent";
import CategoryFilter from "../components/CategoryFilter";
import ProjectList from "../components/ProjectList";
import WelcomeBand from "../components/WelcomeBand";
import Fingerprint from "../Fingerprint";
import CartSummary from "../components/CartSummary";


function ProjectsPage() {

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]); //put this on the parent level, since we want ProjectList, a sibling of the CategoryFilter, to be able to see selectedCategories

    return (
    <>
    <div className="container mt-4">
            {/* adding bootstrap. This is the overall container */}

            <CartSummary/>
            <WelcomeBand />

            <div className="row">
                <div className="col-md-3">
                    <CategoryFilter //want to pass in these two values:

                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories} />
                </div>
                <div className="col-md-9">
                    <ProjectList //want to pass in selectedCategories

                        selectedCategories={selectedCategories} />
                </div>
            </div>
        </div><CookieConsent>
                This website uses cookies to enhance the user experience.
            </CookieConsent>
            <Fingerprint />
            </>
    )
}

export default ProjectsPage