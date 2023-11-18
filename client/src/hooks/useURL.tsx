import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const useURL = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { pathname } = location;

  const navigateBack = (route?: string) => {
    navigate(`${pathname}?${route}`);
  };

  const navigateTo = (route: string) => {
    navigate(`${pathname}/${route}`);
  };

  const updateURL = (path: string) => {
    if (path === "/") {
      navigate(`${pathname}`);
      return;
    }
    navigate(`${pathname}?${path}`);
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
