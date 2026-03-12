// src/components/MembershipList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMemberships, disableMembership } from '../../services/membershipService';
import "./Membership.css";
const MembershipList = () => {
    const [memberships, setMemberships] = useState([]);
    const [filteredMemberships, setFilteredMemberships] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMembershipsData();
    }, []);

    const fetchMembershipsData = async () => {
        try {
            const data = await fetchMemberships();
            setMemberships(data);
            setFilteredMemberships(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = memberships.filter(
            (membership) =>
                membership.type.toLowerCase().includes(term) ||
                (membership.description && membership.description.toLowerCase().includes(term))
        );
        setFilteredMemberships(filtered);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this membership?')) {
            try {
                await disableMembership (id);
                fetchMembershipsData();
            } catch (err) {
                setError(err.message);
            }
        }
    };

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="member-view-toggle">
                <button
                    onClick={() => navigate('/admin/dashboard/membership/new')}
                    className="member-toggle-btn"
                >
                    Create New
                </button>
                <div className="search-container">
                    <label className="filter-label">Search:</label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search by type or description"
                        className="search-input"
                    />
                    <button onClick={handleSearch} className="1-search-btn">
                        Search
                    </button>
                </div>
            </div>

            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Num Listings</th>
                    <th>Num Listings VIP</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredMemberships.map((membership) => (
                    <tr key={membership.membershipId}>
                        <td>{membership.membershipId}</td>
                        <td>{membership.type}</td>
                        <td>{membership.price}</td>
                        <td>{membership.description}</td>
                        <td>{membership.numListings}</td>
                        <td>{membership.numListingsVip}</td>
                        <td>
                            <button onClick={() => navigate(`/admin/dashboard/membership/edit/${membership.membershipId}`)}>Edit</button>
                            <button onClick={() => handleDelete(membership.membershipId)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MembershipList;