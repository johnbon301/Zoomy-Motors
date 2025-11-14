const CreateForm = ({ customer, backendURL, refresh}) => {

    return(
        <>
        <h2>Create a Customer</h2>

        <form classNmae='cuForm'>
            <label htmlFor="create_customer_fname">First Name: </label>
            <input
                type="text"
                name="create_customer_fname"
                id="create_customer_fname"
            />
            <label htmlFor="create_customer_lname">Last Name: </label>
            <input
                type="text"
                name="create_customer_lname"
                id="create_customer_lname"
            />
            <label htmlFor="create_customer_email">Email: </label>
            <input
                type="text"
                name="create_customer_email"
                id="create_customer_email"
            />
            <label htmlFor="create_customer_phone">Phone: </label>
            <input
                type="number"
                name="create_customer_phone"
                id="create_customer_phone"
            />            
            <label htmlFor="create_customer_address">Address: </label>
            <input
                type="text"
                name="create_customer_address"
                id="create_customer_address"
            />            
            <label htmlFor="create_customer_credscore">Credit Score: </label>
            <input
                type="number"
                name="create_customer_credscore"
                id="create_customer_credscore"
            />
            <input type="submit" />
        </form>
        </>
    );

};

export default CreateForm;