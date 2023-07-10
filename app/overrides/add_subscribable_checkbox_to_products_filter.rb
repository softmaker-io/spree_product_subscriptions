Deface::Override.new(
  virtual_path: 'spree/admin/products/_filters',
  name: 'add_subscribable_filter_to_products',
  insert_after: ".row",
  partial: "spree/admin/products/subscribable_filter"
)
