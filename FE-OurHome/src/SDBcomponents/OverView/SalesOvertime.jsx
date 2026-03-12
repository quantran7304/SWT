import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ContactsOvertime = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const userJson = localStorage.getItem("user");
            if (!userJson) return;
            const user = JSON.parse(userJson);
            const userId = user.id;

            try {
                const response = await fetch(`http://localhost:8082/api/seller/contacts-over-time?userId=${userId}`);
                if (!response.ok) throw new Error('Error fetching data');
                const chartData = await response.json();
                setData(chartData); // Giả sử [{ month: 'Jun', contacts: 5, activeListings: 3 }, ...]
            } catch (error) {
                console.error("Error fetching chart data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="sales-overtime">
            <h4>Contacts Over Time</h4>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="contacts" stroke="#8884d8" name="Contacts" />
                    <Line type="monotone" dataKey="activeListings" stroke="#82ca9d" name="Active Listings" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ContactsOvertime;