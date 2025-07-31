$(document).ready(function(){


    $.ajax({
        url: 'https://dummyjson.com/products',
        method: 'GET',
        success: function(response) {
            response.products.forEach(function(product) {
                var card = `<div class="card" style="width: 18rem; margin: 9px 22px;">
                    <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">Price $${product.price}</p>
                        <button class="btn btn-primary buy-btn" 
                            data-product='${JSON.stringify(product)}'>buy</button>
                    </div>
                </div>`;
                $('#cont').append(card);
            });
        }
    });

    $(document).on('click', '.buy-btn', function(){
        var product = $(this).data('product');
        var basket = JSON.parse(localStorage.getItem('basket')) || [];
        var exists = basket.some(function(item) {
            return item.id === product.id;
        });
        if (!exists) {
            basket.push(product);
            localStorage.setItem('basket', JSON.stringify(basket));
        }
        $('#basket-count').text(basket.length);
    });

    var basket = JSON.parse(localStorage.getItem('basket')) || [];
    $('#basket-count').text(basket.length);

    $(document).ready(function(){
    if (window.location.pathname.includes('basket.html')) {
        var basket = JSON.parse(localStorage.getItem('basket')) || [];
        var tbody = '';
        basket.forEach(function(product, index) {
            tbody += `<tr>
                        <th scope="row">${index + 1}</th>
                        <td>${product.title}</td>
                        <td>$${product.price}</td>
                      </tr>`;
        });
        $('.table tbody').html(tbody);
    }
});

});

