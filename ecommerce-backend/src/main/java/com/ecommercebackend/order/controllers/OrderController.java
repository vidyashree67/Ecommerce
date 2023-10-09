package com.ecommercebackend.order.controllers;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommercebackend.address.entities.Address;
import com.ecommercebackend.address.services.AddressService;
import com.ecommercebackend.authentication.customer.entities.Customer;
import com.ecommercebackend.authentication.customer.services.CustomerService;
import com.ecommercebackend.cart.dtos.CartDTO;
import com.ecommercebackend.order.dtos.OrderDetailsDTO;
import com.ecommercebackend.order.dtos.OrderResponseDTO;
import com.ecommercebackend.order.dtos.PlaceOrderDTO;
import com.ecommercebackend.order.entities.Order;
import com.ecommercebackend.order.entities.OrderDetails;
import com.ecommercebackend.order.services.OrderService;
import com.ecommercebackend.order.services.OrderDetailService;
import com.ecommercebackend.payment.entities.Payment;
import com.ecommercebackend.payment.services.PaymentService;
import com.ecommercebackend.product.entities.Product;
import com.ecommercebackend.product.services.ProductService;
import com.ecommercebackend.utils.Response;

/**
 * Controller class for managing order-related operations.
 */
@CrossOrigin
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    OrderService orderService;

    @Autowired
    CustomerService customerService;

    @Autowired
    AddressService addressService;

    @Autowired
    PaymentService paymentService;

    @Autowired
    OrderDetailService orderDetailsService;

    @Autowired
    ProductService productService;

    /**
     * Endpoint for placing an order.
     *
     * @param placeOrderDto The data for placing an order.
     * @return ResponseEntity indicating the result of the order placement.
     */
    @PostMapping("/placeOrder")
    public ResponseEntity<?> saveOrder(@RequestBody PlaceOrderDTO placeOrderDto) {
    	
        // Save the address associated with the order
        Address address = addressService.saveAddress(placeOrderDto.getAddress());

        // Create and configure the order
        Order order = new Order();
        order.setOrderDate(new Date());
        order.setAddress(address);

        // Find the customer and set it for the order
        Customer customer = customerService.findCustomerById(placeOrderDto.getCustomerId());
        order.setCustomer(customer);

        // Find the payment and set it for the order
        Payment payment = paymentService.findPaymentByPaymentId(placeOrderDto.getPaymentId());
        order.setPayment(payment);

        // Save the order
        Order savedOrder = orderService.saveOrder(order);

        Product product = null;
        
        @SuppressWarnings("unused")
		int quantity = 0;

        // Save order details for each item in the cart
        for (CartDTO cart : placeOrderDto.getCart()) {
            OrderDetails orderDetails = new OrderDetails();
            orderDetails.setOrder(savedOrder);
            orderDetails.setQuantity(cart.getQuantity());

            // Find the product and set it for the order details
            product = productService.findProductById(cart.getProductId());
            orderDetails.setProduct(product);
            orderDetailsService.saveOrderDetails(orderDetails);
        }

        // Return a successful response
        return Response.status(HttpStatus.OK);
    }

    /**
     * Endpoint for listing all orders.
     *
     * @param customerId Optional parameter for filtering orders by customer ID.
     * @return ResponseEntity containing a list of orders.
     */
    @GetMapping
    public ResponseEntity<?> listAllOrders(Optional<Integer> customerId) {
        List<Order> result = null;
        if (customerId.isPresent()) {
            // Find the customer and list orders associated with the customer
            Customer customer = customerService.findCustomerById(customerId.get());
            result = orderService.listCustomerOrders(customer);
        } else {
            // List all orders
            result = orderService.listAllOrders();
        }

        // Return a successful response
        return Response.success(result);
    }

    /**
     * Endpoint for retrieving an order by ID.
     *
     * @param id The ID of the order.
     * @return ResponseEntity containing the order details and order items.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> findOrderById(@PathVariable int id) {
    	
        // Find the order by ID
        Order order = orderService.findOrderById(id);

        // Find order details and map to DTOs
        List<OrderDetails> details = orderDetailsService.findByOrder(order);
        List<OrderDetailsDTO> orderDetailsDto = new ArrayList<OrderDetailsDTO>();
        details.forEach(orderDetails -> {
            OrderDetailsDTO dto = OrderDetailsDTO.fromEntity(orderDetails);
            orderDetailsDto.add(dto);
        });

        // Create an OrderResponseDTO containing order and order details
        OrderResponseDTO result = new OrderResponseDTO();
        result.setOrder(order);
        result.setOrderDetails(orderDetailsDto);

        // Return a successful response
        return Response.success(result);
    }

}
