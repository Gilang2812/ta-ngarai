import { PlusCircle, ShoppingBag } from "lucide-react";
import Button from "./Button";
import { ROUTES } from "@/data/routes";
import Link from "next/link";

export const EmptyState = () => {
  return (
    <div className="w-full py-16 flex flex-col items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
      <div className="text-center space-y-3 max-w-md mx-auto px-4 flex flex-col items-center justify-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <ShoppingBag className="w-8 h-8 text-gray-500" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Items is empty</h3>
        <p className="text-gray-500">
          You haven&#39;t added any data to your inventory yet. Start by adding
          your first item.
        </p>

        <Button asChild>
          <Link href={ROUTES.NEW_MARKETPLACE}>
            <PlusCircle className="mr-2 h-5 w-5" />
            Add First Item
          </Link>
        </Button>
      </div>
    </div>
  );
};
