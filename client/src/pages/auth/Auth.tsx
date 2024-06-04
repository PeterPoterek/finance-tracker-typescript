import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex justify-center items-center pt-20 	">
      <div className="flex justify-center items-center flex-col p-[5rem] gap-5 w-[56rem] h-[20rem]">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Expense Tracking</AccordionTrigger>
            <AccordionContent>
              <p>
                This finance app allows users to track their expenses. Users can
                effortlessly categorize expenses, provide detailed descriptions,
                and specify the amount spent.
              </p>
              <p>
                Furthermore, users gain insights into their spending habits
                through comprehensive reports and visualizations accessible in
                the profile tab.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Technology Stack</AccordionTrigger>
            <AccordionContent>
              <p>
                The frontend of this project is built with{' '}
                <a
                  target="_blank"
                  href="https://react.dev/"
                  className="font-bold"
                >
                  React
                </a>
                , utilizing{' '}
                <a
                  target="_blank"
                  href="https://ui.shadcn.com/"
                  className="font-bold"
                >
                  shadcn
                </a>{' '}
                components and styled with{' '}
                <a
                  target="_blank"
                  href="https://tailwindcss.com/"
                  className="font-bold"
                >
                  TailwindCSS
                </a>
                .
              </p>
              <p>
                On the backend, the application utilizes{' '}
                <a
                  target="_blank"
                  href="https://expressjs.com/"
                  className="font-bold"
                >
                  Express
                </a>{' '}
                server with{' '}
                <a
                  target="_blank"
                  href="https://www.mongodb.com/"
                  className="font-bold"
                >
                  MongoDB
                </a>{' '}
                as database.
              </p>
              <p>
                You can check source code{' '}
                <a
                  href="https://github.com/PeterPoterek/finance-tracker-typescript"
                  target="_blank"
                  className="font-bold"
                >
                  here
                </a>
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you're
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="@peduarte" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
