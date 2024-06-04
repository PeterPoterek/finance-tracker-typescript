import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import AuthForm from './AuthForm';

const Auth = () => {
  return (
    <div className="flex justify-center items-center pt-[10rem] max-w-5xl m-auto">
      <div className="flex justify-center items-center flex-col p-[5rem] gap-5 w-[56rem] h-[25rem]">
        <Accordion type="single" collapsible className="w-full ">
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
            <AccordionTrigger>User Authentication</AccordionTrigger>
            <AccordionContent>
              <p>
                Users can register, log in, and manage their accounts securely.
              </p>
              <p>
                The app includes a "Forgot Password" functionality, utilizing
                SendGrid to handle password recovery emails. I have also
                incorporated industry-standard security measures to protect user
                data, including encrypted passwords and secure token-based
                authentication.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
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
                On the backend, the application utilizes the{' '}
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
                as the database.
              </p>
              <p>
                You can check the source code{' '}
                <a
                  href="https://github.com/PeterPoterek/finance-tracker-typescript"
                  target="_blank"
                  className="font-bold"
                >
                  here
                </a>
                .
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
