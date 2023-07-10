module Spree
  module AbilityDecorator
    def abilities_to_register
      [SubscriptionAbility]
    end
  end
end

::Spree::Ability.prepend(Spree::AbilityDecorator)