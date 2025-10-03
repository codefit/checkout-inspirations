$(document).ready(function() {
    // Initialize checkout functionality
    initializeCheckout();
    
    function initializeCheckout() {
        // Handle clickable sections
        $('.clickable-section').on('click', function(e) {
            e.preventDefault();
            const widgetId = $(this).data('overlay');
            showWidget(widgetId);
        });
        
        // Handle widget close buttons
        $('.btn-close-widget').on('click', function() {
            hideWidget();
        });
        
        // Handle ESC key to close widget
        $(document).on('keydown', function(e) {
            if (e.key === 'Escape' && $('.widget-container.active').length > 0) {
                hideWidget();
            }
        });
        
        // Handle option selections in widgets
        handleOptionSelections();
        
        // Handle form submissions in widgets
        handleFormSubmissions();
        
        // Handle terms agreement checkbox
        handleTermsAgreement();
    }
    
    function showWidget(widgetId) {
        // Hide all widgets first
        $('.widget-container').removeClass('active slide-out');
        
        // Show the specific widget
        const widget = $('#' + widgetId + '-widget');
        if (widget.length) {
            // Add active class - this will trigger the slide-in animation
            widget.addClass('active');
            
            // Focus on first input if available
            const firstInput = widget.find('input, textarea').first();
            if (firstInput.length) {
                setTimeout(() => {
                    firstInput.focus();
                }, 400);
            }
        }
    }
    
    function hideWidget() {
        // Add slide-out class for slideOutLeft animation
        $('.widget-container.active').addClass('slide-out');
        
        // Remove active class after animation completes
        setTimeout(() => {
            $('.widget-container').removeClass('active slide-out');
        }, 400);
    }
    
    function handleOptionSelections() {
        // Country options
        $('.country-option').on('click', function() {
            $('.country-option').removeClass('active');
            $(this).addClass('active');
            
            // Update the main display
            const countryText = $(this).find('span:first').text();
            const currencyText = $(this).find('span:last').text();
            $('.info-section[data-overlay="country"] .info-value').text(countryText + '. ' + currencyText);
            
            // Close widget after short delay
            setTimeout(() => {
                hideWidget();
            }, 500);
        });
        
        // Delivery options
        $('.delivery-option-card').on('click', function() {
            $('.delivery-option-card').removeClass('active');
            $(this).addClass('active');
            
            // Update the main display
            const deliveryName = $(this).find('h4').text();
            const deliveryDesc = $(this).find('p').text();
            const deliveryPrice = $(this).find('.price').text();
            
            $('.delivery-option h4').text(deliveryName);
            $('.delivery-option p').text(deliveryDesc);
            $('.delivery-section .section-header .price').text(deliveryPrice);
            
            // Update total price
            updateTotalPrice();
        });
        
        // Payment options
        $('.payment-option-card').on('click', function() {
            $('.payment-option-card').removeClass('active');
            $(this).addClass('active');
            
            // Update the main display
            const paymentName = $(this).find('h4').text();
            const paymentDesc = $(this).find('p').text();
            const paymentPrice = $(this).find('.price').text();
            
            $('.payment-option h4').text(paymentName);
            $('.payment-option p').text(paymentDesc);
            $('.payment-section .section-header .price').text(paymentPrice);
            
            // Update total price
            updateTotalPrice();
        });
    }
    
    function handleFormSubmissions() {
        // Email form
        $('#email-widget .btn-primary').on('click', function() {
            const email = $('#email-input').val();
            if (email && isValidEmail(email)) {
                $('.info-section[data-overlay="email"] input').val(email);
                hideWidget();
                showNotification('Email byl uložen', 'success');
            } else {
                showNotification('Zadejte platný email', 'error');
            }
        });
        
        // Mobile form
        $('#mobile-widget .btn-primary').on('click', function() {
            const mobile = $('#mobile-input').val();
            if (mobile && mobile.length >= 9) {
                $('.info-section[data-overlay="mobile"] input').val(mobile);
                hideWidget();
                showNotification('Telefon byl uložen', 'success');
            } else {
                showNotification('Zadejte platné telefonní číslo', 'error');
            }
        });
        
        // Address form
        $('#address-widget .btn-primary').on('click', function() {
            const street = $('#street').val();
            const city = $('#city').val();
            const zip = $('#zip').val();
            
            if (street && city && zip) {
                const address = `${street}, ${zip} ${city}`;
                $('.info-section[data-overlay="address"] .btn').text('Upravit');
                $('.info-section[data-overlay="address"] .info-value').text(address);
                hideWidget();
                showNotification('Adresa byla uložena', 'success');
            } else {
                showNotification('Vyplňte všechna pole', 'error');
            }
        });
        
        // Discount form
        $('#discount-widget .btn-primary').on('click', function() {
            const discountCode = $('#discount-code').val();
            if (discountCode) {
                // Simulate discount application
                applyDiscount(discountCode);
                hideWidget();
                showNotification('Slevový kód byl aplikován', 'success');
            } else {
                showNotification('Zadejte slevový kód', 'error');
            }
        });
        
        // Note form
        $('#note-widget .btn-primary').on('click', function() {
            const note = $('#order-note').val();
            if (note) {
                $('.note-section .info-value').text(note.substring(0, 50) + (note.length > 50 ? '...' : ''));
                hideWidget();
                showNotification('Poznámka byla uložena', 'success');
            } else {
                hideWidget();
            }
        });
        
        // Delivery widget select button
        $('#delivery-widget .btn-primary').on('click', function() {
            const activeOption = $('#delivery-widget .delivery-option-card.active');
            if (activeOption.length) {
                const deliveryName = activeOption.find('h4').text();
                const deliveryDesc = activeOption.find('p').text();
                const deliveryPrice = activeOption.find('.price').text();
                
                // Update main delivery section
                $('.delivery-option h4').text(deliveryName);
                $('.delivery-option p').text(deliveryDesc);
                $('.delivery-section .section-header .price').text(deliveryPrice);
                
                // Update total price
                updateTotalPrice();
                
                hideWidget();
                showNotification('Způsob dopravy byl vybrán', 'success');
            }
        });
        
        // Payment widget select button
        $('#payment-widget .btn-primary').on('click', function() {
            const activeOption = $('#payment-widget .payment-option-card.active');
            if (activeOption.length) {
                const paymentName = activeOption.find('h4').text();
                const paymentDesc = activeOption.find('p').text();
                const paymentPrice = activeOption.find('.price').text();
                
                // Update main payment section
                $('.payment-option h4').text(paymentName);
                $('.payment-option p').text(paymentDesc);
                $('.payment-section .section-header .price').text(paymentPrice);
                
                // Update total price
                updateTotalPrice();
                
                hideWidget();
                showNotification('Způsob platby byl vybrán', 'success');
            }
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function applyDiscount(code) {
        // Simulate discount logic
        let discountAmount = 0;
        
        switch(code.toLowerCase()) {
            case 'welcome10':
                discountAmount = 44.5; // 10% of 445
                break;
            case 'newuser':
                discountAmount = 50;
                break;
            case 'free':
                discountAmount = 95; // Free shipping
                break;
            default:
                showNotification('Neplatný slevový kód', 'error');
                return;
        }
        
        // Update discount section
        $('.discount-section .info-value').text(`Aplikován kód: ${code.toUpperCase()}`);
        
        // Update total price
        updateTotalPrice(discountAmount);
    }
    
    function updateTotalPrice(discount = 0) {
        const productPrice = 350;
        const shippingPrice = 95;
        const total = productPrice + shippingPrice - discount;
        
        $('.summary-total span:last').text(total + ' Kč');
        
        // Update order button text if discount applied
        if (discount > 0) {
            $('.btn-order').text(`Objednávka zavazující k platbě (sleva ${discount} Kč)`);
        } else {
            $('.btn-order').text('Objednávka zavazující k platbě');
        }
    }
    
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = $(`
            <div class="notification notification-${type}">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
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
    
    function handleTermsAgreement() {
        // Handle checkbox change
        $('#terms-agreement').on('change', function() {
            const isChecked = $(this).is(':checked');
            const orderButton = $('.btn-order');
            
            if (isChecked) {
                orderButton.prop('disabled', false);
            } else {
                orderButton.prop('disabled', true);
            }
        });
    }
    
    // Handle order button click
    $('.btn-order').on('click', function() {
        // Validate required fields
        const email = $('.info-section[data-overlay="email"] input').val();
        const mobile = $('.info-section[data-overlay="mobile"] input').val();
        const address = $('.info-section[data-overlay="address"] .info-value').text();
        const termsAgreed = $('#terms-agreement').is(':checked');
        
        if (!email || !isValidEmail(email)) {
            showNotification('Zadejte platný email', 'error');
            $('.info-section[data-overlay="email"]').click();
            return;
        }
        
        if (!mobile || mobile.length < 9) {
            showNotification('Zadejte platné telefonní číslo', 'error');
            $('.info-section[data-overlay="mobile"]').click();
            return;
        }
        
        if (!address || address === 'Vyplnit') {
            showNotification('Vyplňte dodací adresu', 'error');
            $('.info-section[data-overlay="address"]').click();
            return;
        }
        
        if (!termsAgreed) {
            showNotification('Musíte souhlasit s obchodními podmínkami', 'error');
            return;
        }
        
        // Simulate order processing
        $(this).prop('disabled', true).text('Zpracovává se...');
        
        setTimeout(() => {
            showNotification('Objednávka byla úspěšně odeslána!', 'success');
            $(this).prop('disabled', false).text('Objednávka zavazující k platbě');
        }, 2000);
    });
    
    // Smooth scrolling for center section
    $('.center-section').on('scroll', function() {
        // Add any scroll-based functionality here if needed
    });
    
    // Handle responsive behavior
    $(window).on('resize', function() {
        // Adjust layout for mobile/tablet
        if ($(window).width() <= 992) {
            $('.left-section').removeClass('position-fixed');
            $('.right-section').removeClass('position-fixed');
        } else {
            $('.left-section').addClass('position-fixed');
            $('.right-section').addClass('position-fixed');
        }
    });
    
    // Initialize mobile layout check
    $(window).trigger('resize');
});

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
        border-left: 4px solid #007bff;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        border-left-color: #28a745;
    }
    
    .notification-success i {
        color: #28a745;
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
`;

// Inject notification styles
$('<style>').text(notificationStyles).appendTo('head');
