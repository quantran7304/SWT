import React, { useEffect, useState } from "react";
import {getAllReports} from "../../services/reportService"

const LatestOrders = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const data = await getAllReports();
                console.log("Report BE",data);
                const filteredReports = data
                    .filter(report => report.status.toLowerCase() === "pending")
                    .sort((a, b) => new Date(b.reportDate) - new Date(a.reportDate))
                    .slice(0, 3);
                setReports(filteredReports);
            } catch (error) {
                // Error is already logged in the service
            }
        };

        fetchReports();
    }, []);

    return (
        <div className="latest-orders">
            <h4>Newest Reports</h4>
            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>PropertyID</th>
                    <th>User Report</th>
                    <th>Reason</th>
                    <th>Report Details</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {reports.map((report) => (
                    <tr key={report.reportId}>
                        <td>{report.reportId}</td>
                        <td>{report.propertyId}</td>
                        <td>{report.userId}</td>
                        <td>{report.reportReason}</td>
                        <td>{report.reportDetail}</td>
                        <td>{report.reportDate}</td>
                        <td>{report.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default LatestOrders;