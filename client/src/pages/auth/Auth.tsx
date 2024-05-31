import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center flex-col p-[5rem] gap-5">
      <h1>Auth</h1>

      <Button variant="outline" onClick={handleLogin} className="text-base">
        Login
      </Button>
    </div>
  );
};

export default Auth;
