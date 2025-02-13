import { ReactNode, Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import LoadingSpinner from "../../components/LoadingSpinner";
import PageLayout from "../../layouts/PageLayout";
import MarketsList from "../../pages/MarketsList";
import MarketDetailsContainer from "../../containers/MarketDetailsContainer";

const withLayout = (component: ReactNode) => (
  <ErrorBoundary>
    <Suspense fallback={<LoadingSpinner />}>
      <PageLayout>{component}</PageLayout>
    </Suspense>
  </ErrorBoundary>
);

const routerList = [
  {
    path: "/",
    element: withLayout(<MarketsList />),
  },
  {
    path: "/market/:id",
    element: withLayout(<MarketDetailsContainer />),
  },
];

export default routerList;
