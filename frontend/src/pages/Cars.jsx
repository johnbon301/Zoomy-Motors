import { useState, useEffect } from "react";
import Navigation from "../components/Navigation"; // optional if you have a nav
import TableRow from "../components/TableRow";
import CreateForm from "../components/CreateForm";
import UpdateForm from "../components/UpdateForm";

function Cars({ backendURL }) {
  const [cars, setCars] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(`${backendURL}/api/cars`);
      const data = await response.json();
      setCars(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {/* Optional top navigation */}

      <main style={{ padding: 16 }}>
        <h1>Cars</h1>

        <section style={{ marginBottom: 24 }}>
          <h2>Inventory</h2>
          <table border="1" cellPadding="6" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {cars.length > 0
                  ? Object.keys(cars[0]).map((header) => <th key={header}>{header}</th>)
                  : <th>No data</th>
                }
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {cars.map((c) => (
                <TableRow
                  key={c.CarID ?? c.id}
                  rowObject={c}
                  idKey={"CarID"}
                  backendURL={backendURL}
                  endpoint={"/api/cars"}
                  refresh={getData}
                  showActions={true}
                />
              ))}
            </tbody>
          </table>
        </section>

        <section style={{ display: "flex", gap: 24 }}>
          <div style={{ flex: 1 }}>
            <CreateForm
              fields={[
                { name: "Model", label: "Model", type: "text", required: true },
                { name: "Year", label: "Year", type: "number" },
                { name: "Make", label: "Make", type: "text" },
                { name: "Price", label: "Price", type: "number" },
                { name: "Status", label: "Status", type: "text" },
                { name: "Stock", label: "Stock", type: "number" },
                { name: "Mileage", label: "Mileage", type: "text" },
                { name: "Color", label: "Color", type: "text" },
                { name: "Horsepower", label: "Horsepower", type: "text" }
              ]}
              endpoint={"/api/cars"}
              backendURL={backendURL}
              refresh={getData}
              title={"Create a Car"}
            />
          </div>

          <div style={{ flex: 1 }}>
            <UpdateForm
              records={cars}
              recordIdKey={"CarID"}
              recordDisplayKey={"Model"}
              fields={[
                { name: "Model", label: "Model", type: "text" },
                { name: "Year", label: "Year", type: "number" },
                { name: "Make", label: "Make", type: "text" },
                { name: "Price", label: "Price", type: "number" },
                { name: "Status", label: "Status", type: "text" },
                { name: "Stock", label: "Stock", type: "number" },
                { name: "Mileage", label: "Mileage", type: "text" },
                { name: "Color", label: "Color", type: "text" },
                { name: "Horsepower", label: "Horsepower", type: "text" }
              ]}
              endpoint={"/api/cars"}
              backendURL={backendURL}
              refresh={getData}
              title={"Update a Car"}
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default Cars;