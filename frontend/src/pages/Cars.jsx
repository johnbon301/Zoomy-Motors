import { useState, useEffect} from "react";
import TableRow from "../components/TableRow";
import CreateForm from "../components/CreateForm";
import UpdateForm from "../components/UpdateForm";

function Cars({backendURL}) {

    const [car, setCar] = useState([]);
    const [customer, setCustomer] = useState([]);

    const getData = async function () {
        try {
            const resposne = await fetch(backendURL + '/cars');

            const {car, customer} = await response.json();

            setCar(car);
            setCustomer(customer);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1> Cars </h1>

            <table>
                <thead>
                    <tr>
                        {car.length > 0 && Object.keys(car[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {car.map((person, index) => (
                        <TableRow key={index} rowObject={car} backendURL={backendURL} refresh={getData}/>
                    ))}
                </tbody>
            </table>

            <CreateForm customers={customer} backendURL={backendURL} refresh={getData}/>
            <UpdateForm car={car} backendURL={backendURL} refresh={getData}/>
        </>
    );

}

export default Cars;
