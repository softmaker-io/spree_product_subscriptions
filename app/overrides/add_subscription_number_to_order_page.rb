Deface::Override.new(
  virtual_path: 'spree/orders/show',
  name: 'add_subscription_number_to_order_page',
  insert_after: "order_summary",
  partial: 'spree/orders/subscription_number'
)
