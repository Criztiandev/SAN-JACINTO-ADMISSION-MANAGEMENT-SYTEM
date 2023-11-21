import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const useURL = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { pathname } = location;

  const redirect = (path: string) => {
    navigate(path);
  };

  const navigateBack = (route?: string) => {
    navigate(`${pathname}?${route}`);
  };

  const navigateTo = (route: string, parent?: boolean) => {
    return parent ? navigate(`${pathname}/${route}`) : navigate(`${route}`);
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
    redirect,
    navigateBack,
    navigateTo,
    updateURL,
    reload,
  };
};

export default useURL;
