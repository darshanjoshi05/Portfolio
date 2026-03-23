-- ============================================================
-- Global Harvest Imports — Analytical Queries
-- ============================================================

-- 1. Top revenue-generating products
SELECT 
    p.product_name,
    SUM(oi.quantity)         AS total_units_sold,
    SUM(oi.subtotal)         AS total_revenue,
    ROUND(AVG(oi.unit_price),2) AS avg_price
FROM Order_Items oi
JOIN Products p ON oi.product_id = p.product_id
JOIN Orders   o ON oi.order_id   = o.order_id
WHERE o.status != 'cancelled'
GROUP BY p.product_id, p.product_name
ORDER BY total_revenue DESC
LIMIT 10;

-- 2. Orders by customer with shipment status
SELECT 
    c.company_name,
    c.country,
    COUNT(o.order_id)        AS total_orders,
    SUM(o.total_amount)      AS total_spent,
    MAX(o.order_date)        AS last_order,
    s.tracking_no,
    s.eta
FROM Customers c
JOIN Orders   o ON c.customer_id  = o.customer_id
LEFT JOIN Shipments s ON o.order_id = s.shipment_id
GROUP BY c.customer_id, c.company_name, c.country, s.tracking_no, s.eta
ORDER BY total_spent DESC;

-- 3. Supplier performance analysis
SELECT 
    sup.supplier_name,
    sup.country,
    sup.rating,
    COUNT(p.product_id)     AS products_supplied,
    SUM(oi.subtotal)        AS total_order_value
FROM Suppliers  sup
JOIN Products   p  ON sup.supplier_id = p.supplier_id
JOIN Order_Items oi ON p.product_id  = oi.product_id
GROUP BY sup.supplier_id, sup.supplier_name, sup.country, sup.rating
ORDER BY total_order_value DESC;

-- 4. Monthly revenue trend
SELECT 
    DATE_FORMAT(o.order_date, '%Y-%m')  AS month,
    COUNT(o.order_id)                   AS num_orders,
    SUM(o.total_amount)                 AS monthly_revenue
FROM Orders o
WHERE o.status IN ('confirmed','shipped','delivered')
GROUP BY DATE_FORMAT(o.order_date, '%Y-%m')
ORDER BY month;

-- 5. Low stock alert (below 5000 units)
SELECT 
    p.product_name,
    c.category_name,
    s.supplier_name,
    p.stock_qty,
    p.unit
FROM Products   p
JOIN Categories c ON p.category_id  = c.category_id
JOIN Suppliers  s ON p.supplier_id  = s.supplier_id
WHERE p.stock_qty < 5000
ORDER BY p.stock_qty ASC;
