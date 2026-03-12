import "../../Assets/Asset/Reset.css";
import "../../Assets/Asset/Global.css";
import Navbar from "../../components/Navigation/Header";
import Footer from "../../components/Footer/Footer";
import PropertySearch from "../../components/PropertySearch/PropertySearch";


export default function ListingPage() {
    return (
        <div className="home-container">
            {/* Hero Banner Section */}
            <Navbar />
            <section className="section property-section-city fade-in">
                <PropertySearch />
            </section>


            {/* Footer */}
            <Footer />
        </div>
    );
}
