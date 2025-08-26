import {
  Package,
  User,
  CheckCircle,
  Clock,
  Truck,
  AlertCircle,
  XCircle,
} from "lucide-react";
export const statusConfig = {
  confirmed: {
    icon: CheckCircle,
    color: "text-primary",
    bg: "bg-primary/10",
    title: "Confirmed",
  },
  allocated: {
    icon: User,
    color: "text-orange-600",
    bg: "bg-orange-100",
    title: "Driver Allocated",
  },
  pickingUp: {
    icon: Truck,
    color: "text-yellow-600",
    bg: "bg-yellow-100",
    title: "Picking Up",
  },
  picked: {
    icon: Package,
    color: "text-purple-600",
    bg: "bg-purple-100",
    title: "Picked Up",
  },
  droppingOff: {
    icon: Truck,
    color: "text-indigo-600",
    bg: "bg-indigo-100",
    title: "On Delivery",
  },
  returnInTransit: {
    icon: Truck,
    color: "text-gray-600",
    bg: "bg-gray-100",
    title: "Returning",
  },
  onHold: {
    icon: Clock,
    color: "text-yellow-600",
    bg: "bg-yellow-100",
    title: "On Hold",
  },
  delivered: {
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-100",
    title: "Delivered",
  },
  rejected: {
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-100",
    title: "Rejected",
  },
  courierNotFound: {
    icon: AlertCircle,
    color: "text-red-600",
    bg: "bg-red-100",
    title: "No Courier",
  },
  returned: {
    icon: Package,
    color: "text-gray-600",
    bg: "bg-gray-100",
    title: "Returned",
  },
  cancelled: {
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-100",
    title: "Cancelled",
  },
  disposed: {
    icon: XCircle,
    color: "text-gray-600",
    bg: "bg-gray-100",
    title: "Disposed",
  },
};
