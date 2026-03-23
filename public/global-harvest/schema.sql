-- ============================================================
-- Global Harvest Imports — Database Schema (3NF)
-- Designed by: Darshan Joshi | Jan – Jun 2024
-- Description: Multi-department relational database for an
--              international agricultural import company.
-- ============================================================

-- ── Suppliers ──────────────────────────────────────────────
CREATE TABLE Suppliers (
    supplier_id   INT          PRIMARY KEY AUTO_INCREMENT,
    supplier_name VARCHAR(100) NOT NULL,
    country       VARCHAR(60)  NOT NULL,
    contact_email VARCHAR(120),
    contact_phone VARCHAR(20),
    rating        DECIMAL(3,2) CHECK (rating BETWEEN 0 AND 5),
    created_at    DATETIME     DEFAULT CURRENT_TIMESTAMP
);

-- ── Product Categories ─────────────────────────────────────
CREATE TABLE Categories (
    category_id   INT         PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(60) NOT NULL UNIQUE,
    description   TEXT
);

-- ── Products ───────────────────────────────────────────────
CREATE TABLE Products (
    product_id    INT           PRIMARY KEY AUTO_INCREMENT,
    product_name  VARCHAR(100)  NOT NULL,
    category_id   INT           NOT NULL,
    supplier_id   INT           NOT NULL,
    unit_price    DECIMAL(10,2) NOT NULL CHECK (unit_price > 0),
    unit          VARCHAR(20)   NOT NULL,   -- kg, ton, crate, etc.
    stock_qty     INT           DEFAULT 0 CHECK (stock_qty >= 0),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id),
    FOREIGN KEY (supplier_id) REFERENCES Suppliers(supplier_id)
);

-- ── Customers ──────────────────────────────────────────────
CREATE TABLE Customers (
    customer_id   INT          PRIMARY KEY AUTO_INCREMENT,
    company_name  VARCHAR(100) NOT NULL,
    contact_name  VARCHAR(80),
    country       VARCHAR(60)  NOT NULL,
    email         VARCHAR(120) UNIQUE,
    phone         VARCHAR(20),
    credit_limit  DECIMAL(12,2) DEFAULT 10000.00,
    created_at    DATETIME      DEFAULT CURRENT_TIMESTAMP
);

-- ── Orders ─────────────────────────────────────────────────
CREATE TABLE Orders (
    order_id      INT          PRIMARY KEY AUTO_INCREMENT,
    customer_id   INT          NOT NULL,
    order_date    DATE         NOT NULL,
    status        ENUM('pending','confirmed','shipped','delivered','cancelled')
                               DEFAULT 'pending',
    total_amount  DECIMAL(14,2),
    notes         TEXT,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

-- ── Order Line Items (junction: Orders ↔ Products) ─────────
CREATE TABLE Order_Items (
    item_id       INT           PRIMARY KEY AUTO_INCREMENT,
    order_id      INT           NOT NULL,
    product_id    INT           NOT NULL,
    quantity      INT           NOT NULL CHECK (quantity > 0),
    unit_price    DECIMAL(10,2) NOT NULL,
    subtotal      DECIMAL(12,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    FOREIGN KEY (order_id)    REFERENCES Orders(order_id),
    FOREIGN KEY (product_id)  REFERENCES Products(product_id),
    UNIQUE (order_id, product_id)   -- composite PK alternative
);

-- ── Shipments ──────────────────────────────────────────────
CREATE TABLE Shipments (
    shipment_id   INT         PRIMARY KEY AUTO_INCREMENT,
    order_id      INT         NOT NULL UNIQUE,   -- 1-to-1 with Order
    shipped_date  DATE,
    carrier       VARCHAR(60),
    tracking_no   VARCHAR(80) UNIQUE,
    eta           DATE,
    delivered_at  DATETIME,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);

-- ── Indexes for query performance ──────────────────────────
CREATE INDEX idx_products_supplier  ON Products(supplier_id);
CREATE INDEX idx_orders_customer    ON Orders(customer_id);
CREATE INDEX idx_orders_date        ON Orders(order_date);
CREATE INDEX idx_items_product      ON Order_Items(product_id);
