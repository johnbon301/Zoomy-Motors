const UpdateForm = ({ customer, backendURL, refresh}) => {

    return(
        <>
        <h2>Update a Customer</h2>

        <form classNmae='cuForm'>
            <label htmlFor="update_person_id">Person to Update: </label>
            <select
                name="update_person_id"
                id="update_person_id"
            >
                <option value="">Select a Person</option>
                {customer.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                        {customer.id} - {customer.fname} {customer.lname}
                    </option>
                ))}
            </select>

            <label htmlFor="update_customer_email">Email: </label>
            <input
                type="text"
                name="update_customer_email"
                id="update_customer_email"
            />
            <label htmlFor="update_customer_phone">Phone: </label>
            <input
                type="number"
                name="update_customer_phone"
                id="update_customer_phone"
            />            
            <label htmlFor="update_customer_address">Address: </label>
            <input
                type="text"
                name="update_customer_address"
                id="update_customer_address"
            />            
            <label htmlFor="update_customer_credscore">Credit Score: </label>
            <input
                type="number"
                name="update_customer_credscore"
                id="update_customer_credscore"
            />
            <input type="submit" />
        </form>
        </>
    );

};

export default UpdateForm;