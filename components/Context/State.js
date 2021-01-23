import React, { useState } from "react";
import axios from "../axios-orders";

const BurgerContext = React.createContext();

const INGREDIENT_PRICES = {
  salad: 1000,
  becon: 1500,
  cheese: 1500,
  meat: 2500,
};

const initialState = {
  ingredients: {
    salad: 0,
    becon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 0,
  purchasing: false,
  ingredientNames: {
    salad: "Салад",
    becon: "Бэкон",
    cheese: "Бяслага",
    meat: "Үхрийн мах",
  },
  saving: false,
  finished: false,
  error: null,
};

export const BurgerStore = (props) => {
  const [burger, setBurger] = useState(initialState);

  const sss = () => {
    setBurger({ ...burger, saving: !burger.saving });
  };

  const saveToFirebase = (newOrder, token) => {
    // starting to save...
    setBurger({ ...burger, saving: true });

    axios
      .post(`/orders.json?&auth=${token}`, newOrder)
      .then((response) => {
        // save success...
        setBurger({ ...burger, saving: false, finished: true, error: null });
      })
      .catch((error) => {
        // save error....
        setBurger({ ...burger, saving: false, finished: true, error });
      });
  };

  const clearOrder = () => {
    setBurger(initialState);
  };

  const addIngredient = (orts) => {
    setBurger({
      ...burger,
      ingredients: {
        ...burger.ingredients,
        [orts]: burger.ingredients[orts] + 1,
      },
      totalPrice: burger.totalPrice + INGREDIENT_PRICES[orts],
      purchasing: true,
    });
  };

  const removeIngredient = (orts) => {
    const newPrice = burger.totalPrice - INGREDIENT_PRICES[orts];
    setBurger({
      ...burger,
      ingredients: {
        ...burger.ingredients,
        [orts]: burger.ingredients[orts] - 1,
      },
      totalPrice: newPrice,
      purchasing: newPrice > 0,
    });
  };

  return (
    <BurgerContext.Provider
      value={{
        burger,
        addIngredient,
        removeIngredient,
        saveToFirebase,
        clearOrder,
        sss,
      }}
    >
      {props.children}
    </BurgerContext.Provider>
  );
};

export default BurgerContext;
