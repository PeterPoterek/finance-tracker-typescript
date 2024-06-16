import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import { AppDispatch } from "@/redux/store/store";
import { getCurrentUser } from "@/redux/slices/userSlice";
import useUser from "@/hooks/useUser";
// import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

const UserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const axiosPrivate = useAxiosPrivate();
  const user = useUser();
  // const auth = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(getCurrentUser());
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [dispatch, axiosPrivate]);

  return (
    <div className="pt-20 flex justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div>
              <CardTitle>My Account</CardTitle>
              <CardDescription>Manage your account information</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={user.avatarURL} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <label className="cursor-pointer text-teal-400">
              <input type="file" className="hidden" accept="image/*" />
              Upload Image
            </label>
          </div>
          <Separator />

          <div>
            <Label>Username</Label>
            <p className="text-lg font-medium">{user.username}</p>
          </div>
          <div>
            <Label>Email</Label>
            <p className="text-lg font-medium">{user.email}</p>
          </div>
          <Separator />
        </CardContent>
        <CardFooter className="flex justify-center gap-5">
          <Button variant="outline">Forgot password</Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    defaultValue={user.username}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>

                  <Input
                    id="email"
                    defaultValue={user.email}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>

      <div></div>
    </div>
  );
};

export default UserProfile;
