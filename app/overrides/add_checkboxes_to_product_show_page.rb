Deface::Override.new(
  virtual_path: "spree/products/_cart_form",
  name: "add_checkboxes_to_cart_form",
  insert_bottom: "erb[loud]:contains('if @product.variants_and_option_values(current_currency).any?')",
  partial: "spree/products/cart_checkboxes"
)
