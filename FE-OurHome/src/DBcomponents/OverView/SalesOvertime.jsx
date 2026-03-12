import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { getAllUsers } from "../../services/adminService";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserRegistrationChart = () => {
    const [chartData, setChartData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch users from BE
                const users = await getAllUsers();
                console.log("Raw API response:", users); // Log raw data

                // Validate response
                if (!Array.isArray(users)) {
                    throw new Error("API response is not an array");
                }

                // Initialize month labels (1–12)
                const monthLabels = Array.from({ length: 12 }, (_, i) => `${i + 1}`);

                // Initialize counts for customer and seller
                const counts = Array.from({ length: 12 }, () => ({ customer: 0, seller: 0 }));

                // Process users
                let validUsers = 0;
                users.forEach((user, index) => {
                    // Validate user object
                    if (!user || typeof user !== "object") {
                        console.warn(`Invalid user at index ${index}:`, user);
                        return;
                    }

                    // Check roleName
                    const role = user.roleName?.toLowerCase();
                    if (role !== "customer" && role !== "seller") {
                        console.warn(`Invalid role for user at index ${index}:`, user);
                        return;
                    }

                    // Extract and validate createDate
                    const date = user.createDate || user.createdAt;
                    if (!date || typeof date !== "string") {
                        console.warn(`Invalid or missing createDate for user at index ${index}:`, user);
                        return;
                    }

                    // Parse month (expecting YYYY-MM-DD format)
                    const monthMatch = date.match(/^\d{4}-(\d{2})-\d{2}/);
                    if (!monthMatch) {
                        console.warn(`Invalid date format for user at index ${index}:`, date);
                        return;
                    }

                    const month = parseInt(monthMatch[1], 10);
                    if (month < 1 || month > 12) {
                        console.warn(`Invalid month for user at index ${index}:`, month);
                        return;
                    }

                    // Increment count
                    counts[month - 1][role]++;
                    validUsers++;
                });

                console.log("Processed user counts:", counts); // Log counts
                console.log("Valid users processed:", validUsers);

                // Prepare chart data
                const customerData = counts.map(c => c.customer);
                const sellerData = counts.map(c => c.seller);

                // Check if there's any data to display
                const hasData = customerData.some(v => v > 0) || sellerData.some(v => v > 0);
                if (!hasData) {
                    setError("No valid customer or seller registrations found for charting.");
                    setChartData(null);
                    return;
                }

                setChartData({
                    labels: monthLabels,
                    datasets: [
                        {
                            label: "Customer",
                            data: customerData,
                            backgroundColor: "rgba(54, 162, 235, 0.6)",
                            borderColor: "rgba(54, 162, 235, 1)",
                            borderWidth: 1,
                        },
                        {
                            label: "Seller",
                            data: sellerData,
                            backgroundColor: "rgba(255, 99, 132, 0.6)",
                            borderColor: "rgba(255, 99, 132, 1)",
                            borderWidth: 1,
                        },
                    ],
                });
                setError(null);
            } catch (err) {
                console.error("Error fetching or processing data:", err);
                setError("Failed to load chart data. Please try again later.");
                setChartData(null);
            }
        };

        fetchData();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: { font: { size: 14 } },
            },
            title: {
                display: true,
                text: "User Registration by Month",
                font: { size: 18 },
                padding: { top: 10, bottom: 30 },
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.raw}`,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Number of Users",
                    font: { size: 14 },
                },
                ticks: {
                    stepSize: 1, // Smaller step for low counts
                    font: { size: 12 },
                },
            },
            x: {
                title: {
                    display: true,
                    text: "Month",
                    font: { size: 14 },
                },
                ticks: { font: { size: 12 } },
            },
        },
    };

    return (
        <div className="user-registration-chart" style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            {error ? (
                <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            ) : chartData ? (
                <Bar data={chartData} options={options} />
            ) : (
                <p style={{ textAlign: "center" }}>Loading...</p>
            )}
        </div>
    );
};

export default UserRegistrationChart;