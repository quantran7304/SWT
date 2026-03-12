// src/components/MembershipForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMembershipById, createMembership, updateMembership } from '../../services/membershipService';

const MembershipForm = () => {
    const { id } = useParams();
    console.log(id);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        type: '',
        price: 0,
        description: '',
        numListings: 0,
        numListingsVip: 0,
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            fetchMembership();
        }
    }, [id]);

    const fetchMembership = async () => {
        try {
            const data = await getMembershipById(id);
            setFormData({
                type: data.type,
                price: data.price,
                description: data.description,
                numListings: data.numListings,
                numListingsVip: data.numListingsVip,
            });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'price' || name === 'numListings' || name === 'numListingsVip' ? parseFloat(value) : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateMembership(id, formData);
            } else {
                await createMembership(formData);
            }
            navigate('/admin/dashboard/membership'); // Navigate back to list
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="membership-form">
            <h1>{id ? 'Edit Membership' : 'Create Membership'}</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Type:</label>
                    <input type="text" name="type" value={formData.type} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} required min="0" />
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" name="description" value={formData.description} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Num Listings:</label>
                    <input type="number" name="numListings" value={formData.numListings} onChange={handleInputChange} min="0" />
                </div>
                <div>
                    <label>Num Listings VIP:</label>
                    <input type="number" name="numListingsVip" value={formData.numListingsVip} onChange={handleInputChange} min="0" />
                </div >
                <div className="button-container">
                <button type="submit">{id ? 'Update' : 'Create'}</button>
                <button type="button" onClick={() => navigate('/admin/dashboard/membership')}>Cancel</button>
                    </div>
            </form>
        </div>
    );
};

export default MembershipForm;