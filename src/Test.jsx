import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useReducer,
} from "react";

// useContext
const CarContext = React.createContext();

const ADD_CAR = "ADD_CAR";

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_CAR:
      return { ...state, cars: [...state.cars, action.payload] };
    default:
      return state;
  }
};

const addCar = (dispatch, newCar) => {
  dispatch({ type: ADD_CAR, payload: newCar });
};

function Test() {
  // xử lý hành động thêm xe
  const [state, dispatch] = useReducer(reducer, {
    cars: [],
  });

  const handleAddCar = () => {
    const newCar = {
      brand: "Toyota",
      model: "Camry",
      year: "2022",
      color: "white",
    };
    addCar(dispatch, newCar);
  };

  //   useState
  const [car, setCar] = useState({
    brand: "Ford",
    model: "Mustang",
    year: "1999",
    color: "red",
  });

  const countRef = useRef(0);

  //   const [count, setCount] = useState(0);
  const [color, setColor] = useState(true);

  //Cập nhật màu sắc
  const updateColor = () => {
    if (color) {
      setCar((previousState) => {
        return {
          ...previousState,
          color: "blue",
        };
      });
    } else {
      setCar((previousState) => {
        return { ...previousState, color: "red" };
      });
    }
    setColor(!color);
    countRef.current = countRef.current + 1;
  };

  // useEffect
  // Cập nhật title trang và màu chữ dựa trên màu car khi chuyển đổi
  useEffect(() => {
    document.title = `My ${car.color} ${car.brand}`;
    if (car.color === "red") {
      document.body.style.color = "#ea6565";
    } else {
      document.body.style.color = "#723aeb";
    }
  }, [car]);

  return (
    // Giá trị Context là đối tượng 'car', 'count'
    <CarContext.Provider
      value={{ car, count: countRef.current, cars: state.cars }}
    >
      <h1>My favorite color is {car.color}</h1>
      {/* sử dụng setColor để cập nhật trạng thái color
      <button type="button" onClick={() => setColor("blue")}>
        Blue
      </button> */}
      <h1>My {car.brand}</h1>
      <p>
        It is a {car.color} {car.model} from {car.year}
      </p>

      <button type="button" onClick={updateColor}>
        {color ? "Blue" : "Red"}
      </button>

      <button type="button" onClick={handleAddCar}>
        Add Car
      </button>

      <ul>
        {state.cars.map((car, index) => (
          <li key={index}>
            {car.brand} {car.model}, Year: {car.year}, Color: {car.color}
          </li>
        ))}
      </ul>
      <Test1 />
    </CarContext.Provider>
  );
}
// Truy cập giá trị 'car' từ component cha(Test) vào component con(Test1)
function Test1() {
  const { car, count } = useContext(CarContext);
  return (
    <>
      <h2>{`My favorite color is ${car.color} again!`}</h2>
      <h3>{`Số lần đổi màu: ${count}`}</h3>
    </>
  );
}

export default Test;
