import React, { useEffect, useState } from "react";
import { Download, Package, ChevronRight, AlertCircle, Loader } from 'lucide-react';
import "../css/OrdersPage.css"; // External CSS
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';

import Loading from "../Layouts/Loading"


export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("http://127.0.0.1:8000/medicine/order/get/");
                const data = await res.json();

                if (res.ok && data) {
                    setOrders(data.orders || []);
                    setPayments(data.payments || []);
                }
            } catch (error) {
                console.log("Error:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) return <Loading />;

    const formatDate = (isoString) => {
        if (!isoString) return "-";
        const options = {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        };
        return new Date(isoString).toLocaleString("en-PK", options);
    };

    const getStatusClass = (status) => {
        if (!status) return 'status-default';
        const s = status.toLowerCase().replace(/ /g, "");
        if (s === 'delivered') return 'status-delivered';
        if (s === 'shipped') return 'status-shipped';
        if (s === 'processing') return 'status-processing';
        if (s === 'cancelled') return 'status-cancelled';
        return 'status-default';
    };

  const downloadPDF = () => {
    try {
        const doc = new jsPDF();

        const dateTime = new Date().toLocaleString("en-PK", { hour12: true });

        // ---------------- HEADER ----------------
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(30, 30, 30);
        doc.text("MediCare Store", 14, 18);

        doc.setFont("Helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(80, 80, 80);
        doc.text(`Order Slip — Generated on: ${dateTime}`, 14, 26);

        // Line under header
        doc.setDrawColor(0, 102, 204);
        doc.setLineWidth(0.8);
        doc.line(14, 30, 195, 30);

        // ---------------- ORDERS TABLE ----------------
        autoTable(doc, {
            startY: 40,
            head: [["Name", "Total Amount", "Status", "Created At"]],
            body: orders.map(o => [
                o.name || "-",
                "Rs " + (parseFloat(o.total_amount) || 0).toLocaleString("en-PK", {
                    minimumFractionDigits: 2
                }),
                o.status || "-",
                formatDate(o.created_at)
            ]),
            headStyles: { fillColor: [0, 102, 204], textColor: 255, fontStyle: "bold" },
            styles: { fontSize: 10, cellPadding: 3 },
            alternateRowStyles: { fillColor: [245, 245, 245] }
        });

        // ---------------- PAYMENTS TABLE ----------------
        autoTable(doc, {
            startY: (doc.lastAutoTable.finalY || 50) + 10,
            head: [["Name on Card", "Card Number", "Expiry", "Created At"]],
            body: payments.map(p => [
                p.name_on_card || "-",
                p.card_number ? `**** **** **** ${String(p.card_number).slice(-4)}` : "-",
                p.expiry_date || "-",
                formatDate(p.created_at)
            ]),
            headStyles: { fillColor: [0, 102, 204], textColor: 255, fontStyle: "bold" },
            styles: { fontSize: 10, cellPadding: 3 },
            alternateRowStyles: { fillColor: [245, 245, 245] }
        });

        // ---------------- FOOTER ----------------
        const pageHeight = doc.internal.pageSize.height;

        // Footer line
        doc.setDrawColor(200, 200, 200);
        doc.line(14, pageHeight - 35, 195, pageHeight - 35);

        doc.setFontSize(11);
        doc.setFont("Helvetica", "bold");
        doc.setTextColor(30, 30, 30);
        doc.text("Thank you for your purchase!", 14, pageHeight - 28);

        doc.setFont("Helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);

        doc.text("Contact Information:", 14, pageHeight - 20);
        doc.text("Main Road, City Center, Pakistan", 14, pageHeight - 15);
        doc.text("Email: muhammadsaqibyounas11@gmail.com", 14, pageHeight - 11);
        doc.text("Phone: 0342-0339016", 14, pageHeight - 7);

        // Save
        doc.save("Order_History.pdf");

    } catch (error) {
        console.error("PDF ERROR:", error);
    }
};


    const noData = orders.length === 0 && payments.length === 0;

    return (
        <div className="orders-page-container">
            <h2 className="title"><Package size={32} /> Your Orders & Payments</h2>

            <button className="download-btn" onClick={downloadPDF}>
                <Download size={20} /> Download Order Slip (PDF)
            </button>

            {noData && (
                <div className="table-wrapper no-data-wrapper">
                    <div className="no-data">
                        <AlertCircle size={20} /> No orders or payment history found.
                    </div>
                </div>
            )}

            {orders.length > 0 && (
                <>
                    <h3 className="section-title"><ChevronRight size={20} /> Orders List</h3>
                    <div className="table-wrapper">
                        <table className="styled-table">
                            <thead>
                                <tr>
                                    <th>Order Name</th>
                                    <th>Total Amount</th>
                                    <th>Status</th>
                                    <th>Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((o) => (
                                    <tr key={o.id}>
                                        <td>{o.name || "-"}</td>
                                        <td>Rs {parseFloat(o.total_amount || 0).toLocaleString("en-PK", { minimumFractionDigits: 2 })}</td>
                                        <td><span className={`status ${getStatusClass(o.status)}`}>{o.status || "N/A"}</span></td>
                                        <td>{formatDate(o.created_at)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {payments.length > 0 && (
                <>
                    <h3 className="section-title"><ChevronRight size={20} /> Payment History</h3>
                    <div className="table-wrapper">
                        <table className="styled-table">
                            <thead>
                                <tr>
                                    <th>Name on Card</th>
                                    <th>Card Number</th>
                                    <th>Expiry</th>
                                    <th>Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((p) => (
                                    <tr key={p.id}>
                                        <td>{p.name_on_card || "-"}</td>
                                        <td>{p.card_number ? "**** **** **** " + String(p.card_number).slice(-4) : "-"}</td>
                                        <td>{p.expiry_date || "-"}</td>
                                        <td>{formatDate(p.created_at)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}
