import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const useURL = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { pathname } = location;

  const navigateBack = () => {
    navigate(`${pathname}`);
  };

  const navigateTo = (route: string) => {
    navigate(`${pathname}/${route}`);
  };

  const updateURL = (payload: string) => {
    navigate(`${pathname}?${payload}`);
  };

  const reload = () => {
    navigate(`${pathname}`);
    navigate(0);
  };

  return {
    queryParams: searchParams,
    baseRoute: pathname,
    navigateBack,
    navigateTo,
    updateURL,
    reload,
  };
};

export default useURL;
