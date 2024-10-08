import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import { ResultsProvider } from "./contexts/ResultsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { FilterProvider } from "./contexts/FilterContext";
import Results from "./components/Results";
import Form from "./components/Form";
import Test from "./components/test";
import SettingsForm from "./components/Filter/SettingsForm";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          className:
            "text-source-greenHover dark:bg-source-green dark:text-green-100",
        }}
      />
      <Router>
        <FilterProvider>
          <ResultsProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Navigate replace to="Results" />} />
                <Route path="test" element={<Form />} />
                <Route path="results" element={<Results />} />
                <Route path="dashboard" element={<SettingsForm />} />
                <Route path="settings" element={<Test />} />
                {/* <Route path="settings" element={<AddPlaceForm />} /> */}
              </Route>
            </Routes>
          </ResultsProvider>
        </FilterProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
