import { cn } from "@/lib/utils";
import {
  // error
  CircleX,
  // warning
  TriangleAlert,
  // info
  InfoIcon,
  // help
  HelpCircle,
  // success
  CheckCircleIcon,
  // default
  Rocket,
} from "lucide-react";

const alertOptions = {
  error: {
    option: "Error",
    icon: CircleX,
    color: "text-red-500 dark:text-red-400",
    bg: "bg-red-50 dark:bg-gray-800",
  },
  warning: {
    option: "Warning",
    icon: TriangleAlert,
    color: "text-yellow-500 dark:text-yellow-400",
    bg: "bg-yellow-50 dark:bg-gray-800",
  },
  info: {
    option: "Info",
    icon: InfoIcon,
    color: "text-blue-500 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-gray-800",
  },
  help: {
    option: "Help",
    icon: HelpCircle,
    color: "text-gray-500 dark:text-gray-400",
    bg: "bg-gray-50 dark:bg-gray-800",
  },
  success: {
    option: "Success",
    icon: CheckCircleIcon,
    color: "text-green-500 dark:text-green-400",
    bg: "bg-green-50 dark:bg-gray-800",
  },
  default: {
    option: "Default",
    icon: Rocket,
    color: "text-gray-500 dark:text-gray-400",
    bg: "bg-gray-50 dark:bg-gray-800",
  },
};

interface AlertMessageProps {
  title: string;
  message: string;
  type: "error" | "warning" | "info" | "help" | "success" | "default";
}

const AlertOptions = () => {};

export const AlertMessage = ({ title, message, type }: AlertMessageProps) => {
  const { option, icon: Icon, color, bg } = alertOptions[type];
  return (
    <div
      className={cn("flex w-full items-center p-4 mb-4 gap-2 text-sm", bg)}
      role='alert'
    >
      <Icon className={cn("size-4", color)} />
      <span className='sr-only'>{option}</span>
      <div>{message}</div>
    </div>
  );
};

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { title } from "process";
import { error, timeLog } from "console";

export function AlertDemo() {
  return (
    <Alert>
      <Rocket className='size-4 text-red-500' />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  );
}
