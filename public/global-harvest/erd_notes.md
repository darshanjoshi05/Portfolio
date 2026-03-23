# Global Harvest Imports — ERD Notes

## Entities & Relationships

| Entity       | PK            | Key Attributes                              |
|--------------|---------------|---------------------------------------------|
| Suppliers    | supplier_id   | name, country, rating                       |
| Categories   | category_id   | category_name                               |
| Products     | product_id    | name, unit_price, stock_qty                 |
| Customers    | customer_id   | company_name, country, credit_limit         |
| Orders       | order_id      | order_date, status, total_amount            |
| Order_Items  | item_id       | quantity, unit_price, subtotal (generated)  |
| Shipments    | shipment_id   | carrier, tracking_no, eta                   |

## Relationships
- Supplier → Products : 1-to-Many
- Category → Products : 1-to-Many
- Customer → Orders   : 1-to-Many
- Order → Order_Items : 1-to-Many
- Product → Order_Items : 1-to-Many (junction)
- Order → Shipment    : 1-to-1

## Normalization
- **1NF**: All attributes atomic, no repeating groups
- **2NF**: All non-key attributes fully dependent on PK (Order_Items uses composite logic)
- **3NF**: No transitive dependencies — supplier details not stored in Products

## Design Decisions
- `subtotal` in Order_Items is a GENERATED column (MySQL 5.7+) — avoids update anomalies
- Composite UNIQUE on (order_id, product_id) prevents duplicate line items
- ENUM for order status enforces valid state transitions
- Separate Categories table (not inline in Products) — extensible without schema changes
