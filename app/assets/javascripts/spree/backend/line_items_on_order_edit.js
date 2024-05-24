document.addEventListener("spree:load", function() {
  console.log('spree:load event triggered');

  // Handle variant change
  $('#add_line_item_variant_id').change(function () {
    var variantId = $(this).val().toString();

    var variant = _.find(window.variants, function (variant) {
      return variant.id.toString() == variantId;
    });
    $('#stock_details').html(variantLineItemTemplate({ variant: variant }));
    $('#stock_details').show();
    $('button.add_variant').click(addVariant);

    // Added for subscription orders
    disableSubscriptionFieldsOnOneTimeOrder(variantId);
  });
});

function addVariant () {
  $('#stock_details').hide();
  var variantId = $('select.variant_autocomplete').val();
  var quantity = parseInt($('input#variant_quantity').val());

  // Added for subscription
  var subscribe = $("input.subscribe[data-variant-id='" + variantId + "']:checked").val();
  var deliveryNumber = $("input.delivery_number[data-variant-id='" + variantId + "']").val();
  var frequency = $("select#frequency[data-variant-id='" + variantId + "']").val();

  adjustLineItems(order_id, variantId, quantity, subscribe, deliveryNumber, frequency);
  return 1;
}

// Changed for subscription
function adjustLineItems(order_id, variant_id, quantity, subscribe, deliveryNumber, frequency) {
  $.ajax({
    type: 'POST',
    url: Spree.routes.line_items_api_v2,
    data: {
      line_item: {
        order_id: order_id,
        variant_id: variant_id,
        quantity: quantity,
        options: {
          subscribe: subscribe,
          delivery_number: deliveryNumber,
          subscription_frequency_id: frequency
        }
      }
    },
    headers: Spree.apiV2Authentication()
  }).done(function () {

    window.Spree.advanceOrder();
    window.location.reload();
  }).fail(function (response) {

    show_flash('error', response.responseJSON.error);
  });
}

// Added for subscriptions
function disableSubscriptionFieldsOnOneTimeOrder(variant_id) {
  var deliveryNumber = $("input.delivery_number[data-variant-id='" + variant_id + "']");
  var frequency = $("select#frequency[data-variant-id='" + variant_id + "']");
  $("input.subscribe[data-variant-id='" + variant_id + "']").on("change", function() {
    if (!parseInt($(this).val())) {
      deliveryNumber.attr("disabled", "disabled");
      frequency.attr("disabled", "disabled");
    } else {
      deliveryNumber.removeAttr("disabled");
      frequency.removeAttr("disabled");
    }
  });
}
