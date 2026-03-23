-- ============================================================
-- Global Harvest Imports — Sample Seed Data
-- ============================================================

INSERT INTO Categories (category_name, description) VALUES
('Grains',    'Wheat, rice, corn, barley and other cereal crops'),
('Spices',    'Dried herbs, pepper, cinnamon, cardamom'),
('Fruits',    'Fresh and dried tropical and seasonal fruits'),
('Legumes',   'Lentils, chickpeas, soybeans'),
('Oilseeds',  'Sunflower, soybean, canola seeds');

INSERT INTO Suppliers (supplier_name, country, contact_email, rating) VALUES
('AgriCorp India',       'India',     'sales@agricorp.in',      4.8),
('Harvest Brasil',       'Brazil',    'export@harvestbr.com',   4.5),
('Golden Fields AU',     'Australia', 'info@goldenfields.au',   4.7),
('Spice Route Lanka',    'Sri Lanka', 'orders@spiceroute.lk',  4.9),
('Prairie Select CA',    'Canada',    'supply@prairiesel.ca',   4.6);

INSERT INTO Products (product_name, category_id, supplier_id, unit_price, unit, stock_qty) VALUES
('Basmati Rice',       1, 1, 1.20, 'kg',   50000),
('Durum Wheat',        1, 3, 0.85, 'kg',   80000),
('Black Pepper',       2, 4, 8.50, 'kg',    5000),
('Cardamom Pods',      2, 4, 45.00,'kg',    1200),
('Dried Mango',        3, 2, 3.75, 'kg',    8000),
('Yellow Lentils',     4, 1, 0.95, 'kg',   30000),
('Canola Seeds',       5, 5, 1.45, 'kg',   20000);

INSERT INTO Customers (company_name, contact_name, country, email) VALUES
('EuroGrain GmbH',       'Hans Muller',    'Germany',     'orders@eurograin.de'),
('Pacific Foods Ltd',    'Sarah Chen',     'USA',         'sarah@pacificfoods.com'),
('MedDiet Italia',       'Marco Rossi',    'Italy',       'import@meddiet.it'),
('HealthPulse UK',       'Priya Sharma',   'UK',          'priya@healthpulse.co.uk'),
('AlSalam Trading',      'Ahmed Hassan',   'UAE',         'ahmed@alsalam.ae');

INSERT INTO Orders (customer_id, order_date, status, total_amount) VALUES
(1, '2024-02-10', 'delivered', 25400.00),
(2, '2024-03-05', 'delivered', 11700.00),
(3, '2024-03-22', 'shipped',   38250.00),
(4, '2024-04-01', 'confirmed',  9540.00),
(5, '2024-04-15', 'pending',   14800.00);
