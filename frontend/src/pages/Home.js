import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIUrl, handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import ExpenseTable from "../components/ExpenseTable";
import ExpenseDetails from "../components/ExpenseDetails";
import ExpenseForm from "../components/ExpenseForm";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [incomeAmt, setIncomeAmt] = useState(0);
  const [expenseAmt, setExpenseAmt] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Loggedout");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  useEffect(() => {
    const amounts = expenses.map((item) => item.amount);
    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => (acc += item), 0);
    const exp =
      amounts
        .filter((item) => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1;
    setIncomeAmt(income);
    setExpenseAmt(exp);
  }, [expenses]);

  const deleteExpens = async (id) => {
    try {
      const url = `${APIUrl}/expenses/${id}`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        method: "DELETE",
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      const result = await response.json();
      handleSuccess(result?.message);
      console.log("--result", result.data);
      setExpenses(result.data);
    } catch (err) {
      handleError(err);
    }
  };

  const fetchExpenses = async () => {
    try {
      const url = `${APIUrl}/expenses`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      const result = await response.json();
      console.log("--result", result.data);
      setExpenses(result.data);
    } catch (err) {
      handleError(err);
    }
  };

  const addTransaction = async (data) => {
    try {
      const url = `${APIUrl}/expenses`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      const result = await response.json();
      handleSuccess(result?.message);
      console.log("--result", result.data);
      setExpenses(result.data);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div>
      <div className="user-section">
        <h1>Welcome {loggedInUser}</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <ExpenseDetails incomeAmt={incomeAmt} expenseAmt={expenseAmt} />

      <ExpenseForm addTransaction={addTransaction} />

      <ExpenseTable expenses={expenses} deleteExpens={deleteExpens} />
      <ToastContainer />
    </div>
  );
}

export default Home;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import { handleError, handleSuccess } from "../utils";
// import ExpenseTable from "../components/ExpenseTable";

// export const Home = () => {
//   const navigate = useNavigate();
//   const [loggedInUser, setLoggedInUser] = useState("");
//   const [expenses, setExpenses] = useState([]);

//   useEffect(() => {
//     setLoggedInUser(localStorage.getItem("loggedInUser"));
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("loggedInUser");
//     handleSuccess("User LoggedOut");
//     setTimeout(() => {
//       navigate("/login");
//     }, 1000);
//   };
//   const fetchExpenses = async () => {
//     try {
//       const url = "http://localhost:5000/expenses";
//       const headers = {
//         headers: { Authorization: localStorage.getItem("token") },
//       };
//       const response = await fetch(url, headers);
//       const result = await response.json();
//       setExpenses(result.data);
//       console.log(result.data);
//     } catch (error) {
//       handleError(error);
//     }
//   };

//   useEffect(() => {
//     fetchExpenses();
//   }, []);

//   return (
//     <div>
//       <div className="user-section">
//         <h1>Welcome {loggedInUser}</h1>
//         <button onClick={handleLogout}>Logout</button>
//       </div>
//       <ExpenseTable expenses={expenses} />

//       <ToastContainer />
//     </div>
//   );
// };
