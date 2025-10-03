$(document).ready(function() {
    // Initialize checkout v2 functionality
    initializeCheckoutV2();
    
    function initializeCheckoutV2() {
        // Handle payment method changes
        handlePaymentMethods();
        
        // Handle form validation
        handleFormValidation();
        
        // Handle terms agreement
        handleTermsAgreement();
        
        // Handle order submission
        handleOrderSubmission();
        
        // Handle promo code
        handlePromoCode();
        
        // Handle company checkbox
        handleCompanyCheckbox();
        
        // Handle widgets
        handleWidgets();
    }
    
    function handlePaymentMethods() {
        $('input[name="payment"]').on('change', function() {
            const selectedMethod = $(this).val();
            
            if (selectedMethod === 'card') {
                $('#collapseCard').collapse('show');
            } else {
                $('#collapseCard').collapse('hide');
            }
        });
    }
    
    function handleCompanyCheckbox() {
        $('#company').on('change', function() {
            const isChecked = $(this).is(':checked');
            
            if (isChecked) {
                $('#company-info').slideDown(300);
            } else {
                $('#company-info').slideUp(300);
            }
        });
    }
    
    function handleWidgets() {
        console.log('Initializing widgets...');
        
        // Handle widget triggers
        $('[data-overlay]').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const widgetId = $(this).data('overlay');
            console.log('Widget clicked:', widgetId);
            showWidget(widgetId);
        });
        
        // Handle option selection in widgets
        $('.delivery-option-card, .payment-option-card').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
        });
        
        // Handle close button clicks
        $('.btn-close-widget').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            hideWidget();
        });
        
        // Handle select buttons
        $('#delivery-widget .btn-primary').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            selectDelivery();
        });
        
        $('#payment-widget .btn-primary').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            selectPayment();
        });
        
        // Handle click outside widget to close
        $(document).on('click', function(e) {
            if ($('.widget-container.active').length) {
                const widget = $('.widget-container.active');
                const widgetContent = widget.find('.widget-content');
                
                // Check if click is outside widget content
                if (!widgetContent.is(e.target) && widgetContent.has(e.target).length === 0) {
                    hideWidget();
                }
            }
        });
        
        // Prevent widget content clicks from bubbling, but allow buttons to work
        $('.widget-content').on('click', function(e) {
            // Only stop propagation if it's not a button
            if (!$(e.target).is('button') && !$(e.target).closest('button').length) {
                e.stopPropagation();
            }
        });
        
        // Handle ESC key to close widget
        $(document).on('keydown', function(e) {
            if (e.key === 'Escape' && $('.widget-container.active').length) {
                hideWidget();
            }
        });
        
        console.log('Widgets initialized. Found', $('[data-overlay]').length, 'widget triggers');
    }
    
    function showWidget(widgetId) {
        console.log('Showing widget:', widgetId);
        
        // Remove active and slide-out classes from all widgets
        $('.widget-container').removeClass('active slide-out');
        
        // Add active class to target widget
        $('#' + widgetId).addClass('active');
        
        console.log('Widget classes added, active widgets:', $('.widget-container.active').length);
        
        // Focus on first input if available
        setTimeout(() => {
            $('#' + widgetId + ' input, #' + widgetId + ' button').first().focus();
        }, 100);
    }
    
    function hideWidget() {
        const activeWidget = $('.widget-container.active');
        
        if (activeWidget.length) {
            // Add slide-out class
            activeWidget.addClass('slide-out');
            
            // Remove classes after animation
            setTimeout(() => {
                activeWidget.removeClass('active slide-out');
            }, 600);
        }
    }
    
    function selectDelivery() {
        const activeOption = $('#delivery-widget .delivery-option-card.active');
        if (activeOption.length) {
            const deliveryName = activeOption.find('h4').text();
            const deliveryDesc = activeOption.find('p').text();
            const deliveryPrice = activeOption.find('.option-price').text();
            
            // Update main delivery section
            $('.delivery-section .section-info h4').text(deliveryName);
            $('.delivery-section .section-info p').text(deliveryDesc);
            $('.delivery-section .section-price .price').text(deliveryPrice);
            
            // Update total price
            updateTotalPrice();
            
            hideWidget();
            showNotification('Způsob dopravy byl vybrán', 'success');
        }
    }
    
    function selectPayment() {
        const activeOption = $('#payment-widget .payment-option-card.active');
        if (activeOption.length) {
            const paymentName = activeOption.find('h4').text();
            const paymentDesc = activeOption.find('p').text();
            const paymentPrice = activeOption.find('.option-price').text();
            
            // Update main payment section
            $('.payment-section .section-info h4').text(paymentName);
            $('.payment-section .section-info p').text(paymentDesc);
            $('.payment-section .section-price .price').text(paymentPrice);
            
            // Update total price
            updateTotalPrice();
            
            hideWidget();
            showNotification('Způsob platby byl vybrán', 'success');
        }
    }
    
    function updateTotalPrice() {
        // Get delivery price
        const deliveryPrice = $('#delivery-widget .delivery-option-card.active').data('price') || 0;
        const paymentPrice = $('#payment-widget .payment-option-card.active').data('price') || 0;
        
        // Calculate total
        const subtotal = 999; // Base price
        const total = subtotal + deliveryPrice + paymentPrice;
        
        // Update display
        $('.order-summary .subtotal .price').text(subtotal + ' Kč');
        $('.order-summary .delivery .price').text(deliveryPrice > 0 ? deliveryPrice + ' Kč' : 'Zdarma');
        $('.order-summary .payment .price').text(paymentPrice > 0 ? paymentPrice + ' Kč' : 'Zdarma');
        $('.order-summary .total .price').text(total + ' Kč');
    }
    
    function showNotification(message, type) {
        // Create notification element
        const notification = $(`
            <div class="notification notification-${type}">
                ${message}
            </div>
        `);
        
        // Add to body
        $('body').append(notification);
        
        // Show notification
        setTimeout(() => {
            notification.addClass('show');
        }, 100);
        
        // Hide notification
        setTimeout(() => {
            notification.removeClass('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    function handleFormValidation() {
        // Real-time validation for email
        $('#email').on('blur', function() {
            validateEmail($(this));
        });
        
        // Real-time validation for card number
        $('#card-number').on('input', function() {
            formatCardNumber($(this));
        });
        
        // Real-time validation for expiry
        $('#expiry').on('input', function() {
            formatExpiry($(this));
        });
        
        // Real-time validation for CVC
        $('#cvc').on('input', function() {
            formatCVC($(this));
        });
        
        // Real-time validation for postal code
        $('#zip').on('input', function() {
            formatPostalCode($(this));
        });
    }
    
    function validateEmail(input) {
        const email = input.val();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email)) {
            showFieldError(input, 'Zadejte platný email');
            return false;
        } else {
            clearFieldError(input);
            return true;
        }
    }
    
    function formatCardNumber(input) {
        let value = input.val().replace(/\s/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        
        if (formattedValue.length > 19) {
            formattedValue = formattedValue.substr(0, 19);
        }
        
        input.val(formattedValue);
    }
    
    function formatExpiry(input) {
        let value = input.val().replace(/\D/g, '');
        
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        
        input.val(value);
    }
    
    function formatCVC(input) {
        let value = input.val().replace(/\D/g, '');
        
        if (value.length > 4) {
            value = value.substring(0, 4);
        }
        
        input.val(value);
    }
    
    function formatPostalCode(input) {
        let value = input.val().replace(/\D/g, '');
        
        if (value.length > 5) {
            value = value.substring(0, 5);
        }
        
        input.val(value);
    }
    
    function showFieldError(input, message) {
        clearFieldError(input);
        
        input.addClass('error');
        input.after(`<div class="field-error">${message}</div>`);
    }
    
    function clearFieldError(input) {
        input.removeClass('error');
        input.siblings('.field-error').remove();
    }
    
    function handleTermsAgreement() {
        $('#terms').on('change', function() {
            const isChecked = $(this).is(':checked');
            const orderButton = $('.btn-order');
            
            if (isChecked) {
                orderButton.prop('disabled', false);
            } else {
                orderButton.prop('disabled', true);
            }
        });
    }
    
    function handleOrderSubmission() {
        $('.btn-order').on('click', function() {
            if ($(this).prop('disabled')) {
                return;
            }
            
            // Validate all required fields
            if (!validateAllFields()) {
                return;
            }
            
            // Show loading state
            $(this).addClass('loading').prop('disabled', true);
            
            // Simulate order processing
            setTimeout(() => {
                showNotification('Objednávka byla úspěšně odeslána!', 'success');
                $(this).removeClass('loading').prop('disabled', false);
            }, 2000);
        });
    }
    
    function validateAllFields() {
        let isValid = true;
        
        // Validate email
        if (!validateEmail($('#email'))) {
            isValid = false;
        }
        
        // Validate payment method specific fields
        const selectedPayment = $('input[name="payment"]:checked').val();
        
        if (selectedPayment === 'card') {
            // Validate card fields
            const cardNumber = $('#card-number').val().replace(/\s/g, '');
            const expiry = $('#expiry').val();
            const cvc = $('#cvc').val();
            const cardholder = $('#cardholder').val();
            
            if (cardNumber.length < 16) {
                showFieldError($('#card-number'), 'Zadejte platné číslo karty');
                isValid = false;
            }
            
            if (expiry.length !== 5) {
                showFieldError($('#expiry'), 'Zadejte platné datum');
                isValid = false;
            }
            
            if (cvc.length < 3) {
                showFieldError($('#cvc'), 'Zadejte platný CVC');
                isValid = false;
            }
            
            if (!cardholder.trim()) {
                showFieldError($('#cardholder'), 'Zadejte jméno držitele karty');
                isValid = false;
            }
        }
        
        // Validate billing address
        const address1 = $('#address1').val();
        const zip = $('#zip').val();
        const city = $('#city').val();
        
        if (!address1.trim()) {
            showFieldError($('#address1'), 'Zadejte adresu');
            isValid = false;
        }
        
        if (!zip.trim()) {
            showFieldError($('#zip'), 'Zadejte PSČ');
            isValid = false;
        }
        
        if (!city.trim()) {
            showFieldError($('#city'), 'Zadejte město');
            isValid = false;
        }
        
        // Validate terms
        if (!$('#terms').is(':checked')) {
            showNotification('Musíte souhlasit s obchodními podmínkami', 'error');
            isValid = false;
        }
        
        return isValid;
    }
    
    function handlePromoCode() {
        $('.btn-promo').on('click', function() {
            const promoCode = prompt('Zadejte promo kód:');
            
            if (promoCode) {
                // Simulate promo code validation
                applyPromoCode(promoCode);
            }
        });
    }
    
    function applyPromoCode(code) {
        // Simulate promo code logic
        let discountAmount = 0;
        let isValid = false;
        
        switch(code.toLowerCase()) {
            case 'welcome10':
                discountAmount = 44.5; // 10% of 445
                isValid = true;
                break;
            case 'newuser':
                discountAmount = 50;
                isValid = true;
                break;
            case 'free':
                discountAmount = 95; // Free shipping
                isValid = true;
                break;
        }
        
        if (isValid) {
            // Update order summary
            updateOrderSummary(discountAmount);
            $('.btn-promo').text('Kód aplikován').prop('disabled', true);
            showNotification(`Slevový kód "${code.toUpperCase()}" byl aplikován`, 'success');
        } else {
            showNotification('Neplatný slevový kód', 'error');
        }
    }
    
    function updateOrderSummary(discount = 0) {
        const subtotal = 350;
        const shipping = 95;
        const total = subtotal + shipping - discount;
        
        // Update total in summary
        $('.summary-total span:last').text(total + ' Kč');
        
        // Update order button text if discount applied
        if (discount > 0) {
            $('.btn-order').text(`Zaplatit a objednat (sleva ${discount} Kč)`);
        } else {
            $('.btn-order').text('Zaplatit a objednat');
        }
    }
    
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = $(`
            <div class="notification notification-${type}">
                <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `);
        
        // Add to page
        $('body').append(notification);
        
        // Show notification
        setTimeout(() => {
            notification.addClass('show');
        }, 100);
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.removeClass('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Add notification styles
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 8px;
            padding: 15px 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            border-left: 4px solid var(--primary-color);
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-success {
            border-left-color: var(--primary-color);
        }
        
        .notification-success i {
            color: var(--primary-color);
        }
        
        .notification-error {
            border-left-color: #dc3545;
        }
        
        .notification-error i {
            color: #dc3545;
        }
        
        .notification i {
            font-size: 1.2rem;
        }
        
        .notification span {
            font-weight: 500;
            color: #333;
        }
        
        .field-error {
            color: #dc3545;
            font-size: 0.8rem;
            margin-top: 4px;
        }
        
        .form-control.error {
            border-color: #dc3545;
        }
    `;
    
    // Inject notification styles
    $('<style>').text(notificationStyles).appendTo('head');
    
    // Initialize payment method display
    if ($('input[name="payment"]:checked').val() === 'card') {
        $('#card-info').show();
    } else {
        $('#card-info').hide();
    }
});
