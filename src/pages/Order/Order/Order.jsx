import orderCover from "../../../assets/shop/order.jpg";
import Cover from "../../Shared/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useState } from "react";
import useMenu from "../../../hooks/useMenu";
import OrderTab from "../OrderTab/OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import BackendTest from "../../../components/BackendTest/BackendTest";

const Order = () => {
  const catagories = ["offered", "dessert", "pizza", "salad", "soup", "drinks"];
  const { category } = useParams();
  const initialIndex = catagories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [menu, loading, refetch, error] = useMenu();
  
  const offered = menu.filter((item) => item.category === "offered");
  const desserts = menu.filter((item) => item.category === "dessert");
  const pizza = menu.filter((item) => item.category === "pizza");
  const salad = menu.filter((item) => item.category === "salad");
  const soup = menu.filter((item) => item.category === "soup");
  const drinks = menu.filter((item) => item.category === "drinks");

  if (loading) {
    return (
      <div>
        <Cover img={orderCover} title="Order"></Cover>
        <div className="flex justify-center items-center min-h-[400px]">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  if (error) {
    const errorMessage = error.message || 'Failed to connect to backend';
    const isNetworkError = error.code === 'ERR_NETWORK' || errorMessage.includes('Network Error');
    
    return (
      <div>
        <Cover img={orderCover} title="Order"></Cover>
        <div className="text-center py-12 px-4">
          <p className="text-red-500 mb-2 font-bold text-lg">Error loading menu</p>
          <p className="text-red-500 mb-4">{errorMessage}</p>
          {isNetworkError && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4 max-w-2xl mx-auto">
              <p className="font-semibold mb-2">Network Error - Possible causes:</p>
              <ul className="text-left list-disc list-inside space-y-1">
                <li>Backend server is not running</li>
                <li>Backend URL is incorrect</li>
                <li>CORS configuration issue</li>
                <li>Backend endpoint doesn't exist</li>
              </ul>
              <p className="mt-2 text-sm mb-4">
                Check browser console (F12) for detailed error information.
              </p>
              <BackendTest />
            </div>
          )}
          <button onClick={() => refetch()} className="btn btn-primary">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Order Food</title>
      </Helmet>
      <Cover img={orderCover} title="Order"></Cover>
      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Offered</Tab>
          <Tab>Deserts</Tab>
          <Tab>Pizza</Tab>
          <Tab>Salad</Tab>
          <Tab>Soup</Tab>
          <Tab>Drinks</Tab>
        </TabList>
        <TabPanel>
          <OrderTab items={offered}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={desserts}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={pizza}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={salad}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={soup}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={drinks}></OrderTab>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;
