import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routerList from "../configs/router";
import { ReactNode } from "react";

interface RouterProviderProps {
  children?: ReactNode;
}

const RouterProvider = ({ children }: RouterProviderProps) => {
  return (
    <Router>
      {children}
      <Routes>
        {routerList.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Router>
  );
};

export default RouterProvider;
