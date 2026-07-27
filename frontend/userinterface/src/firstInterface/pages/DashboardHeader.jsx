import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useSearch } from "../searchbar/Hooks/useSearch";
import { useNavigate } from "react-router-dom";
import OutsideDashBoard from "../onClickingOutside/pages/OutsideDashBoard";
import { useAuth as useDashboardAuth } from "../onClickingOutside/hooks/useDashboard";

const DashboardHeader = () => {
    const { user, setLoading } = useAuth();
    const { open, setOpen } = useDashboardAuth();
    const { searchResultHandler } = useSearch();
    const [search, setSearch] = useState("");
    const navigate = useNavigate()
    const searchHandler = (e) => {
        e.preventDefault()
        setLoading(true);
        try {
            searchResultHandler({ name: search });
            navigate("/search");
        } catch (error) {
            console.log("unable to doit", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <header className="dashboard-header">
            <div className="dashboard-header-left">
                <div className="site-title">
                    <h1 className="dashboard-title">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                        BonGaZon<span className="domain-suffix">.in</span>
                    </h1>
                </div>

                <span className="dashboard-welcome">Welcome, {user.name}</span>
            </div>
            <div className="dashboard-component-right">
                <div className="search-bar">
                    <input
                        className="dashboard-search-input"
                        type="text"
                        placeholder="Enter product name"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        className="search-icon-button"
                        type="submit"
                        aria-label="Search"
                        onClick={searchHandler}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
                        </svg>
                    </button>
                </div>

                <div className="dashboard-outside" style={{ cursor: 'pointer' }} onClick={() => setOpen(!open)}>
                    <img
                        src="https://imgs.search.brave.com/aX7CEgdsXcExaNXt5jLIa8--8k0utAjO33xcdugux44/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kcmVh/bXBmcC5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjYvMDUv/RGVmYXVsdC1QZnAt/Ym95LTIud2VicA"
                        alt="Profile"
                    />
                </div>
            </div>

            <OutsideDashBoard />
        </header>
    );
};

export default DashboardHeader;
