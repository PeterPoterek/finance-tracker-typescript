import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const Navbar = () => {
  return (
    <>
      <div className="fixed flex justify-end  w-full m-auto p-2.5 pl-10 pr-10 ">
        <div className="flex justify-center items-center gap-5 ">
          <Switch />

          <p>User name</p>

          <div className="flex">
            <Avatar>
              <AvatarImage src="https://placehold.co/460x460?text=IMG" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="link" className="text-base">
                  Logout
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to log out?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
