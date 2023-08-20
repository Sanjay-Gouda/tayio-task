import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import ContactList from "./components/Contacts/contacts-list";
import ContactForm from "./components/Contacts/contact-form";
import { Route, Routes } from "react-router";
import { Provider } from "react-redux";
import store from "./utils/store";
import EdiContactForm from "./components/Contacts/edit-contact-form";
import LineChart from "./components/Chart/line-chart";
import LeafletMap from "./components/Chart/leaflat-map";
import { QueryClient, QueryClientProvider } from "react-query";
import ViewForm from "./components/Contacts/view-form";

const queryClient = new QueryClient();
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Sidebar>
          <Provider store={store}>
            <Routes>
              <Route path="/" element={<ContactList />} />
              <Route path="/contact-form" element={<ContactForm />} />
              <Route path="/contact-form/:id" element={<EdiContactForm />} />
              <Route path="/contact-view-form/:id" element={<ViewForm />} />
              <Route path="/line-chart" element={<LineChart />} />
              <Route path="/leaflet-map" element={<LeafletMap />} />
            </Routes>
          </Provider>

          {/* <ContactForm /> */}
        </Sidebar>
      </QueryClientProvider>
    </div>
  );
}

export default App;
