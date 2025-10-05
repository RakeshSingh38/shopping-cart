import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../context/Cart";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

function Shoppingcart() {
    const { cartItems, setCartItems } = useContext(cartContext);
    const [shippingToggle, setShippingToggle] = useState(false);
    const [subTotal, setSubTotal] = useState(0);

    const handleSub = (productId) => {
        setCartItems((prev) =>
            prev.map((cur) =>
                cur.id === productId
                    ? {
                          ...cur,
                          quantity:
                              cur.quantity > 1
                                  ? cur.quantity - 1
                                  : cur.quantity,
                      }
                    : cur
            )
        );
    };

    const handleAdd = (productId) => {
        setCartItems((prev) =>
            prev.map((cur) =>
                cur.id === productId
                    ? { ...cur, quantity: cur.quantity + 1 }
                    : cur
            )
        );
    };

    const deleteHandle = (productId) => {
        setCartItems((prev) => prev.filter((cur) => cur.id !== productId));
    };

    const shippingHandle = () => {
        setShippingToggle(!shippingToggle);
    };

    const handleCheckout = async () => {
        try {
            const items = cartItems.map((item) => ({
                id: item.id,
                quantity: item.quantity,
            }));
            const totalAmount = cartItems.reduce(
                (sum, item) => sum + item.afterDiscountamt * item.quantity,
                0
            );
            const totalItems = cartItems.reduce(
                (sum, item) => sum + item.quantity,
                0
            );

            console.log(
                `Checkout: ${totalItems} items, Total: ₹${totalAmount}`
            );
            console.log("Cart Items:");
            cartItems.forEach((item, index) => {
                console.log(
                    `${index + 1}. ${item.name} - Qty: ${
                        item.quantity
                    } - Price: ₹${item.afterDiscountamt} - Subtotal: ₹${
                        item.afterDiscountamt * item.quantity
                    }`
                );
            });

            const response = await axios.post(API_ENDPOINTS.CHECKOUT, {
                items,
            });

            console.log(`${response.data.message} ✅`);
            alert(response.data.message);
            setCartItems([]);
        } catch (error) {
            console.error("❌ Checkout failed:", error.message);
            alert("Checkout failed. Please try again.");
        }
    };

    useEffect(() => {
        const total = cartItems.reduce(
            (acc, cur) => acc + cur.afterDiscountamt * cur.quantity,
            0
        );
        setSubTotal(total);
    }, [cartItems]);

    return (
        <div className="mt-[130px]" id="checkout-section">
            <h3 className="text-5xl font-medium text-center px-3">
                Shopping Cart
            </h3>
            <div className="text-xl text-center justify-center items-center flex gap-1 mt-2 cursor-pointer px-3">
                <Link to="/">Home</Link> /{" "}
                <span className="opacity-70"> Shopping Cart</span>
            </div>

            <div className="mt-16 w-full  flex-col-reverse flex gap-6 px-2 lg:flex-row lg:flex">
                <table className="w-full h-fit">
                    <thead>
                        <tr>
                            <th className="border-[#d6d5d5] border-solid border-[1px] py-6 px-4 text-xl text-left hidden lg:table-cell w-[400px]">
                                Items
                            </th>
                            <th className="border-[#d6d5d5] border-solid border-[1px] py-6 px-4 text-xl text-left hidden  lg:table-cell w-[120px]">
                                Price
                            </th>
                            <th className="border-[#d6d5d5]  border-solid border-[1px] py-6 px-4 text-xl text-left hidden  lg:table-cell">
                                Qty
                            </th>
                            <th className="border-[#d6d5d5]  border-solid border-[1px] py-6 px-4 text-xl text-left hidden w-[200px]  lg:table-cell">
                                Subtotal
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems &&
                            cartItems.map((cur) => (
                                <React.Fragment key={cur.id}>
                                    <tr>
                                        <td className="border-[#d6d5d5]  border-solid border-[1px] px-4 py-5 mt-4 ">
                                            <div className="flex gap-4 items-center">
                                                <div className="w-[100px] h-[130px] rounded-xl overflow-hidden cursor-pointer ">
                                                    <img
                                                        src={cur.productImage}
                                                        alt=""
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="">
                                                    <p className="text-xl w-[150px]  text-ellipsis whitespace-nowrap overflow-hidden">
                                                        {cur.name}
                                                    </p>
                                                    <div className="flex items-center gap-3 text-lg text-[#3f3e3e] mt-2">
                                                        <Link
                                                            to={`/products/${cur.id}`}
                                                        >
                                                            <i className="ri-pencil-line"></i>
                                                        </Link>
                                                        <i
                                                            className="ri-delete-bin-line cursor-pointer"
                                                            onClick={() =>
                                                                deleteHandle(
                                                                    cur.id
                                                                )
                                                            }
                                                        ></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="border-[#d6d5d5]  border-solid border-[1px] px-4 hidden  lg:table-cell">
                                            <p className="text-xl">
                                                ₹{cur.afterDiscountamt}
                                            </p>
                                        </td>
                                        <td className="border-[#d6d5d5]  border-solid border-[1px] px-4 hidden  lg:table-cell">
                                            <div className="flex gap-6 justify-center items-center text-xl bg-[rgb(242,242,242)] max-w-[150px] w-full overflow-hidden py-2 px-6 rounded-full shadow-md ">
                                                <i
                                                    className="ri-subtract-fill text-2xl cursor-pointer"
                                                    onClick={() =>
                                                        handleSub(cur.id)
                                                    }
                                                ></i>
                                                <p className="text-lg">
                                                    {cur.quantity}
                                                </p>
                                                <i
                                                    className="ri-add-line cursor-pointer"
                                                    onClick={() =>
                                                        handleAdd(cur.id)
                                                    }
                                                ></i>
                                            </div>
                                        </td>
                                        <td className="border-[#d6d5d5]  border-solid border-[1px] px-4 hidden  lg:table-cell">
                                            <p className="text-xl">
                                                ₹
                                                {cur.afterDiscountamt *
                                                    cur.quantity}
                                            </p>
                                        </td>
                                    </tr>
                                    <tr className="lg:hidden">
                                        <td
                                            colSpan="4"
                                            className="border-[#d6d5d5] border-solid border-[1px] p-0"
                                        >
                                            <div className="flex w-full overflow-hidden py-3">
                                                <div className="w-full flex justify-center items-center">
                                                    <p className="text-xl">
                                                        ₹{cur.afterDiscountamt}
                                                    </p>
                                                </div>
                                                <div className="w-full flex justify-center items-center">
                                                    <div className="flex gap-6 justify-center items-center text-xl bg-[rgb(242,242,242)] max-w-[150px] w-full py-2 px-2 rounded-full ">
                                                        <i
                                                            className="ri-subtract-fill text-xl cursor-pointer"
                                                            onClick={() =>
                                                                handleSub(
                                                                    cur.id
                                                                )
                                                            }
                                                        ></i>
                                                        <p>{cur.quantity}</p>
                                                        <i
                                                            className="ri-add-line cursor-pointer"
                                                            onClick={() =>
                                                                handleAdd(
                                                                    cur.id
                                                                )
                                                            }
                                                        ></i>
                                                    </div>
                                                </div>
                                                <div className="w-full flex justify-center items-center">
                                                    <p className="text-xl">
                                                        ₹
                                                        {cur.afterDiscountamt *
                                                            cur.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                    </tbody>
                </table>
                <div className=" w-full bg-[rgb(245,245,245)] py-10 px-3 rounded-lg h-fit select-none lg:max-w-[400px]">
                    <div className="h-1 w-full bg-[rgb(156,109,58)] rounded-full relative flex justify-center items-center">
                        <i className="ri-truck-line absolute w-[35px] h-[35px] flex justify-center items-center rounded-full border-[2px] border-solid border-[rgb(156,109,58)] -top-3 text-xl text-[rgb(156,109,58)] bg-white right-0"></i>
                    </div>
                    <p className="mt-4">
                        Congrats! You are eligible for{" "}
                        <b className="text-[rgb(156,109,58)]">FREE</b>
                    </p>
                    <b className="mt-4 text-lg text-[rgb(156,109,58)]">
                        SHIPPING!
                    </b>
                    <p className="mt-4 text-2xl">Summary</p>
                    <div>
                        <div
                            className="mt-8 flex cursor-pointer justify-between text-lg"
                            onClick={shippingHandle}
                        >
                            <p>Estimate Shipping and Tax</p>
                            <i
                                className={`ri-${
                                    shippingToggle ? "arrow-up" : "arrow-down"
                                }-s-line`}
                            ></i>
                        </div>
                        {shippingToggle ? (
                            <div>
                                <p className="mt-4 text-sm">
                                    Enter your destination to get a shipping
                                    estimate.
                                </p>
                                <div className="mt-8">
                                    <label htmlFor="state">
                                        State/Province
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-2 py-3 rounded-full border-solid border-[2px] mt-2 border-[grey]"
                                        placeholder="State"
                                        id="state"
                                    />
                                </div>
                            </div>
                        ) : null}
                        <div className="mt-8">
                            <table className="w-full bg-white ">
                                <tbody>
                                    <tr>
                                        <td className="border-[#aca9a9] border-solid border-[1px] px-4 py-3 opacity-90 w-[150px]">
                                            Subtotal
                                        </td>
                                        <td className="border-[#aca9a9] border-solid border-[1px] px-4 py-3 opacity-90">
                                            ₹{subTotal}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border-[#aca9a9] border-solid border-[1px] px-4 py-3 text-lg font-semibold">
                                            Order total
                                        </td>
                                        <td className="border-[#aca9a9] border-solid border-[1px] px-4 py-3 text-lg font-semibold">
                                            ₹{subTotal}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <button
                            className="px-[20px] mt-8 py-[10px]  border-solid border-[2px] border-black text-white rounded-full bg-black w-full font-semibold"
                            onClick={handleCheckout}
                        >
                            PROCEED TO CHECKOUT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shoppingcart;
