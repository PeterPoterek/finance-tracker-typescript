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

import useUser from "@/hooks/useUser";

const UserCard = () => {
  const user = useUser();

  return (
    <Card className="p-10">
      <CardHeader>
        <div className="flex items-center justify-center w-full gap-5">
          <div className="flex flex-col gap-2">
            <CardTitle className="text-center">My Account</CardTitle>
            <CardDescription>Manage your account information</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex  gap-5">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col justify-center items-center gap-2">
            <Avatar>
              <AvatarImage src={user.avatarURL} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <label className="cursor-pointer text-teal-400">
              <input type="file" className="hidden" accept="image/*" />
              Upload Image
            </label>
          </div>
        </div>

        <div className="flex gap-5 justify-between">
          <div>
            <Label>Username</Label>
            <p className="text-lg font-medium">{user.username}</p>
          </div>
          <div>
            <Label>Email</Label>
            <p className="text-lg font-medium">{user.email}</p>
          </div>
        </div>
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
                Make changes to your profile here. Click save when you're done.
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
  );
};

export default UserCard;
