

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Cars, { loader as carsLoader } from "./pages/Cars/Cars"
import CarDetails, { loader as carDetailsLoader } from "./pages/Cars/CarDetails"
import Dashboard, { loader as dashboardLoader } from "./pages/Host/Dashboard"
import Income from "./pages/Host/Income"
import Reviews from "./pages/Host/Reviews"
import HostCars, { loader as hostCarsLoader} from "./pages/Host/HostCars"
import HostCarDetails, { loader as hostCarDetailsLoader } from "./pages/Host/HostCarDetails"
import HostCarInfo from "./pages/Host/HostCarInfo"
import HostCarPricing from "./pages/Host/HostCarPricing"
import HostCarPhotos from "./pages/Host/HostCarPhotos"
import NotFound from "./pages/NotFound"
import Login, { loader as loginLoader, action as loginAction } from "./pages/Login"
import Layout from "./components/Layout"
import HostLayout from "./components/HostLayout"
import Error from "./components/error"
import { requireAuth } from "./utils"

import "./server"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route
      path="login"
      element={<Login />}
      loader={loginLoader}
      action={loginAction}
    />
    <Route
      path="cars"
      element={<Cars />}
      errorElement={<Error />}
      loader={carsLoader}
    />
    <Route 
      path="cars/:id" 
      element={<CarDetails />} 
      errorElement={<Error />}
      loader={carDetailsLoader}
    />

    <Route path="host" element={<HostLayout />}>
      <Route
        index
        element={<Dashboard />}
        loader={dashboardLoader}
      />
      <Route
        path="income"
        element={<Income />}
        loader={async ({ request }) => await requireAuth(request)}
      />
      <Route
        path="reviews"
        element={<Reviews />}
        loader={async ({ request }) => await requireAuth(request)}
      />
      <Route
        path="cars"
        element={<HostCars />}
        errorElement={<Error />}
        loader={hostCarsLoader}
      />
      <Route
        path="cars/:id"
        element={<HostCarDetails />}
        errorElement={<Error />}
        loader={hostCarDetailsLoader}
      >
        <Route
          index
          element={<HostCarInfo />}
          loader={async ({ request }) => await requireAuth(request)}
        />
        <Route
          path="pricing"
          element={<HostCarPricing />}
          loader={async ({ request }) => await requireAuth(request)}
        />
        <Route
          path="photos"
          element={<HostCarPhotos />}
          loader={async ({ request }) => await requireAuth(request)}
        />
      </Route>
    </Route>
    <Route path="*" element={<NotFound />} />
  </Route>
))

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}

