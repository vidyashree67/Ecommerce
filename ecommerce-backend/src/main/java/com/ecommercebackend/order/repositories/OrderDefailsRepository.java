package	com.ecommercebackend.order.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommercebackend.order.entities.Order;
import com.ecommercebackend.order.entities.OrderDetails;

/**
 * Repository interface for managing OrderDetails entities in the database.
 */
public interface OrderDefailsRepository extends JpaRepository<OrderDetails, Integer> {
	
	/**
     * Find a list of OrderDetails entities associated with a specific Order.
     * 
     * @param order The Order entity to search for.
     * @return A list of OrderDetails entities associated with the specified Order.
     */
	List<OrderDetails> findByOrder(Order order);
	
}
