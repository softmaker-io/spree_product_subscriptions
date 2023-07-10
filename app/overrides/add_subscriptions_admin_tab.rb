Deface::Override.new(
  virtual_path: "spree/admin/shared/_main_menu",
  name: 'subscriptions_settings_admin',
  insert_before: "ul#sidebarConfiguration",
  partial: 'spree/admin/shared/subscriptions_sidebar_menu',
  disabled: false
)
