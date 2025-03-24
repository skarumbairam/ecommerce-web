import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="md:flex min-h-screen w-full">
      <div className="flex items-center justify-items-center justify-center bg-black md:w-1/2 px-12 py-12 md:py-0">
        <div className="max-w-md text-center text-primary-foreground">
          <h1 className="text-4xl font-extrabold tracking-tighter">
            Welcome to Ecommerce Web App Website
          </h1>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
