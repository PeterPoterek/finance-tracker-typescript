import AuthAccordion from "./AuthAccordion";
import AuthForm from "./AuthForm";

const Auth = () => {
  return (
    <div className="max-w-5xl m-auto flex pt-[10rem] gap-5">
      <div className="flex justify-center items-center flex-col p-[5rem] gap-5 w-[56rem] ">
        <AuthAccordion />
      </div>

      <div>
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
